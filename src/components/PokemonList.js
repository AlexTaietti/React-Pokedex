import React, { useEffect, useState } from 'react';
import Pokemon from '../classes/Pokemon.js';
import styled from 'styled-components';

import PokemonLogo from '../images/pokemon.png';

import Loader from './Loader.js';
import PokemonCard from './PokemonCard.js';

const ListContainer = styled.div`

  @keyframes pulse {

    0%{ transform: translate(50%, 0); }
    30%{ transform: translate(50%, 10px); }
    60%{ transform: translate(50%, 0); }

  }

  max-width: var(--content-max-width);
  margin: 0 auto;
  padding-top: 40px;

  & > header{

    display: block;
    margin: 0 auto 60px;
    max-width: 60%;

    & > img{ width: 100%; }

  }

  & > main > span {

    font-family: 'Orbitron', sans-serif;
    text-shadow: 2px 2px black;
    display: block;
    text-align: center;
    margin: 0 auto 160px;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    position: relative;

    &:after{
      content: "\\22CE";
      position: absolute;
      right: 50%;
      bottom: -35px;
      font-size: 2.5rem;
      transform: translate(50%, 0);
      text-shadow: 0px 2px black;
      animation-name: pulse;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
    }

  }

  .pokemon-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style-type: none;
  }

  @media screen and (max-width: 700px){

    & > header { max-width: 80%; }

  }

  @media screen and (max-width: 500px){

    & > header { max-width: 100%; }

  }

`;

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

      <ListContainer>
        <header role="banner" aria-label="pokemon logo">
          <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
        </header>
        <main aria-label="list of pokemons">
          <ul className="pokemon-list">
            { pokemonList.map( pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} /> ) }
          </ul>
          { loadedEveryPokemon ? <React.Fragment/> : <span>Catch some more!</span> }
        </main>
      </ListContainer>

      : <Loader/>

  );

}

export default PokemonList;
