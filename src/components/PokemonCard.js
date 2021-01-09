import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/PokemonCard.scss';

const PokemonCard = ({ pokemon }) => {

  return (

      <li aria-label={pokemon.name} className="pokemon">
        <div className="pokemon-card">
          <Link to={`/pokemon/${pokemon.name}`}>
          <figure aria-label={`${pokemon.name}'s sprite`} className="sprite">
            <img alt={`${pokemon.name}'s back side`} className="sprite__side sprite__side--back" src={pokemon.sprite.back}/>
            <img alt={`${pokemon.name}'s front side`} className="sprite__side sprite__side--front" src={pokemon.sprite.front}/>
            <figcaption>{pokemon.name}</figcaption>
          </figure>
          </Link>
        </div>
      </li>

  );

}

export default PokemonCard;
