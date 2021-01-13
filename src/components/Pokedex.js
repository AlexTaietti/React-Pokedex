import React, { useState, useEffect, useRef } from 'react';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styles/Pokedex.scss';

function Pokedex () {

  //set up the pokedex's constants and references
  const pokemonFetchAmount = 20;
  const pokemonListReference = useRef([]);
  const loadingReference = useRef(false);

  //set pokedex state
  const [pokemonList, setpokemonList] = useState([]);

  //handle inifite scroll pokemon loading
  async function loadBatchOfPokemons () {

    loadingReference.current = true;

    console.log('Loading a fresh batch of pokemons!');

    const newPokemons = await Pokemon.fetchBatchPokemons(pokemonFetchAmount, pokemonListReference.current.length);

    if(newPokemons) {

      const newPokemonList = pokemonListReference.current.concat(newPokemons);

      loadingReference.current = false;
      setpokemonList( newPokemonList );

      pokemonListReference.current = newPokemonList;

    }

  };

  function handleScroll () {

    const documentHeight = document.body.scrollHeight;

    const scrolledFromTop = window.scrollY;

    const windowHeight = window.innerHeight;

    if(!loadingReference.current && scrolledFromTop + windowHeight === documentHeight) loadBatchOfPokemons();

  };

  //on mount fetch the first 20 pokemons
  useEffect(() => {

    loadBatchOfPokemons();

  }, []);


  //render the pokedex!
  return (

    <Router>

      <Route exact path="/pokemon/:pokemonName">

        <div className="pokedex">
          { pokemonList.length ? <PokemonDisplay pokemonList={pokemonList} /> : <Loader/> }
        </div>

      </Route>

      <Route exact path="/">

        <div className="pokedex">

          { pokemonList.length ?

            <React.Fragment>
              <PokemonList handleScroll={ handleScroll } pokemons={pokemonList}/>
              {true ? <span>Catch some more!</span> : <React.Fragment/> }
            </React.Fragment>

            : <Loader/> }

        </div>

      </Route>

    </Router>

  );

}

export default Pokedex;
