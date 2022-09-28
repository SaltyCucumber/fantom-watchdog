import { PriceUpdate, NewListing, Sold } from '@paintswap/marketplace-interactions/dist/lib/marketplaceV3Types';

export interface NewListingPro extends NewListing, EventTime {
  collectionName: string;
}

export interface SoldNftPro extends Sold, EventTime {
  collectionName: string;
}

export interface PriceUpdatePro extends PriceUpdate, EventTime {
  collectionName: string;
}

export interface EventTime {
  time: string;
}
