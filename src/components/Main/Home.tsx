import { memo, useEffect, useState } from 'react';
import { MarketplaceV2 } from '@paintswap/marketplace-interactions';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { NewListingPro, PriceUpdatePro, SoldNftPro } from '../../constants';
import { formatPrice, getCollectionName, getTime, onMyWatch } from '../../helpers';
import { useBarks } from '../hooks';
import Listings from './Listings';
import SoldNfts from './SoldNfts';
import PriceUpdates from './PriceUpdates';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
const marketplace = new MarketplaceV2(provider);

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
        const isOnMyWatch = onMyWatch(newListing.collection);
        if (isOnMyWatch) {
          const collectionName = await getCollectionName(newListing.collection);

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
        const isOnMyWatch = onMyWatch(soldNft.collection);
        if (isOnMyWatch) {
          const collectionName = await getCollectionName(soldNft.collection);
          const time = getTime();

          const soldNftPro: SoldNftPro = Object.assign({}, soldNft, { collectionName }, { time });

          if (isBarksEnabled) {
            new Notification(`Sold NFT from ${collectionName} for ${formatPrice(soldNft.pricePerUnit)} FTM`);
          }

          soldNfts.unshift(soldNftPro);
          setSoldNfts([...soldNfts]);
        }
      });

      marketplace.onPriceUpdate((priceUpdate) => {
        const time = getTime();

        const priceUpdatePro: PriceUpdatePro = Object.assign({}, priceUpdate, { time });

        // TODO need to get what collection price was updated somehow
        // if (isBarksEnabled) {
        //   new Notification('Price updated');
        // }

        priceUpdates.unshift(priceUpdatePro);
        setPriceUpdates([...priceUpdates]);
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
