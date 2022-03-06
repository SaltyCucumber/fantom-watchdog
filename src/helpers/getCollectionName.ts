import { NewListing } from '@paintswap/marketplace-interactions';

export const getCollectionName = async (newListing: NewListing): Promise<string> => {
  let collectionName = null;

  try {
    ({ name: collectionName } = await (await fetch(`https://api.paintswap.finance/v2/collections/${newListing.collection}`)).json());

    if (!collectionName) {
      collectionName = 'Unknown Collection';
    }
  } catch (error) {
    collectionName = 'Unknown Collection';
  }

  return collectionName;
};
