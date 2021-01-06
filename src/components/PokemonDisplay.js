import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from './Loader.js';

import PokemonInfo from './PokemonInfo.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay ({selectedPokemon, handleClick}) {

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    (async function () {
    
      const pokemonDetails = await selectedPokemon.fetchDetails();
      
      selectedPokemon.setDetails(pokemonDetails);

      setPokemon(selectedPokemon);

    })();

  }, [selectedPokemon]);


  return (

    <React.Fragment>
      
      { ( pokemon && pokemon.details ) ?

        <div className="display">

          <Link className="home-link" to="/">&larr;back</Link>

          <img className="display__image" src={ pokemon.details.image } alt={ pokemon.name }/>

          <PokemonInfo pokemon={ pokemon }/>

          <Chart pokemonData={ pokemon.details.statsObject }/>

          <EvolutionChain handleClick={ handleClick } pokemonEvolution={ pokemon.details.evolutionsArray }/>

        </div>

        : <Loader/> }

    </React.Fragment>

  );

}

export default PokemonDisplay;
