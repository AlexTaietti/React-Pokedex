import React from 'react';
import PokemonCard from './PokemonCard.js';

import '../styles/EvolutionChain.scss';


function EvolutionChain ({ pokemonEvolution }) {

  return (

  	<div className="evolution-chain">
  		<h1>Evolution Chain</h1>
	    <ul>
	      { pokemonEvolution.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />) }
	    </ul>
    </div>

  );

}

export default EvolutionChain;
