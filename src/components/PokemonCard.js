import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/PokemonCard.scss';

const PokemonCard = ({ selectPokemon, pokemon }) => {

  async function handleClick () {

    if(!pokemon.details){

      const pokemonDetails = await pokemon.fetchDetails();
      
      pokemon.setDetails(pokemonDetails);

    }

    selectPokemon(pokemon);

  }

  return (

    <Link to={`/pokemon/${pokemon.name}`}>
      <li onClick={handleClick} className="pokemon-card">
        <div className="sprite">
          <img className="sprite__side sprite__side--back" src={pokemon.sprite.back} alt={pokemon.name}/>
          <img className="sprite__side sprite__side--front" src={pokemon.sprite.front} alt={pokemon.name}/>
        </div>
        <p>{pokemon.name}</p>
      </li>
    </Link>
  
  );

}

export default PokemonCard;
