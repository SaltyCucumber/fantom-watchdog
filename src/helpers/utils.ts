import { BigNumber, utils } from 'ethers';

export const formatPrice = (amount: BigNumber): string => {
  return utils.formatEther(amount);
};

export const getTime = (): string => {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return time;
};
