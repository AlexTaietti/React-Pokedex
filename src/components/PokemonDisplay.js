import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay () {

  const { pokemonName } = useParams();

  const [ selectedPokemon, selectPokemon ] = useState(undefined);

  const [ chartOptions, setChartOptions ] = useState({

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

        <div className="display-container">

          <main tabIndex="0" className="display-content" aria-label={ `reasons why ${selectedPokemon.name} is awesome!` }>

            <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${selectedPokemon.name}'s artwork` }>
              <img src={ selectedPokemon.image } alt={ selectedPokemon.name }/>
            </figure>

            <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${selectedPokemon.name}` }>
              <PokemonInfo pokemonDetails={ selectedPokemon } pokemonName={ selectedPokemon.name }/>
            </section>

            <div tabIndex="0" className="chart-container" aria-label={ `${selectedPokemon.name}'s stats` }>
              <Chart options={ chartOptions } data={ selectedPokemon.statsObject } />
            </div>

            <section tabIndex="0" className="pokemon-evolution" aria-label={ `${selectedPokemon.name}'s evolution chain` }>
              <EvolutionChain pokemonName={ selectedPokemon.name } pokemonEvolution={ selectedPokemon.evolutionsArray }/>
            </section>

            <Link onClick={ () => selectPokemon(undefined) } className="home-link" to="/">&larr;back</Link>

          </main>

        </div> : <Loader/>

  );

}

export default PokemonDisplay;
