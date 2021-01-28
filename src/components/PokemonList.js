import { useLayoutEffect, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import PokemonLogo from '../images/pokemon.png';

import Loader from './Loader.js';
import PokemonCard from './PokemonCard.js';

const pulse = keyframes`
  0%{ transform: translate(50%, 0); }
  30%{ transform: translate(50%, 10px); }
  60%{ transform: translate(50%, 0); }
`;

const ListContainer = styled.div`

  margin: 0 auto;
  max-width: var(--content-max-width);
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
    list-style-type: none;
    justify-content: space-around;
  }

  & > main > button{

    color: white;
    cursor: pointer;
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    margin: 40px auto 100px;
    position: relative;
    text-align: center;
    text-shadow: 2px 2px black;

    &:after{
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-name: ${ pulse };
      animation-timing-function: ease-out;
      bottom: -35px;
      content: "\\22CE";
      font-size: 2.5rem;
      position: absolute;
      right: 50%;
      text-shadow: 0px 2px black;
      transform: translate(50%, 0);
    }

  }

  @media screen and (max-width: 700px){

    & > header { max-width: 80%; }

  }

  @media screen and (max-width: 500px){

    & > header { max-width: 100%; }

  }

`;

function PokemonList ({ pokedexDispatch, scrollValue, loadFreshBatchOfPokemons, pokemonCardsData }) {

  useEffect(() => {

    if(!pokemonCardsData.length) loadFreshBatchOfPokemons();

    return () => { pokedexDispatch({ type: 'UPDATE_ITEMS_MOUNT' }); };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  useLayoutEffect(() => {

    if(scrollValue) window.scrollTo(0, scrollValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    pokemonCardsData.length ?

      <ListContainer>
        <header role="banner" aria-label="pokemon logo">
          <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
        </header>
        <main aria-label="list of pokemons, scroll to the bottom of the page to catch more of 'em!">
          <ul className="pokemon-list">
            { pokemonCardsData.map( ({ pokemon, mountedOnce }) => <PokemonCard mountedOnce={mountedOnce} pokedexDispatch={pokedexDispatch} key={pokemon.id} pokemon={pokemon} /> ) }
          </ul>
          <button aria-label="click to catch more pokemons!" onClick={ loadFreshBatchOfPokemons }>Click to catch some more!</button>
        </main>
      </ListContainer> : <Loader/>

  );

}

export default PokemonList;
