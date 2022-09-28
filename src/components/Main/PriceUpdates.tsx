import { memo } from 'react';

import { nftMarketplaces, PriceUpdatePro } from '../../constants';
import { formatPrice, SEntry, SFlexy } from '../../helpers';
import { Block, Title } from '../Common';

interface PriceUpdatesProps {
  priceUpdates: PriceUpdatePro[];
}

const PriceUpdates = ({ priceUpdates }: PriceUpdatesProps) => (
  <Block>
    <Title title='Price updates' />
    {priceUpdates.length === 0 && <SEntry>Sniffing...</SEntry>}
    {priceUpdates.map((newPrice: PriceUpdatePro) => (
      <SEntry key={`${newPrice.marketplaceId.toString()}-${newPrice.time}`}>
        <SFlexy>
          <span>Time:</span>
          <span>{newPrice.time}</span>
        </SFlexy>
        <SFlexy>
          <span>Collection:</span>
          <span>{newPrice.collectionName}</span>
        </SFlexy>
        <SFlexy>
          <span>New Price:</span>
          <span>{formatPrice(newPrice.price)} FTM</span>
        </SFlexy>
        <SFlexy>
          <span>Link:</span>
          <span>
            <a href={`${nftMarketplaces.paintSwap}${newPrice.marketplaceId.toString()}`} target='_blank' rel='noreferrer'>
              {newPrice.marketplaceId.toString()}
            </a>
          </span>
        </SFlexy>
      </SEntry>
    ))}
  </Block>
);

export default memo(PriceUpdates);
