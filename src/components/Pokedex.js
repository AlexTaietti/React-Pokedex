import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchData, fetchPokemonByName, fetchPokemonDetails, localStorageReducer } from '@utils';
import { Loader, PokemonDisplay, PokemonList, ListHeader, ListView } from '@components';
import { pokedexReducer } from '@reducers';
import styled, { keyframes } from 'styled-components';
import { useEffect, useCallback, useReducer } from 'react';

const Pokedex = () => {

  const [ pokedexState, pokedexDispatch ] = useReducer( pokedexReducer, {

    pokeReference: undefined,  //will hold an iterable list of all pokemon names and their respective URLs
    pokemonData: undefined,    //will hold all the actual pokemon data
    pokemonList: [],           //pokemons to be displayed in the list component
    listIndex: 0,              //will be the "pointer" used to traverse the pokeReference array
    booting: true,             //app initial set-up process flag
    loadedAllPokemons: false,  //flag to prevent surpassing the pokemon amount limit
    loadingMorePokemons: false //flag for the spinner at the bottom of the pokeList

  });


  //mash together a basic pokemon object and the corresponding details, return result
  const makeDetailedPokemon = useCallback(async (pokemon) => {

    const pokemonDetails = await fetchPokemonDetails(pokemon.data.name);

    return { ...pokemon, details: { ...pokemonDetails } };

  }, []);


  //this callback is used gets a detailed pokemon (used in the display component)
  const getEnhancedPokemon = async (pokemonName) => {

    const pokemon = pokedexState.pokemonData[pokemonName];

    if(pokemon){

      if(pokemon.details) return pokemon;

      const detailedPokemon = await makeDetailedPokemon(pokemon);

      pokedexDispatch({ type: 'ADD_POKEMON_DATA', pokemon: detailedPokemon });

      return detailedPokemon;

    }

    const newPokemon = await fetchPokemonByName(pokemonName);

    const detailedPokemon = await makeDetailedPokemon(newPokemon);

    pokedexDispatch({ type: 'ADD_POKEMON_DATA', pokemon: detailedPokemon });

    return detailedPokemon;

  };


  //retrieve pokemons either from cache or API call based on an array of names
  const catchPokemons = async (pokemons) => {

    const cachedPokemons = [];
    const newPokemons = [];

    const newPokemonsData = await Promise.all( pokemons.filter( currentPokemon => {

      const pokemon = pokedexState.pokemonData[currentPokemon];

      if (pokemon){

        cachedPokemons.push(pokemon);

        return false;

      }

      return true;

    }).map( currentPokemon => {

      const pokemon = fetchPokemonByName(currentPokemon);

      return pokemon;

    }));

    const newPokemonsObject = newPokemonsData.reduce( (pokemonObject, currentPokemon) => {

      if(!currentPokemon) return pokemonObject;

      newPokemons.push(currentPokemon);

      return { ...pokemonObject, [currentPokemon.data.name]: { ...currentPokemon } };

    }, {});

    pokedexDispatch({ type: 'ADD_MULTI_POKEMON_DATA', data: newPokemonsObject });

    const pokemonsArray = Promise.all([...cachedPokemons, ...newPokemons]);

    return pokemonsArray;

  };


  //click callback for the "load more" button
  const catchMorePokemons = async () => {

    if(pokedexState.loadingMorePokemons || pokedexState.loadedAllPokemons) return;

    pokedexDispatch({ type: 'START_LOADING_POKEMONS'});

    const batchAmount = 20;

    const pokemonsListLength = pokedexState.pokeReference.length;
    const adjustedFetchAmount = pokedexState.listIndex + batchAmount >= pokemonsListLength ? pokemonsListLength - pokedexState.listIndex : batchAmount;

    const lastIndex = pokedexState.listIndex + adjustedFetchAmount;

    const referenceSlice = pokedexState.pokeReference.slice(pokedexState.listIndex, lastIndex).map(pokemon => pokemon.name);

    const newPokemons = await catchPokemons(referenceSlice);

    pokedexDispatch({ type: 'ADD_POKEMONS_TO_POKELIST', pokemons: newPokemons, index: lastIndex });

    if(adjustedFetchAmount < batchAmount) { pokedexDispatch({ type: 'LOADED_ALL'}); }

  };


  //on mount retrieve all the cached data
  useEffect(() => {

    (async () => {

      const maximumPokemonAmount = 384; //first 3 generations up to Rayquaza

      const cachedReference = localStorageReducer('GET', 'pokeReference'); //check if a cached reference exists

      const cachedPokemons = localStorageReducer('GET', 'pokemonData'); //check if there are any pokemons in cache

      if(cachedReference){ //if so load the cached one...

        pokedexDispatch({ type: 'SET_POKEMON_REFERENCE', reference: cachedReference});

      } else { //otherwise fetch new one

        const referenceData = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${maximumPokemonAmount}`);

        pokedexDispatch({ type: 'SET_POKEMON_REFERENCE', reference: referenceData.results });

      }

      if(cachedPokemons){ //if so load the cached pokemons...

        pokedexDispatch({ type: 'SET_POKEMON_DATA', data: cachedPokemons });

      } else { //otherwise set an empty array

        pokedexDispatch({ type: 'SET_POKEMON_DATA', data: {} });

      }

      pokedexDispatch({ type: 'FINISH_BOOTING'});

    })();

  }, []);


  //whenever pokemonData changes cache it
  useEffect(() => {

    return () => { if (pokedexState.pokemonData) localStorageReducer('SET', { key: 'pokemonData', data: pokedexState.pokemonData }); };

  }, [pokedexState.pokemonData]);


  ////whenever setPokeReference changes cache it
  useEffect(() => {

    return () => { if (pokedexState.pokeReference) localStorageReducer('SET', { key: 'pokeReference', reference: pokedexState.pokeReference }); };

  }, [pokedexState.pokeReference]);


  //render the pokedex!
  return (

    !pokedexState.booting ?

      <Router>

        <PokedexWrapper>

          <Route path="/pokemon/:pokemonName">

            <PokemonDisplay catchPokemons={ catchPokemons } getEnhancedPokemon={ getEnhancedPokemon }/>

          </Route>

          <Route exact path="/">

            <ListView pokemons={ pokedexState.pokemonList } catchMorePokemons={ catchMorePokemons }>

              <ListHeader/>

              <main tabIndex="0" id="pokemon-list" aria-label="list of pokemons, click the button at the end of the page to catch more of 'em!">

                <PokemonList pokemons={ pokedexState.pokemonList }/>

                { !pokedexState.loadedAllPokemons && <LoadButton onClick={ catchMorePokemons } className={ pokedexState.loadingMorePokemons ? 'loading' : 'ready' } tabIndex="0" aria-describedby="pokemon-list" aria-label="catch more pokemons!">Click to catch some more!</LoadButton> }

              </main>

            </ListView>

          </Route>

        </PokedexWrapper>

      </Router> : <Loader/>

  );

};

const pulse = keyframes`
  0%{ transform: translate(50%, 0); }
  30%{ transform: translate(50%, 10px); }
  60%{ transform: translate(50%, 0); }
`;

const spin = keyframes`
  from { transform: translate(50%, 0) rotateZ(0deg); }
  to { transform: translate(50%, 0) rotateZ(360deg); }
`;

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  display: block;
  padding: 20px 20px;
`;

const LoadButton = styled.button`

  color: white;
  cursor: pointer;
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin: 40px auto 100px;
  position: relative;
  text-align: center;
  text-shadow: 2px 2px black;
  transform-origin: center center;

  &:after{
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-name: ${ pulse };
    animation-timing-function: ease-out;
    bottom: -40px;
    content: "\\22CE";
    font-size: 2.5rem;
    position: absolute;
    right: 50%;
    text-shadow: 0px 2px black;
    transform: translate(50%, 0);
  }

  &.loading{

    &:after{
      animation-duration: .8s;
      animation-name: ${ spin };
      animation-timing-function: linear;
      width: 25px;
      height: 25px;
      border-left: 2px solid white;
      border-radius: 50%;
      content: '';
    }

  }

`;

export default Pokedex;
