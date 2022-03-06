import { memo } from 'react';
import styled from 'styled-components';

import { useBarks } from '../hooks';

const SSettings = styled.div`
  margin-bottom: 20px;
`;

const Settings = () => {
  const { isBarksEnabled, enableBarks } = useBarks();

  return <SSettings>{!isBarksEnabled && <button onClick={enableBarks}>Enable barks</button>}</SSettings>;
};

export default memo(Settings);
