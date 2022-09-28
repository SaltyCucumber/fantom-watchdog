export const getCollectionAddress = async (id: string): Promise<string> => {
  let collectionAddress = null;

  try {
    const fetchedData = await fetch(`https://api.paintswap.finance/v2/sales/${id}`);
    const response = await fetchedData.json();
    collectionAddress = response.sale.address;
  } catch (error) {
    collectionAddress = 'Unknown Collection Address';
  }

  return collectionAddress;
};
