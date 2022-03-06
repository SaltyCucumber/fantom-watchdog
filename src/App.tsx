import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Hat, Home, Settings } from './components/Main';
import { routes } from './constants';

const App = () => (
  <BrowserRouter>
    <Hat />
    <Settings />
    <Routes>
      <Route path={routes.homepage} element={<Home />} />
      <Route path='*' element={<Navigate to={routes.homepage} replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
