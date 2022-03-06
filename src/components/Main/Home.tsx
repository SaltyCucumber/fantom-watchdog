import { memo, useEffect, useState } from 'react';
import { BundlePriceUpdate, MarketplaceV2, Sold } from '@paintswap/marketplace-interactions';
import styled from 'styled-components';
import { ethers } from 'ethers';

import Listings from './Listings';
import { NewListingPro } from '../../constants';
import { getCollectionName } from '../../helpers';
import { useBarks } from '../hooks';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');
const marketplace = new MarketplaceV2(provider);

const SHome = styled.div`
  display: flex;
`;

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [listings, setListings] = useState<NewListingPro[]>([]);
  const [soldNfts, setSoldNfts] = useState<Sold[]>([]);
  const [priceUpdates, setPriceUpdates] = useState<BundlePriceUpdate[]>([]);
  const { isBarksEnabled } = useBarks();

  useEffect(() => {
    if (!isListening) {
      marketplace.onNewListing(async (newListing) => {
        const collectionName = await getCollectionName(newListing);

        const newListingPro: NewListingPro = Object.assign({}, newListing, { collectionName });

        if (isBarksEnabled) {
          new Notification(`New listing for ${collectionName}`);
        }

        listings.unshift(newListingPro);
        setListings([...listings]);
      });

      marketplace.onSold((soldNft) => {
        console.log('Sold!\n', soldNft);

        soldNfts.unshift(soldNft);
        setSoldNfts([...soldNfts]);
      });

      marketplace.onPriceUpdate((priceUpdate) => {
        console.log('Price updated\n', priceUpdate);

        priceUpdates.unshift(priceUpdate);
        setPriceUpdates([...priceUpdates]);
      });

      setIsListening(true);
    }
  }, [isListening, listings, soldNfts, priceUpdates, isBarksEnabled]);

  return (
    <SHome>
      <Listings listings={listings} />
    </SHome>
  );
};

export default memo(Home);
