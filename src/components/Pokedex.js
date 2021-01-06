import React, { useState, useEffect } from 'react';
import Pokemon from '../classes/Pokemon.js';
import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';
import Loader from './Loader.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../styles/Pokedex.scss';

function Pokedex () {

  const [pokemonData, setPokemonData] = useState();

  const [selectedPokemon, selectPokemon] = useState();

  useEffect(() => {

    (async function () {
      const pokemons = await Pokemon.fetchFirstGenPokemons();
      setPokemonData(pokemons);
    })();

  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/pokemon/:pokemon">
          <div className="pokedex">
            {selectedPokemon ? <PokemonDisplay handleClick={selectPokemon} selectedPokemon={selectedPokemon} /> : <Loader/>}
          </div>
        </Route>
        <Route path="/">
          <div className="pokedex">
            {pokemonData ? <PokemonList handleClick={selectPokemon} pokemons={pokemonData} /> : <Loader/>}
          </div>
        </Route>
      </Switch>
    </Router>
  );

}

export default Pokedex;
