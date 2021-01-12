import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/PokemonCard.scss';

const PokemonCard = ({ pokemon }) => {

  const [visible, setVisibility] = useState(false);

  useEffect(() => {

    setVisibility(true);

  }, []);

  return (

      <li aria-label={pokemon.name} className={ visible ? "pokemon-card" : "pokemon-card hidden" }>
        <Link to={`/pokemon/${pokemon.name}`}>
        <figure aria-label={`${pokemon.name}'s sprite`} className="sprite">
          <img alt={`${pokemon.name}'s back side`} className="sprite-side sprite-side--back" src={pokemon.sprite.back}/>
          <img alt={`${pokemon.name}'s front side`} className="sprite-side sprite-side--front" src={pokemon.sprite.front}/>
          <figcaption>{pokemon.name}</figcaption>
        </figure>
        </Link>
      </li>

  );

}

export default PokemonCard;
