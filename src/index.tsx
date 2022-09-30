import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { styleSettings } from './helpers';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${styleSettings.colors.void};
    font-family: 'PT Mono', monospace;
    color: ${styleSettings.colors.stark};
  }

  a {
    color: ${styleSettings.colors.stark};
  }
`;

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
