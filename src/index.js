import React from 'react';
import ReactDOM from 'react-dom';
import { Pokedex } from '@components';

import { GlobalStyle } from '@styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Pokedex />
  </React.StrictMode>,
  document.getElementById('root')

);
