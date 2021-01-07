import React from 'react';

import '../styles/PokemonInfo.scss';

function PokemonInfo ( { pokemon, pokemon : { details : pokemonDetails } } ) {

	return (

		<div className="display__qualities">
	        <h1>{ pokemon.name }</h1>
	        <p>{ pokemonDetails.formattedDescription }</p>
	        <ul>
	          <li>
	            <h6>Height:</h6>
	            <span>{pokemonDetails.height}</span>
	          </li>
	          <li>
	            <h6>Weight:</h6>
	            <span>{pokemonDetails.weight}</span>
	          </li>
	          <li>
	            <h6>Type:</h6>
	            <span>{pokemonDetails.type}</span>
	          </li>
	          <li>
	            <h6>Abilities:</h6>
	            <span>{pokemonDetails.ability}</span>
	          </li>
	        </ul>
	     </div>

	);

}

export default PokemonInfo;
