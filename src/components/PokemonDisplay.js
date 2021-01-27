import { useEffect, useState, useReducer, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';
import styled, { ThemeProvider } from 'styled-components';
import themes from '../styles/Themes.js';
import pokeDisplayReducer from '../state/reducers/PokeDisplayReducer.js';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

const DisplayContainer = styled.div`

  position: relative;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 50px 0;

  .display-content{
    display: grid;
    grid-template-columns: 48% 48%;
    grid-template-rows: 1fr 600px auto;
    grid-template-areas:
      "artwork details"
      "chart chart"
      "evolution-chain evolution-chain";
    column-gap: 4%;
    align-items: center;
    font-family: 'Orbitron', sans-serif;
  }

  .pokemon-details{ grid-area: details; }

  .pokemon-artwork{

    padding: 10px;
    grid-area: artwork;

    & > img{
      display: block;
      max-height: 400px;
      filter: saturate(2.5);
    }

  }

  .chart-container{
    grid-area: chart;
    justify-self: stretch;
    align-self: stretch;
  }

  .pokemon-evolution{ grid-area: evolution-chain; }

  .home-link{
    position: absolute;
    top: 50px;
    left: 0;
    font-size: 2rem;
    z-index: 1;
  }

  @media screen and (max-width: 950px) {

    .display-content{
      grid-template-columns: 100%;
      grid-template-rows: auto auto 600px auto;
      grid-template-areas:
        "artwork"
        "details"
        "chart"
        "evolution-chain";
      align-items: center;
      row-gap: 40px;
    }

    .pokemon-artwork > img { margin: 0 auto; }

    .home-link{ top: 15px; }

  }

  @media screen and (max-width: 600px) {

    padding: 30px 0;

    .pokemon-artwork > img { width: 300px; }

    .display-content{
      grid-template-rows: auto auto 450px auto;
      row-gap: 30px;
    }

  }

  @media screen and (max-width: 400px) {

    padding: 15px 0;

    .display-content{ grid-template-rows: auto auto 370px auto; }

  }


`;

const PokemonDisplay = ({ setLoadingList }) => {

  const { pokemonName } = useParams();

  const [ pokeState, pokeDispatch ] = useReducer( pokeDisplayReducer, {
    pokemon: undefined,
    theme: undefined,
    chartOptions: undefined
  });

  const resetSelection = () => pokeDispatch({ type: 'RESET_SELECTION' });

  useEffect(() => {

    const choosePokemon = async (pokemonName) => {

      const pokemon = await Pokemon.fetchPokemonBasicInfo(pokemonName);
      const pokemonDetails = await pokemon.fetchDetails();
      const detailedPokemon = { ...pokemon, details: { ...pokemonDetails } };

      const pokemonType = pokemonDetails.type.split('\n')[0];
      const pokemonTheme = themes[pokemonType];

      const pokemonChartOptions = {

        maxValue: 200,

        increments: 10,

        animation:{
          animated: true,
          duration: 2000,
          easingFunction: 'easeOutElastic'
        },

        style: {

          label: { font: `${ 12.5 * window.devicePixelRatio }px Orbitron` },

          chart: {
            background: true,
            fill: pokemonTheme.infoSolid
          },

          polygon: {
            contour: true,
            fill: 'rgba(255, 0, 0, 0.4)',
            stroke: 'rgba(255, 0, 0, 1)',
            lineWidth: 2
          }

        }

      };

      pokeDispatch( { type: 'CHOOSE_POKEMON', pokemon: detailedPokemon, theme: pokemonTheme, chartOptions: pokemonChartOptions });

    };

    choosePokemon(pokemonName);

  }, [pokemonName]);

  return (

      pokeState.pokemon && pokeState.theme ?

        <ThemeProvider theme={ pokeState.theme }>

          <DisplayContainer>

            <main tabIndex="0" className="display-content" aria-label={ `reasons why ${pokeState.pokemon.name} is awesome!` }>

              <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${pokeState.pokemon.name}'s artwork` }>
                <img src={ pokeState.pokemon.details.image } alt={ pokeState.pokemon.name }/>
              </figure>

              <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${pokeState.pokemon.name}` }>
                <PokemonInfo pokemonDetails={ pokeState.pokemon.details } pokemonName={ pokeState.pokemon.name }/>
              </section>

              <div tabIndex="0" className="chart-container" aria-label={ `${pokeState.pokemon.name}'s stats` }>
                <Chart options={ pokeState.chartOptions } data={ pokeState.pokemon.details.statsObject } />
              </div>

              <section tabIndex="0" className="pokemon-evolution" aria-label={ `${pokeState.pokemon.name}'s evolution chain` }>
                <EvolutionChain pokemonName={ pokeState.pokemon.name } pokemonEvolution={ pokeState.pokemon.details.evolutionsArray }/>
              </section>

              <Link onClick={ resetSelection } className="home-link" to="/">&larr;back</Link>

            </main>

          </DisplayContainer>

        </ThemeProvider> : <Loader/>

  );

}

export default PokemonDisplay;
