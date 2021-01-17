import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import PokemonDisplay from './PokemonDisplay';
import PokemonList from './PokemonList.js';

import '../styles/Pokedex.scss';

function Pokedex () {

  //render the pokedex!
  return (

    <Router>

      <Route exact path="/pokemon/:pokemonName">
        <div className="pokedex">
          <PokemonDisplay/>
        </div>
      </Route>

      <Route exact path="/">
        <div className="pokedex">
          <PokemonList/>
        </div>
      </Route>

    </Router>

  );

}

export default Pokedex;
