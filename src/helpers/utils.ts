import { BigNumber, utils } from 'ethers';
import { WatchListEntry } from '../components/hooks';

export const formatPrice = (amount: BigNumber): string => {
  return utils.formatEther(amount);
};

export const getTime = (): string => {
  const date = new Date();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const time = `${hours}:${minutes}`;

  return time;
};

export const onMyWatch = (collectionAddress: string) => {
  const watchListStorage = localStorage.getItem('watchList');

  if (watchListStorage !== null) {
    const watchList = JSON.parse(watchListStorage);
    const addresses = watchList.map(({ address }: WatchListEntry) => address);

    return addresses.length === 0 || addresses.includes(collectionAddress.toLowerCase()) ? true : false;
  }

  return true;
};
