export const getCollectionName = async (collection: string): Promise<string> => {
  let collectionName = null;

  try {
    const fetchedData = await fetch(`https://api.paintswap.finance/v2/collections/${collection.toLowerCase()}`);
    const response = await fetchedData.json();
    collectionName = response.collection.name;
  } catch (error) {
    collectionName = 'Unknown Collection';
  }

  return collectionName;
};
