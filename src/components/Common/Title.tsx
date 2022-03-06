import { memo } from 'react';
import styled from 'styled-components';

const STitle = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
`;

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => <STitle>{title}</STitle>;

export default memo(Title);
