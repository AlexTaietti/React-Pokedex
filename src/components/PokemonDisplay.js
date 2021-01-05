import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader.js';
import Chart from './Chart.js';
import EvolutionChain from './EvolutionChain.js';

import '../styles/PokemonDisplay.scss';

function PokemonDisplay (props) {

  const [pokemonInfo, setPokemonInfo] = useState();

  useEffect(() => {

    (async function () {
      await props.pokemon.fetchDetails();
      setPokemonInfo(props.pokemon.details);
    })();

  }, [props.pokemon]);


  return (
    <React.Fragment>
      {pokemonInfo ?

        <div className="display">

          <Link className="home-link" to="/">&larr;back</Link>

          <img className="display__image" src={ pokemonInfo.image } alt={props.pokemon.name}/>

          <div className="display__qualities">
            <h1>{ props.pokemon.name }</h1>
            <p>{ pokemonInfo.description.charAt(0).toUpperCase() + pokemonInfo.description.slice(1).toLowerCase() }</p>
            <ul>
              <li>
                <h6>Height:</h6>
                <span>{pokemonInfo.height}</span>
              </li>
              <li>
                <h6>Weight:</h6>
                <span>{pokemonInfo.weight}</span>
              </li>
              <li>
                <h6>Type:</h6>
                <span>{pokemonInfo.type}</span>
              </li>
              <li>
                <h6>Abilities:</h6>
                <span>{pokemonInfo.ability.join("\n")}</span>
              </li>
            </ul>
          </div>

          <Chart pokemonData={pokemonInfo}/>

          <EvolutionChain handleClick={props.handleClick} pokemonEvolution={pokemonInfo.evolutionsArray}/>

        </div>

        : <Loader/>}

    </React.Fragment>

  )
}

export default PokemonDisplay;
