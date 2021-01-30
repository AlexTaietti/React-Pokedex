import { BrowserRouter as Router, Route } from 'react-router-dom';
import pokedexReducer from '@reducers/pokedexReducer';
import Pokemon from '@classes/Pokemon';
import PokemonDisplay from '@components/PokemonDisplay';
import PokemonList from '@components/PokemonList';
import styled from 'styled-components';
import { useReducer, useCallback } from 'react';


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
    listScrollValue: undefined
  });

  const loadFreshBatchOfPokemons = useCallback(async () => {

    if(pokedexState.loadedAll || pokedexState.loadingPokemonData) return;

    pokedexDispatch({ type: 'START_FETCH_BATCH' });

    const maximumPokemonAmount = 384; //first three generations up to Rayquaza
    const pokemonBatchAmount = 16;

    let adjustedFetchAmount, loadedEveryPokemon;

    if(pokedexState.pokemonCardsData.length + pokemonBatchAmount >= maximumPokemonAmount){

      adjustedFetchAmount = maximumPokemonAmount - pokedexState.pokemonCardsData.length;

      loadedEveryPokemon = true;

    } else { adjustedFetchAmount = pokemonBatchAmount; }

    const newPokemons = await Pokemon.fetchBatchPokemons( pokedexState.lastID, adjustedFetchAmount );
    const lastID = newPokemons[newPokemons.length - 1].id;

    const newPokemonCards = newPokemons.map((pokemon) => {

      return { pokemon: pokemon, mountedOnce: false };

    });

    if(loadedEveryPokemon) pokedexDispatch({ type: 'SET_LOADED_ALL' });

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
