import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay ({ pokemonData }) {

  const { pokemonName } = useParams();

  const [selectedPokemon, selectPokemon] = useState(undefined);

  const polygonChartOptions = useRef({

    maxValue: 170,

    description: `${pokemonName}'s stats`,

    increments: 10,

    animation:{
      animated: true,
      duration: 2000,
      easingFunction: 'easeOutElastic'
    },

    style: {

      label: { font: "1.6rem Orbitron" },

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

  function resetDisplay () { selectPokemon(undefined); }

  useEffect(() => {

    (async () => {

      const pokemon = pokemonData.find( pokemon => pokemon.name === pokemonName );

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

  }, [pokemonName] );

  return (

    <React.Fragment>

      { ( selectedPokemon && selectedPokemon.details ) ?

        <div className="display-container">

          <main tabIndex="0" aria-label={ `reasons why ${selectedPokemon.name} is awesome!` } className="display-content">

            <figure tabIndex="0" aria-label={ `${selectedPokemon.name}'s artwork'` } className="pokemon-artwork">
              <img src={ selectedPokemon.details.image } alt={ selectedPokemon.name }/>
            </figure>

            <PokemonInfo pokemonDetails={ selectedPokemon.details } pokemonName={ selectedPokemon.name }/>

            <Chart data={ selectedPokemon.details.statsObject } options={ polygonChartOptions.current }/>

            <EvolutionChain pokemonName={ selectedPokemon.name } pokemonEvolution={ selectedPokemon.details.evolutionsArray }/>

            <Link onClick={ resetDisplay } className="home-link" to="/">&larr;back</Link>

          </main>

        </div>

        : <Loader/> }

    </React.Fragment>

  );

}

export default PokemonDisplay;
