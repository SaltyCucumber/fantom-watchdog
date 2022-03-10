import { memo } from 'react';
import styled from 'styled-components';

import { styleSettings } from '../../helpers';
import { useBarks, useWatchList } from '../hooks';

const SSettings = styled.div`
  margin-bottom: 20px;
`;

const SForm = styled.form`
  margin-bottom: 20px;
`;

const SInput = styled.input`
  width: 350px;
`;

const SMunch = styled.span`
  color: ${styleSettings.colors.harvardCrimson};
  cursor: pointer;
`;

const STable = styled.table`
  border-collapse: collapse;
`;

const SRow = styled.tr`
  :hover {
    background-color: ${styleSettings.colors.darkPurple};
  }
  :hover td {
    text-decoration: line-through;
  }

  td:hover,
  td:hover + td {
    text-decoration: none;
  }
`;

const Settings = () => {
  const { isBarksEnabled, enableBarks } = useBarks();
  const { watchList, addToWatchList, removeFromWatchlist } = useWatchList();

  return (
    <SSettings>
      {!isBarksEnabled && <button onClick={enableBarks}>Enable barks</button>}
      <div>
        <SForm onSubmit={addToWatchList}>
          <label>
            Enter collection address:
            <SInput name='address' type='text' />
            <button type='submit'>Add to watchlist</button>
          </label>
        </SForm>
        {watchList.length > 0 && (
          <STable>
            <thead>
              <tr>
                <th align='left'>Collection watchlist</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {watchList.map(({ address, collection }) => (
                <SRow key={address}>
                  <td>{collection}</td>
                  <td>
                    <SMunch onClick={() => removeFromWatchlist(collection)}>munch!</SMunch>
                  </td>
                </SRow>
              ))}
            </tbody>
          </STable>
        )}
      </div>
    </SSettings>
  );
};

export default memo(Settings);
