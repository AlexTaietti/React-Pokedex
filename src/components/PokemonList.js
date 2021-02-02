import { catchSomePokemons } from '@utils/utils';
import ListCard from '@components/ListCard';
import Loader from '@components/Loader';
import PokemonLogo from '@images/pokemon.png';
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

function PokemonList ({ listScrollValue, pokemonCardsData , pokedexDispatch }) {

  const [ loading, setLoading ] = useState(false);
  const [ loadedAll, setLoadedAll ] = useState(false);

  const loadFreshBatchOfPokemons = useCallback(async () => {

    if(loadedAll || loading) return;

    setLoading(true);

    const lastID = pokemonCardsData.length ? pokemonCardsData[pokemonCardsData.length -  1].id : 0;
    const maximumPokemonAmount = 384; //first three generations up to Rayquaza
    const pokemonBatchAmount = 16;

    let adjustedFetchAmount, loadedEveryPokemon;

    if(pokemonCardsData.length + pokemonBatchAmount >= maximumPokemonAmount){

      adjustedFetchAmount = maximumPokemonAmount - pokemonCardsData.length;

      loadedEveryPokemon = true;

    } else { adjustedFetchAmount = pokemonBatchAmount; }

    const newPokemons = await catchSomePokemons( lastID, adjustedFetchAmount );

    const newPokemonCards = newPokemons.map((pokemonInfo) => {

      return { ...pokemonInfo, mountedOnce: false };

    });

    pokedexDispatch({ type: 'ADD_POKEMONS', pokemonCardsData: newPokemonCards });

    if(loadedEveryPokemon) setLoadedAll(true);

    setLoading(false);

  //eslint-disable-next-line
  }, [loading, loadedAll]);


  useEffect(() => {

    if (!pokemonCardsData.length) loadFreshBatchOfPokemons();

    return () => { pokedexDispatch({ type: 'UPDATE_ITEMS_MOUNT' }); };

  //eslint-disable-next-line
  }, []);

  //eslint-disable-next-line
  useLayoutEffect(() => { if (listScrollValue) window.scrollTo(0, listScrollValue); }, []);

  return (

    pokemonCardsData.length ?

      <ListContainer>
        <header tabIndex="0" role="banner" aria-label="pokemon logo">
          <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
        </header>
        <main tabIndex="0" id="pokemon-list" aria-label="list of pokemons, click on the button at the end of the page to catch more of 'em!">
          <ul className="pokemon-list">
            { pokemonCardsData.map( ({ id, data, mountedOnce }) => <ListCard mountedOnce={mountedOnce} pokedexDispatch={pokedexDispatch} key={id} pokemon={data} /> ) }
          </ul>
          { loadedAll ? <React.Fragment/> : <button className={ loading ? 'loading' : 'ready' } tabIndex="0" aria-describedby="pokemon-list" aria-label="catch more pokemons!" onClick={ loadFreshBatchOfPokemons }>Click to catch some more!</button> }
        </main>
      </ListContainer> : <Loader/>

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

  }

  @media screen and (max-width: 700px){

    & > header { max-width: 80%; }

  }

  @media screen and (max-width: 500px){

    & > header { max-width: 100%; }

  }

`;

export default PokemonList;
