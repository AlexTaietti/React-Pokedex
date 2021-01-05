import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Pokedex from './components/Pokedex.js';

ReactDOM.render(
  <React.StrictMode>
    <Pokedex />
  </React.StrictMode>,
  document.getElementById('root')
);
