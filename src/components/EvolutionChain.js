import React from 'react';
import PokemonCard from './PokemonCard.js';

import '../styles/EvolutionChain.scss';


function EvolutionChain (props) {


  return (
  	<div className="evolution-chain">
  		<h1>Evolution Chain</h1>
	    <ul>
	      { props.pokemonEvolution.map((pokemon, index) => <PokemonCard handleClick={props.handleClick} key={index} pokemon={pokemon} />) }
	    </ul>
    </div>
  );

}

export default EvolutionChain;
