import React, { useState, useEffect } from 'react';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styles/Pokedex.scss';

function Pokedex () {

  const [pokemonData, setPokemonData] = useState();

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
          {pokemonData ? <PokemonDisplay pokemonData={pokemonData} setPokemonData={setPokemonData} /> : <Loader/>}
        </div>
      </Route>

      <Route exact path="/">
        <div className="pokedex">
          {pokemonData ? <PokemonList pokemons={pokemonData} /> : <Loader/>}
        </div>
      </Route>

    </Router>

  );

}

export default Pokedex;
