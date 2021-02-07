import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchData, fetchPokemonByName, fetchPokemonDetails, localStorageReducer } from '@utils';
import { Loader, PokemonDisplay, PokemonList } from '@components';
import styled from 'styled-components';
import { useState, useEffect, useRef, useMemo } from 'react';

const Pokedex = () => {

  const [ pokemonData, setPokemonData ] = useState(undefined); //will hold all the actual pokemon data
  const [ loadedAllPokemons, setLoadedAllPokemons ] = useState(false); //flag to prevent surpassing the pokemon amount limit
  const [ loadingMorePokemons, setLoadingMorePokemons ] = useState(false); //flag for the spinner at the bottom of the pokeList
  const [ listIndex, setListIndex ] = useState(0); //will be used like a pointer to traverse the pokeReference array

  const pokeReference = useRef(undefined); //will hold an iterable list of all pokemon names and their respective URLs


  //mash together a basic pokemon object and the corresponding details
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

        return { ...currentPokemons, [pokemonName]: { ...detailedPokemon } }

      });

      return detailedPokemon;

    }

    const newPokemon = await fetchPokemonByName(pokemonName);

    const detailedPokemon = await makeDetailedPokemon(newPokemon);

    setPokemonData( currentPokemons => {

      return { ...currentPokemons, [pokemonName]: { ...detailedPokemon } }

    });

    return detailedPokemon;

  };


  //click callback for the "load more" button
  const catchMorePokemons = async () => {

    if(loadedAllPokemons) return;

    setLoadingMorePokemons(true);

    const batchAmount = 20;
    const pokemonsListLength = pokeReference.current.length;
    const adjustedFetchAmount = listIndex + batchAmount >= pokemonsListLength ? pokemonsListLength - listIndex : batchAmount;
    const pokemonBatch = {};

    for(let i=0; i < adjustedFetchAmount; i++){

      const pokemonName = pokeReference.current[listIndex + i].name;

      if(pokemonData[pokemonName]) continue;

      const newPokemon = await fetchPokemonByName(pokemonName);

      pokemonBatch[pokemonName] = newPokemon;

    }

    setPokemonData(currentPokemons => {

      return { ...currentPokemons, ...pokemonBatch };

    });

    setListIndex(oldIndex => oldIndex + adjustedFetchAmount);

    if(adjustedFetchAmount < batchAmount) { setLoadedAllPokemons(true); }

    setLoadingMorePokemons(false);

  };


  //these are the pokemons that are gonna be rendered in the list
  const pokemons = useMemo(() => {

    const listPokemons = [];

    for(let i=0; i < listIndex; i++){

      const currentPokemon = pokeReference.current[i].name;

      const pokemon = pokemonData[currentPokemon];

      if(!pokemon) continue;

      listPokemons.push(pokemon);

    }

    return listPokemons;

  }, [listIndex]);

  //on mount retrieve all the cached data
  useEffect(() => {

    (async () => {

      const maximumPokemonAmount = 384; //first 3 generations up to Rayquaza

      const cachedReference = localStorageReducer('GET', 'pokeReference'); //check if a cached reference exists
      const cachedPokemons = localStorageReducer('GET', 'pokemonData'); //check if a cached reference exists

      if(cachedReference){ //if so load the cached one...

        pokeReference.current = cachedReference;

      } else { //otherwise fetch new one

        const referenceData = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${maximumPokemonAmount}`);

        pokeReference.current = referenceData.results;

      }

      if(cachedPokemons){ //if so load the cached pokemons...

        setPokemonData(cachedPokemons);

      } else { //otherwise set an empty array

        setPokemonData({});

      }

    })();

    //save the reference to local storage
    return () => localStorageReducer('SET', { key: 'pokeReference', data: pokeReference.current });

  }, []);


  useEffect(() => {

    //save the pokemon data to local storage
    return () => localStorageReducer('SET', { key: 'pokemonData', data: pokemonData });

  }, [pokemonData]);


  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route path="/pokemon/:pokemonName">
          { pokeReference.current ? <PokemonDisplay getEnhancedPokemon={ getEnhancedPokemon }/> : <Loader/> }
        </Route>

        <Route exact path="/">
          { pokeReference.current ? <PokemonList loadingMorePokemons={ loadingMorePokemons } loadedAllPokemons={ loadedAllPokemons } pokemons={ pokemons } catchMorePokemons={ catchMorePokemons }/> : <Loader/> }
        </Route>

      </PokedexWrapper>

    </Router>

  );

};

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  display: block;
  padding: 20px 20px;
`;

export default Pokedex;
