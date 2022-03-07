import { BigNumber, utils } from 'ethers';
import { WatchListEntry } from '../components/hooks';

export const formatPrice = (amount: BigNumber): string => {
  return utils.formatEther(amount);
};

export const getTime = (): string => {
  const date = new Date();
  const time = `${date.getHours().toString().slice(-2)}:${date.getMinutes().toString().slice(-2)}`;

  return time;
};

export const onMyWatch = (collectionAddress: string) => {
  const watchListStorage = localStorage.getItem('watchList');

  if (watchListStorage !== null) {
    const watchList = JSON.parse(watchListStorage);
    const addresses = watchList.map(({ address }: WatchListEntry) => address);

    if (addresses.includes(collectionAddress.toLowerCase())) {
      return true;
    }
  } else {
    return true;
  }

  return false;
};
