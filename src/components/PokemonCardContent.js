import { Link } from 'react-router-dom';
import React from 'react';

const PokemonCardContent = ({ pokemon }) => {

  return (

    <React.Fragment>
      <Link to={`/pokemon/${pokemon.name}`}>
      <figure aria-label={`${pokemon.name}'s sprite`} className="sprite">
        <img alt={`${pokemon.name}'s back side`} className="sprite-side sprite-side--back" src={pokemon.sprite.back}/>
        <img alt={`${pokemon.name}'s front side`} className="sprite-side sprite-side--front" src={pokemon.sprite.front}/>
        <figcaption>{pokemon.name}</figcaption>
      </figure>
      </Link>
    </React.Fragment>

  );

}

export default PokemonCardContent;
