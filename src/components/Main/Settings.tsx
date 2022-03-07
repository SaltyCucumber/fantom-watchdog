import { memo } from 'react';
import styled from 'styled-components';

import { useBarks, useWatchList } from '../hooks';

const SSettings = styled.div`
  margin-bottom: 20px;
`;

const SInput = styled.input`
  width: 350px;
`;

const Settings = () => {
  const { isBarksEnabled, enableBarks } = useBarks();
  const { watchList, addToWatchList } = useWatchList();

  return (
    <SSettings>
      {!isBarksEnabled && <button onClick={enableBarks}>Enable barks</button>}
      <div>
        <form onSubmit={addToWatchList}>
          <label>
            Enter collection address:
            <SInput name='address' type='text' />
            <button type='submit'>Add to watchlist</button>
          </label>
        </form>
        {watchList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th align='left'>Collection watchlist:</th>
              </tr>
            </thead>
            <tbody>
              {watchList.map(({ address, collection }) => (
                <tr key={address}>
                  <td>{collection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </SSettings>
  );
};

export default memo(Settings);
