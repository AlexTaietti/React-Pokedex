import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';
import styled from 'styled-components';

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

const PokemonDisplay = () => {

  const { pokemonName } = useParams();

  const [ selectedPokemon, selectPokemon ] = useState(undefined);

  const chartOptions = useRef({

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
        fill: 'rgba(0, 255, 255, 0.7)'
      },

      polygon: {
        contour: true,
        fill: 'rgba(255, 0, 0, 0.4)',
        stroke: 'rgba(255, 0, 0, 1)',
        lineWidth: 2
      }

    }

  });

  useEffect(() => {

    (async () => {

      const pokemon = await Pokemon.fetchPokemonBasicInfo(pokemonName);

      const pokemonDetails = await pokemon.fetchDetails();

      selectPokemon({...pokemon, ...pokemonDetails});

    })();

  }, [pokemonName]);

  return (

    selectedPokemon ?

        <DisplayContainer>

          <main tabIndex="0" className="display-content" aria-label={ `reasons why ${selectedPokemon.name} is awesome!` }>

            <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${selectedPokemon.name}'s artwork` }>
              <img src={ selectedPokemon.image } alt={ selectedPokemon.name }/>
            </figure>

            <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${selectedPokemon.name}` }>
              <PokemonInfo pokemonDetails={ selectedPokemon } pokemonName={ selectedPokemon.name }/>
            </section>

            <div tabIndex="0" className="chart-container" aria-label={ `${selectedPokemon.name}'s stats` }>
              <Chart options={ chartOptions.current } data={ selectedPokemon.statsObject } />
            </div>

            <section tabIndex="0" className="pokemon-evolution" aria-label={ `${selectedPokemon.name}'s evolution chain` }>
              <EvolutionChain pokemonName={ selectedPokemon.name } pokemonEvolution={ selectedPokemon.evolutionsArray }/>
            </section>

            <Link onClick={ () => selectPokemon(undefined) } className="home-link" to="/">&larr;back</Link>

          </main>

        </DisplayContainer> : <Loader/>

  );

}

export default PokemonDisplay;
