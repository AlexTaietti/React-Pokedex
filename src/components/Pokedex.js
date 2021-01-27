import { useState, useEffect, useLayoutEffect, useRef, useMemo, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Pokemon from '../classes/Pokemon.js';
import pokedexReducer from '../state/reducers/pokedexReducer.js';

import PokemonDisplay from './PokemonDisplay';
import PokemonList from './PokemonList.js';
import Loader from './Loader.js';
import PokemonCard from './PokemonCard.js';

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  padding: 20px 20px;
  display: block;
`;

const Pokedex = () => {

  const [ pokedexState, pokedexDispatch ] = useReducer( pokedexReducer, {
    pokemonCards: [],
    lastID: 0,
    listScrollValue: 0
  });

  const loadFreshBatchOfPokemons = async () => {

    const pokemonBatchAmount = 20;
    const newPokemons = await Pokemon.fetchBatchPokemons( pokedexState.lastID, pokemonBatchAmount );
    const lastID = newPokemons[newPokemons.length - 1].id;

    const newPokemonCards = newPokemons.map((pokemon) => {

      return { pokemon: pokemon, mountedOnce: false };

    });

    pokedexDispatch({ type: 'ADD_POKEMONS', pokemonCards: newPokemonCards, lastID: lastID });

  };

  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route exact path="/pokemon/:pokemonName">
          <PokemonDisplay/>
        </Route>

        <Route exact path="/">
          <PokemonList pokedexDispatch={ pokedexDispatch } scrollValue={ pokedexState.listScrollValue } loadFreshBatchOfPokemons={ loadFreshBatchOfPokemons } pokemonCards={ pokedexState.pokemonCards }/>
        </Route>

      </PokedexWrapper>

    </Router>

  );

};

export default Pokedex;
