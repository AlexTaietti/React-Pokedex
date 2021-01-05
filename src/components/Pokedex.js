import React, { useState, useEffect } from 'react';
import Pokemon from '../classes/Pokemon.js';
import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';
import Loader from './Loader.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../styles/Pokedex.scss';

function Pokedex () {

  const [pokemonData, setPokemonData] = useState();
  const [activePokemon, setActivePokemon] = useState();

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
            {activePokemon ? <PokemonDisplay handleClick={setActivePokemon} pokemon={activePokemon} /> : <Loader/>}
          </div>
        </Route>
        <Route path="/">
          <div className="pokedex">
            {pokemonData ? <PokemonList handleClick={setActivePokemon} pokemons={pokemonData} /> : <Loader/>}
          </div>
        </Route>
      </Switch>
    </Router>
  );

}

export default Pokedex;
