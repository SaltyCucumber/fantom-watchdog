import { memo } from 'react';

import { nftMarketplaces, SoldNftPro } from '../../constants';
import { formatPrice, SEntry, SFlexy } from '../../helpers';
import { Block, Title } from '../Common';

interface SoldNftsProps {
  soldNfts: SoldNftPro[];
}

const SoldNfts = ({ soldNfts }: SoldNftsProps) => (
  <Block>
    <Title title='Sold NFTs' />
    {soldNfts.length === 0 && <SEntry>Sniffing...</SEntry>}
    {soldNfts.map((soldNft: SoldNftPro) => (
      <SEntry key={`${soldNft.tokenID.toString()}-${soldNft.time}`}>
        <SFlexy>
          <span>Time:</span>
          <span>{soldNft.time}</span>
        </SFlexy>
        <SFlexy>
          <span>Collection:</span>
          <span>{soldNft.collectionName}</span>
        </SFlexy>
        <SFlexy>
          <span>Price:</span>
          <span>{formatPrice(soldNft.pricePerUnit)} FTM</span>
        </SFlexy>
        <SFlexy>
          <span>Link:</span>
          <span>
            <a href={`${nftMarketplaces.paintSwap}${soldNft.marketplaceId.toString()}`} target='_blank' rel='noreferrer'>
              {soldNft.marketplaceId.toString()}
            </a>
          </span>
        </SFlexy>
      </SEntry>
    ))}
  </Block>
);

export default memo(SoldNfts);
