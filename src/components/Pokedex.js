import { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Pokemon from '../classes/Pokemon.js';
import ScrollContext from '../utils/ScrollContext.js';

import PokemonDisplay from './PokemonDisplay';
import PokemonList from './PokemonList.js';
import Loader from './Loader.js';

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  padding: 20px 20px;
  display: block;
`;

const Pokedex = () => {

  const [ pokemons, setPokemonList ] = useState([]);
  const [ listScrollValue, setListScrollValue ] = useState(0);

  const loadFreshBatchOfPokemons = async () => {
    const pokemonBatchAmount = 20;
    const lastPokemonID = pokemons.length ? pokemons[pokemons.length - 1].id : 0;
    const newPokemons = await Pokemon.fetchBatchPokemons( lastPokemonID, pokemonBatchAmount );
    setPokemonList([...pokemons, ...newPokemons]);
  };

  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route exact path="/pokemon/:pokemonName">
          <PokemonDisplay/>
        </Route>

        <Route exact path="/">
          <PokemonList scrollValue={ listScrollValue } handleListCardClick={ setListScrollValue } loadFreshBatchOfPokemons={ loadFreshBatchOfPokemons } pokemons={ pokemons }/>
        </Route>

      </PokedexWrapper>

    </Router>

  );

};

export default Pokedex;
