import React from 'react';
import PokemonCard from './PokemonCard.js';
import PokemonLogo from '../images/pokemon.png';

import '../styles/PokemonList.scss';

const PokemonList = ({ selectPokemon, pokemons }) => {

  return (
    <div className="list-container">
      <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
      <ul className="pokemon-list">
        {pokemons.map( pokemon => <PokemonCard selectPokemon={selectPokemon} key={pokemon.id} pokemon={pokemon} /> )}
      </ul>
    </div>
  );

}

export default PokemonList;
