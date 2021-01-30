import React from 'react';
import ReactDOM from 'react-dom';
import Pokedex from '@components/Pokedex.js';

import GlobalStyle from '@styles/GlobalStyle.js';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Pokedex />
  </React.StrictMode>,
  document.getElementById('root')

);
