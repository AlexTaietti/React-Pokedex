import React, { useEffect } from 'react';
import PokemonCard from './PokemonCard.js';
import PokemonLogo from '../images/pokemon.png';

import '../styles/PokemonList.scss';

const PokemonList = ({ pokemons, handleScroll }) => {

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-container">
      <header role="banner" aria-label="pokemon logo">
        <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
      </header>
      <main aria-label="list of pokemons">
        <ul role="listbox" className="pokemon-list">
          {pokemons.map( pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} /> )}
        </ul>
      </main>
    </div>
  );

}

export default PokemonList;
