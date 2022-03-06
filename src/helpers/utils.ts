import { BigNumber, utils } from 'ethers';

export const formatPrice = (amount: BigNumber) => {
  return utils.formatEther(amount);
};
