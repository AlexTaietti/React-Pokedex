import React, { useLayoutEffect, useEffect, useState } from 'react';
import Pokemon from '../classes/Pokemon.js';
import styled from 'styled-components';

import PokemonLogo from '../images/pokemon.png';

import Loader from './Loader.js';
import PokemonCard from './PokemonCard.js';
import LoadButton from './LoadButton.js';

const ListContainer = styled.div`

  max-width: var(--content-max-width);
  margin: 0 auto;
  padding-top: 40px;

  & > header{

    display: block;
    margin: 0 auto 60px;
    max-width: 60%;

    & > img{ width: 100%; }

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

function PokemonList ({ pokedexDispatch, scrollValue, loadFreshBatchOfPokemons, pokemonCards }) {

  useEffect(() => { if(!pokemonCards.length) loadFreshBatchOfPokemons(); } , []);

  useLayoutEffect(() => { if(scrollValue) window.scrollTo(0, scrollValue); }, []);

  return (

    pokemonCards.length ?

      <ListContainer>
        <header role="banner" aria-label="pokemon logo">
          <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
        </header>
        <main aria-label="list of pokemons, scroll to the bottom of the page to catch more of 'em!">
          <ul className="pokemon-list">
            { pokemonCards.map( ({ pokemon, mountedOnce }) => { return <PokemonCard mountedOnce={mountedOnce} pokedexDispatch={pokedexDispatch} key={pokemon.id} pokemon={pokemon} />; } ) }
          </ul>
          <LoadButton handleClick={ loadFreshBatchOfPokemons }/>
        </main>
      </ListContainer> : <Loader/>

  );

}

export default PokemonList;
