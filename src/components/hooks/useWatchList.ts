import { utils } from 'ethers';
import { useEffect, useState } from 'react';

import { getCollectionName } from '../../helpers';

export interface WatchListEntry {
  address: string;
  collection: string;
}

// TODO: make watchListAddresses globally available
export const useWatchList = () => {
  const [watchList, setWatchList] = useState<WatchListEntry[]>([]);
  const [watchListAddresses, setWatchListAddresses] = useState<string[]>([]);

  useEffect(() => {
    const watchListStorage = localStorage.getItem('watchList');

    if (watchListStorage !== null) {
      setWatchList(JSON.parse(watchListStorage));
    }
  }, []);

  useEffect(() => {
    const addresses = watchList.map(({ address }) => address);
    setWatchListAddresses([...addresses]);
  }, [watchList]);

  const addToWatchList = async (event: any) => {
    event.preventDefault();
    const address = event.target.address.value;

    try {
      const verifiedAddress = utils.getAddress(address).toLowerCase();
      const collectionName = await getCollectionName(verifiedAddress);

      if (!watchListAddresses.includes(verifiedAddress)) {
        watchList.unshift({
          address: verifiedAddress.toLowerCase(),
          collection: collectionName,
        });

        localStorage.setItem('watchList', JSON.stringify(watchList));
        setWatchList([...watchList]);
        event.target.address.value = '';
      }
    } catch (error) {}
  };

  const removeFromWatchlist = (collectionName: string) => {
    const watchListStorage = localStorage.getItem('watchList');

    if (watchListStorage !== null) {
      const currentWatchlist = JSON.parse(watchListStorage);
      const index = currentWatchlist.findIndex((entry: WatchListEntry) => entry.collection === collectionName);
      if (index > -1) {
        currentWatchlist.splice(index, 1);
        localStorage.setItem('watchList', JSON.stringify(currentWatchlist));
        setWatchList([...currentWatchlist]);
      }
    }
  };

  return { watchList, addToWatchList, watchListAddresses, removeFromWatchlist };
};
