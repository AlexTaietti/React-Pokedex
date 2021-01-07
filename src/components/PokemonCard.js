import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/PokemonCard.scss';

const PokemonCard = ({ pokemon }) => {

  return (

      <li className="pokemon-card">
        <Link to={`/pokemon/${pokemon.name}`}>
        <div className="sprite">
          <img className="sprite__side sprite__side--back" src={pokemon.sprite.back} alt={pokemon.name}/>
          <img className="sprite__side sprite__side--front" src={pokemon.sprite.front} alt={pokemon.name}/>
        </div>
        <p>{pokemon.name}</p>
        </Link>
      </li>

  );

}

export default PokemonCard;
