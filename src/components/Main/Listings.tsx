import { memo } from 'react';
import styled from 'styled-components';

import { NewListingPro, nftMarketplaces, styleSettings } from '../../constants';
import { formatPrice } from '../../helpers';
import { Block, Title } from '../Common';

interface ListingsProps {
  listings: NewListingPro[];
}

const SEntry = styled.div`
  line-height: 20px;
  border-top: 2px solid ${styleSettings.colors.void};
  padding-top: 10px;
  margin-top: 10px;
`;

const SFlexy = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Listings = ({ listings }: ListingsProps) => (
  <Block>
    <Title title='New Listings' />
    {listings.length === 0 && <SEntry>Sniffing...</SEntry>}
    {listings.map((listing: NewListingPro, index: number) => (
      <SEntry key={`${listing.tokenID.toString()}-${new Date()}`}>
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
