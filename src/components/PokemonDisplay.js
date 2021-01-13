import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay ({ pokemonList }) {

  const { pokemonName } = useParams();

  const [selectedPokemon, selectPokemon] = useState(undefined);

  const polygonChartOptions = {

    maxValue: 200,

    increments: 10,

    animation:{
      animated: true,
      duration: 2000,
      easingFunction: 'easeOutElastic'
    },

    style: {

      label: { font: `${ 11 * window.devicePixelRatio }px Orbitron` },

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

  };

  function resetDisplay () { selectPokemon(undefined); }

  useEffect(() => {

    (async () => {

      const pokemon = pokemonList.find( pokemon => pokemon.name === pokemonName );

      if(pokemon){

        const pokemonDetails = await pokemon.fetchDetails();

        pokemon.setDetails(pokemonDetails);

        selectPokemon(pokemon);

      } else {

        const specialPokemon = await Pokemon.fetchPokemonBasicInfo(pokemonName);

        const pokemonDetails = await specialPokemon.fetchDetails();

        specialPokemon.setDetails(pokemonDetails);

        selectPokemon(specialPokemon);

      }

    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName] );

  return (

    <React.Fragment>

      { ( selectedPokemon && selectedPokemon.details ) ?

        <div className="display-container">

          <main tabIndex="0" className="display-content" aria-label={ `reasons why ${selectedPokemon.name} is awesome!` }>

            <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${selectedPokemon.name}'s artwork` }>
              <img src={ selectedPokemon.details.image } alt={ selectedPokemon.name }/>
            </figure>

            <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${selectedPokemon.name}` }>
              <PokemonInfo pokemonDetails={ selectedPokemon.details } pokemonName={ selectedPokemon.name }/>
            </section>

            <div tabIndex="0" className="chart-container" aria-label={ `${selectedPokemon.name}'s stats` }>
              <Chart data={ selectedPokemon.details.statsObject } options={ polygonChartOptions }/>
            </div>

            <section tabIndex="0" className="pokemon-evolution" aria-label={ `${selectedPokemon.name}'s evolution chain` }>
              <EvolutionChain pokemonName={ selectedPokemon.name } pokemonEvolution={ selectedPokemon.details.evolutionsArray }/>
            </section>

            <Link onClick={ resetDisplay } className="home-link" to="/">&larr;back</Link>

          </main>

        </div>

        : <Loader/> }

    </React.Fragment>

  );

}

export default PokemonDisplay;
