import { useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import pokedexReducer from '../state/reducers/pokedexReducer';
import Pokemon from '../classes/Pokemon';

import PokemonDisplay from './PokemonDisplay';
import PokemonList from './PokemonList';

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  display: block;
  padding: 20px 20px;
`;

const Pokedex = () => {

  const [ pokedexState, pokedexDispatch ] = useReducer( pokedexReducer, {
    pokemonCardsData: [],
    loadingPokemonData: false,
    loadedAll: false,
    lastID: 0,
    listScrollValue: 0
  });

  const loadFreshBatchOfPokemons = useCallback(async () => {

    if(pokedexState.loadedAll || pokedexState.loadingPokemonData) return;

    pokedexDispatch({ type: 'START_FETCH_BATCH' });

    const maximumPokemonAmount = 384; //first three generations up to Rayquaza
    const pokemonBatchAmount = 16;

    let adjustedFetchAmount;

    if(pokedexState.pokemonCardsData.length + pokemonBatchAmount > maximumPokemonAmount){

      adjustedFetchAmount = maximumPokemonAmount - pokedexState.pokemonCardsData.length;

    } else { adjustedFetchAmount = pokemonBatchAmount; }

    const newPokemons = await Pokemon.fetchBatchPokemons( pokedexState.lastID, adjustedFetchAmount );
    const lastID = newPokemons[newPokemons.length - 1].id;

    const newPokemonCards = newPokemons.map((pokemon) => {

      return { pokemon: pokemon, mountedOnce: false };

    });

    if(adjustedFetchAmount < pokemonBatchAmount) pokedexDispatch({ type: 'SET_LOADED_ALL' });

    pokedexDispatch({ type: 'ADD_POKEMONS', pokemonCardsData: newPokemonCards, lastID: lastID });

  }, [pokedexDispatch, pokedexState.lastID, pokedexState.loadedAll, pokedexState.pokemonCardsData.length, pokedexState.loadingPokemonData]);

  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route exact path="/pokemon/:pokemonName">
          <PokemonDisplay/>
        </Route>

        <Route exact path="/">
          <PokemonList loadFreshBatchOfPokemons={ loadFreshBatchOfPokemons } pokedexState={ pokedexState } pokedexDispatch={ pokedexDispatch }/>
        </Route>

      </PokedexWrapper>

    </Router>

  );

};

export default Pokedex;
