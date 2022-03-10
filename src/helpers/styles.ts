import styled from 'styled-components';

export const styleSettings = {
  colors: {
    darkPurple: '#251d3a',
    fuschia: '#a239ca',
    harvardCrimson: '#c20017',
    stark: '#e7dfdd',
    void: '#0e0b16',
  },
};

export const SEntry = styled.div`
  line-height: 20px;
  border-top: 2px solid ${styleSettings.colors.void};
  padding-top: 10px;
  margin-top: 10px;
`;

export const SFlexy = styled.div`
  display: flex;
  justify-content: space-between;
`;
