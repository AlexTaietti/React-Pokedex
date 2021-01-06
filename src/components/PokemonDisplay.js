import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay ({ selectedPokemon, selectPokemon }) {

  function resetDisplay () { selectPokemon(undefined); }

  return (

    <React.Fragment>
      
      { ( selectedPokemon && selectedPokemon.details ) ?

        <div className="display">

          <Link onClick={resetDisplay} className="home-link" to="/">&larr;back</Link>

          <img className="display__image" src={ selectedPokemon.details.image } alt={ selectedPokemon.name }/>

          <PokemonInfo pokemon={ selectedPokemon }/>

          <Chart pokemonData={ selectedPokemon.details.statsObject }/>

          <EvolutionChain selectPokemon={ selectPokemon } pokemonEvolution={ selectedPokemon.details.evolutionsArray }/>

        </div>

        : <Loader/> }

    </React.Fragment>

  );

}

export default PokemonDisplay;
