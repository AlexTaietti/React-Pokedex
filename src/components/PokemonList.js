import React, { useEffect, useState } from 'react';
import Pokemon from '../classes/Pokemon.js';

import PokemonLogo from '../images/pokemon.png';

import Loader from './Loader.js';
import PokemonCard from './PokemonCard.js';

function PokemonList () {

  const [pokemonList, setPokemonList] = useState([]);

  const [loadedEveryPokemon, setLoadedEveryPokemon] = useState(false);

  useEffect(() => {

    let loadFreshBatchOfPokemons;

    (async () => {

      console.log('Mounting pokedex...');

      let lastPokemonIndex = 0;

      let loading = false;

      const pokemonFetchAmount = 20;

      const maximumPokemonAmount = 493; //the first 4 generations

      const pokemons = await Pokemon.fetchBatchPokemons(lastPokemonIndex, pokemonFetchAmount);

      lastPokemonIndex = pokemons[pokemons.length - 1].id;

      setPokemonList(pokemons);

      loadFreshBatchOfPokemons = async () => {

        if(loading || window.scrollY + window.innerHeight < (document.documentElement.scrollHeight) ){ return; }

        console.log('Loading a fresh batch of Pokemons!');

        const adjustedfetchAmount = lastPokemonIndex + pokemonFetchAmount > maximumPokemonAmount ? (maximumPokemonAmount - lastPokemonIndex) : pokemonFetchAmount;

        const nextPokemonBatch = await Pokemon.fetchBatchPokemons(lastPokemonIndex, adjustedfetchAmount);

        lastPokemonIndex = nextPokemonBatch[nextPokemonBatch.length - 1].id;

        setPokemonList( (oldList) => [...oldList, ...nextPokemonBatch] );

        if(lastPokemonIndex === maximumPokemonAmount){

          console.log('every pokemon in existance has been loaded!');

          window.removeEventListener('scroll', loadFreshBatchOfPokemons);

          setLoadedEveryPokemon(true);

        }

      };

      window.addEventListener('scroll', loadFreshBatchOfPokemons);

    })();

    return () => { window.removeEventListener('scroll', loadFreshBatchOfPokemons); }

  }, []);

  return (

    pokemonList.length ?

      <div className="list-container">
        <header role="banner" aria-label="pokemon logo">
          <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
        </header>
        <main aria-label="list of pokemons">
          <ul className="pokemon-list">
            { pokemonList.map( pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} /> ) }
          </ul>
          { loadedEveryPokemon ? <React.Fragment/> : <span>Catch some more!</span> }
        </main>
      </div>

      : <Loader/>

  );

}

export default PokemonList;
