import { memo, useEffect, useState } from 'react';
import { MarketplaceV3 } from '@paintswap/marketplace-interactions';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { NewListingPro, PriceUpdatePro, SoldNftPro } from '../../constants';
import { formatPrice, getCollectionAddress, getCollectionName, getTime, onMyWatch } from '../../helpers';
import { useBarks } from '../hooks';
import Listings from './Listings';
import SoldNfts from './SoldNfts';
import PriceUpdates from './PriceUpdates';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
const marketplace = new MarketplaceV3(provider);

const SHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 10px;
`;

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [listings, setListings] = useState<NewListingPro[]>([]);
  const [soldNfts, setSoldNfts] = useState<SoldNftPro[]>([]);
  const [priceUpdates, setPriceUpdates] = useState<PriceUpdatePro[]>([]);
  const { isBarksEnabled } = useBarks();

  useEffect(() => {
    if (!isListening && isBarksEnabled !== null) {
      marketplace.onNewListing(async (newListing) => {
        const isOnMyWatch = onMyWatch(newListing.nft);
        if (isOnMyWatch) {
          const collectionName = await getCollectionName(newListing.nft);
          const time = getTime();

          const newListingPro: NewListingPro = Object.assign({}, newListing, { collectionName }, { time });

          if (isBarksEnabled) {
            new Notification(`New listing for ${collectionName}`);
          }

          listings.unshift(newListingPro);
          setListings([...listings]);
        }
      });

      marketplace.onSold(async (soldNft) => {
        console.log('onSold', soldNft);
        const isOnMyWatch = onMyWatch(soldNft.nft);
        console.log('onSold isOnMyWatch', isOnMyWatch)
        if (isOnMyWatch) {
          const collectionName = await getCollectionName(soldNft.nft);
          const time = getTime();

          const soldNftPro: SoldNftPro = Object.assign({}, soldNft, { collectionName }, { time });

          if (isBarksEnabled) {
            new Notification(`Sold ${collectionName} NFT for ${formatPrice(soldNft.pricePerUnit)} FTM`);
          }

          soldNfts.unshift(soldNftPro);
          setSoldNfts([...soldNfts]);
        }
      });

      marketplace.onPriceUpdate(async (priceUpdate) => {
        const collectionAddress = await getCollectionAddress(priceUpdate.marketplaceId.toString());

        const isOnMyWatch = onMyWatch(collectionAddress);
        if (isOnMyWatch) {
          const collectionName = await getCollectionName(collectionAddress);
          const time = getTime();

          const priceUpdatePro: PriceUpdatePro = Object.assign({}, priceUpdate, { collectionName }, { time });

          if (isBarksEnabled) {
            new Notification(`${collectionName} NFT price updated to ${formatPrice(priceUpdate.price)} FTM`);
          }

          priceUpdates.unshift(priceUpdatePro);
          setPriceUpdates([...priceUpdates]);
        }
      });

      setIsListening(true);
    }
  }, [isListening, listings, soldNfts, priceUpdates, isBarksEnabled]);

  return (
    <SHome>
      <Listings listings={listings} />
      <SoldNfts soldNfts={soldNfts} />
      <PriceUpdates priceUpdates={priceUpdates} />
    </SHome>
  );
};

export default memo(Home);
