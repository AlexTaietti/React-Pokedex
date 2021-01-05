import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay (props) {

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    (async function () {
    
      const pokemonDetails = await props.pokemon.fetchDetails();
      
      props.pokemon.setDetails(pokemonDetails);
      
      setPokemon(props.pokemon);
    
    })();

  }, [props.pokemon]);


  return (

    <React.Fragment>
      
      { pokemon.details ?

        <div className="display">

          <Link className="home-link" to="/">&larr;back</Link>

          <img className="display__image" src={ pokemon.details.image } alt={pokemon.name}/>

          <div className="display__qualities">
            <h1>{ pokemon.name }</h1>
            <p>{ pokemon.details.description }</p>
            <ul>
              <li>
                <h6>Height:</h6>
                <span>{pokemon.details.height}</span>
              </li>
              <li>
                <h6>Weight:</h6>
                <span>{pokemon.details.weight}</span>
              </li>
              <li>
                <h6>Type:</h6>
                <span>{pokemon.details.type}</span>
              </li>
              <li>
                <h6>Abilities:</h6>
                <span>{pokemon.details.ability}</span>
              </li>
            </ul>
          </div>

          <Chart pokemonData={pokemon.details}/>

          <EvolutionChain handleClick={props.handleClick} pokemonEvolution={pokemon.details.evolutionsArray}/>

        </div>

        : <Loader/> }

    </React.Fragment>

  )
}

export default PokemonDisplay;
