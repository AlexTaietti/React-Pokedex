import React, { useState, useEffect } from 'react';
import Pokemon from '../classes/Pokemon.js';
import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';
import Loader from './Loader.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      <Route exact path="/pokemon/:pokemonName">
        <div className="pokedex">
          {selectedPokemon && selectedPokemon.details ? <PokemonDisplay selectPokemon={selectPokemon} selectedPokemon={selectedPokemon} /> : <Loader/>}
        </div>
      </Route>
      <Route exact path="/">
        <div className="pokedex">
          {pokemonData ? <PokemonList selectPokemon={selectPokemon} pokemons={pokemonData} /> : <Loader/>}
        </div>
      </Route>
    </Router>
  );

}

export default Pokedex;
