import React from 'react';
import PokemonCard from './PokemonCard.js';

import '../styles/EvolutionChain.scss';


function EvolutionChain ({ pokemonEvolution, pokemonName }) {

  return (

  	<section aria-label={ `${pokemonName}'s evolution chain'` } className="evolution-chain">
  		<h1>Evolution Chain</h1>
	    <ul role="listbox">
	      { pokemonEvolution.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />) }
	    </ul>
    </section>

  );

}

export default EvolutionChain;
