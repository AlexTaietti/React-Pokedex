import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/PokemonCard.scss';

const PokemonCard = (props) => {

  function handleClick () { props.handleClick(props.pokemon); }

  return (
    <Link to={`/pokemon/${props.pokemon.name}`}>
      <li onClick={handleClick} className="pokemon-card">
        <div className="sprite">
          <img className="sprite__side sprite__side--back" src={props.pokemon.sprite.back} alt={props.pokemon.name}/>
          <img className="sprite__side sprite__side--front" src={props.pokemon.sprite.front} alt={props.pokemon.name}/>
        </div>
        <p>{props.pokemon.name}</p>
      </li>
    </Link>
  )

}

export default PokemonCard;
