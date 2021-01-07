import React, { useEffect, useState } from 'react';
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
