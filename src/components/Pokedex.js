import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchData, fetchPokemonByName, fetchPokemonDetails, localStorageReducer } from '@utils';
import { Loader, PokemonDisplay, PokemonList, ListHeader, ListView } from '@components';
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

const Pokedex = () => {

  const [ pokeReference, setPokeReference ] = useState(undefined); //will hold an iterable list of all pokemon names and their respective URLs
  const [ pokemonData, setPokemonData ] = useState(undefined); //will hold all the actual pokemon data

  const [ pokemonList, setPokemonList ] = useState([]); //pokemons to be displayed in the list component
  const [ listIndex, setListIndex ] = useState(0); //will be the "pointer" used to traverse the pokeReference arrayy

  const [ booting, setBooting ] = useState(true); //app initial set-up process flag
  const [ loadedAllPokemons, setLoadedAllPokemons ] = useState(false); //flag to prevent surpassing the pokemon amount limit
  const [ loadingMorePokemons, setLoadingMorePokemons ] = useState(false); //flag for the spinner at the bottom of the pokeList


  //mash together a basic pokemon object and the corresponding details, return result
  const makeDetailedPokemon = async (pokemon) => {

    const pokemonDetails = await fetchPokemonDetails(pokemon.data.name);

    return { ...pokemon, details: { ...pokemonDetails } };

  };


  //this callback is used gets a detailed pokemon (used in the display component)
  const getEnhancedPokemon = async (pokemonName) => {

    const pokemon = pokemonData[pokemonName];

    if(pokemon){

      if(pokemon.details) return pokemon;

      const detailedPokemon = await makeDetailedPokemon(pokemon);

      setPokemonData( currentPokemons => {

        return { ...currentPokemons, [detailedPokemon.data.name]: { ...detailedPokemon } }

      });

      return detailedPokemon;

    }

    const newPokemon = await fetchPokemonByName(pokemonName);

    const detailedPokemon = await makeDetailedPokemon(newPokemon);

    setPokemonData( currentPokemons => {

      return { ...currentPokemons, [detailedPokemon.data.name]: { ...detailedPokemon } }

    });

    return detailedPokemon;

  };


  //retrieve pokemons either from cache or API call based on an array of names
  const catchPokemons = async (pokemons) => {

    const cachedPokemons = [];
    const newPokemons = [];

    const newPokemonsData = await Promise.all( pokemons.filter( currentPokemon => {

      const pokemon = pokemonData[currentPokemon];

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

    setPokemonData(currentPokemons => {

      return { ...currentPokemons, ...newPokemonsObject };

    });

    const pokemonsArray = Promise.all([...cachedPokemons, ...newPokemons]);

    return pokemonsArray;

  };


  //click callback for the "load more" button
  const catchMorePokemons = async () => {

    if(loadedAllPokemons) return;

    setLoadingMorePokemons(true);

    const batchAmount = 20;

    const pokemonsListLength = pokeReference.length;
    const adjustedFetchAmount = listIndex + batchAmount >= pokemonsListLength ? pokemonsListLength - listIndex : batchAmount;

    const lastIndex = listIndex + adjustedFetchAmount;

    const referenceSlice = pokeReference.slice(listIndex, lastIndex).map(pokemon => pokemon.name);

    const newPokemons = await catchPokemons(referenceSlice);

    setPokemonList(currentList => [...currentList, ...newPokemons]);

    setListIndex(oldIndex => oldIndex + adjustedFetchAmount);

    if(adjustedFetchAmount < batchAmount) { setLoadedAllPokemons(true); }

    setLoadingMorePokemons(false);

  };


  //on mount retrieve all the cached data
  useEffect(() => {

    (async () => {

      const maximumPokemonAmount = 384; //first 3 generations up to Rayquaza

      const cachedReference = localStorageReducer('GET', 'pokeReference'); //check if a cached reference exists

      const cachedPokemons = localStorageReducer('GET', 'pokemonData'); //check if there are any pokemons in cache

      if(cachedReference){ //if so load the cached one...

        setPokeReference(cachedReference);

      } else { //otherwise fetch new one

        const referenceData = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${maximumPokemonAmount}`);

        setPokeReference(referenceData.results);

      }

      if(cachedPokemons){ //if so load the cached pokemons...

        setPokemonData(cachedPokemons);

      } else { //otherwise set an empty array

        setPokemonData({});

      }

      setBooting(false);

    })();

  }, []);


  //whenever pokemonData changes cache it
  useEffect(() => {

    return () => { if (pokemonData) localStorageReducer('SET', { key: 'pokemonData', data: pokemonData }); };

  }, [pokemonData]);


  ////whenever setPokeReference changes cache it
  useEffect(() => {

    return () => { if (pokeReference) localStorageReducer('SET', { key: 'pokeReference', data: pokeReference }); };

  }, [pokeReference]);


  //render the pokedex!
  return (

    !booting ?

      <Router>

        <PokedexWrapper>

          <Route path="/pokemon/:pokemonName">

            <PokemonDisplay catchPokemons={ catchPokemons } getEnhancedPokemon={ getEnhancedPokemon }/>

          </Route>

          <Route exact path="/">

            <ListView pokemons={ pokemonList } catchMorePokemons={ catchMorePokemons }>

              <ListHeader/>

              <main tabIndex="0" id="pokemon-list" aria-label="list of pokemons, click the button at the end of the page to catch more of 'em!">

                <PokemonList pokemons={ pokemonList }/>

                { !loadedAllPokemons && <LoadButton onClick={ catchMorePokemons } className={ loadingMorePokemons ? 'loading' : 'ready' } tabIndex="0" aria-describedby="pokemon-list" aria-label="catch more pokemons!">Click to catch some more!</LoadButton> }

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
