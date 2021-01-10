import React from 'react';
import PokemonCard from './PokemonCard.js';

import '../styles/EvolutionChain.scss';


function EvolutionChain ({ pokemonEvolution, pokemonName }) {

  return (

  	<div className="evolution-chain-container">
  		<h1>Evolution Chain</h1>
	    <ul role="listbox">
	      { pokemonEvolution.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />) }
	    </ul>
    </div>

  );

}

export default EvolutionChain;
