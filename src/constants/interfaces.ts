import { BundlePriceUpdate, NewListing, Sold } from '@paintswap/marketplace-interactions';

export interface NewListingPro extends NewListing, EventTime {
  collectionName: string;
}

export interface SoldNftPro extends Sold, EventTime {
  collectionName: string;
}

export interface PriceUpdatePro extends BundlePriceUpdate, EventTime {}

export interface EventTime {
  time: string;
}
