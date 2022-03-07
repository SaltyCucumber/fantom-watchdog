import { memo } from 'react';

import { NewListingPro, nftMarketplaces } from '../../constants';
import { formatPrice, SEntry, SFlexy } from '../../helpers';
import { Block, Title } from '../Common';

interface ListingsProps {
  listings: NewListingPro[];
}

const Listings = ({ listings }: ListingsProps) => (
  <Block>
    <Title title='New Listings' />
    {listings.length === 0 && <SEntry>Sniffing...</SEntry>}
    {listings.map((listing: NewListingPro) => (
      <SEntry key={`${listing.tokenID.toString()}-${listing.time}`}>
        <SFlexy>
          <span>Time:</span>
          <span>{listing.time}</span>
        </SFlexy>
        <SFlexy>
          <span>Collection:</span>
          <span>{listing.collectionName}</span>
        </SFlexy>
        <SFlexy>
          <span>Price:</span>
          <span>{formatPrice(listing.pricePerUnit)} FTM</span>
        </SFlexy>
        <SFlexy>
          <span>Link:</span>
          <span>
            <a href={`${nftMarketplaces.paintSwap}${listing.marketplaceId.toString()}`} target='_blank' rel='noreferrer'>
              {listing.marketplaceId.toString()}
            </a>
          </span>
        </SFlexy>
      </SEntry>
    ))}
  </Block>
);

export default memo(Listings);
