import React from 'react';

import '../styles/PokemonInfo.scss';

function PokemonInfo ( { pokemonName, pokemonDetails } ) {

	return (

		<div className="info-container">
      <h1 tabIndex="0">{ pokemonName }</h1>
      <p tabIndex="0">{ pokemonDetails.formattedDescription }</p>
      <ul>
        <li>
          <h2 id="height-label">Height:</h2>
          <span tabIndex="0" aria-labelledby="height-label">{pokemonDetails.height}</span>
        </li>
        <li>
          <h2 id="weight-label">Weight:</h2>
          <span tabIndex="0" aria-labelledby="weight-label">{pokemonDetails.weight}</span>
        </li>
        <li>
          <h2 id="type-label">Type:</h2>
          <span tabIndex="0" aria-labelledby="type-label">{pokemonDetails.type}</span>
        </li>
        <li>
          <h2 id="attribute-label">Abilities:</h2>
          <span tabIndex="0" aria-labelledby="attribute-label">{pokemonDetails.abilities}</span>
        </li>
      </ul>
   </div>

	);

}

export default PokemonInfo;
