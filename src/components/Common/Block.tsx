import { memo } from 'react';
import styled from 'styled-components';
import { styleSettings } from '../../constants';

const SBlock = styled.div`
  flex-grow: 1;
  max-width: 400px;
  background-color: ${styleSettings.colors.fuschia};
  border-radius: 20px;
  padding: 20px;
`;

interface BlockProps {
  children: any;
}

const Block = ({ children }: BlockProps) => <SBlock>{children}</SBlock>;

export default memo(Block);
