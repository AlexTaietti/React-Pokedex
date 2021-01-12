import React, { useState, useEffect, useRef } from 'react';
import Pokemon from '../classes/Pokemon.js';

import Loader from './Loader.js';

import PokemonList from './PokemonList.js';
import PokemonDisplay from './PokemonDisplay.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styles/Pokedex.scss';

function Pokedex () {

  //set up the pokedex's constants, state and references
  const pokemonFetchAmount = 20;

  const lastPokemon = useRef(0);

  const [loadedEveryPokemon, setLoadedEveryPokemon] = useState(false);

  const [pokemonData, setPokemonData] = useState([]);

  const pokemonListReference = useRef([]);

  //handle inifite scroll pokemon loading
  async function loadBatchOfPokemons () {

    console.log('Loading a fresh batch of pokemons!');

    const newPokemons = await Pokemon.fetchBatchPokemons(pokemonFetchAmount, lastPokemon.current);

    if(newPokemons) {

      lastPokemon.current += pokemonFetchAmount;

      const newPokemonsList = pokemonListReference.current.concat(newPokemons);

      setPokemonData(newPokemonsList);

      pokemonListReference.current = newPokemonsList;

    } else {

      setLoadedEveryPokemon(true);

      console.warn('Every single pokemon in existance has been loaded already');

    }

  }

  function handleScroll () {

    const documentHeight = document.body.scrollHeight;

    const scrolledFromTop = window.scrollY;

    const windowHeight = window.innerHeight;

    if(scrolledFromTop + windowHeight === documentHeight) loadBatchOfPokemons();

  }

  //on mount fetch the first 20 pokemons
  useEffect(() => {

    loadBatchOfPokemons();

  }, []);


  //render the pokedex!
  return (

    <Router>

      <Route exact path="/pokemon/:pokemonName">

        <div className="pokedex">
          { pokemonData.length ? <PokemonDisplay pokemonData={pokemonData} /> : <Loader/> }
        </div>

      </Route>

      <Route exact path="/">

        <div className="pokedex">

          { pokemonData.length ?

            <React.Fragment>
              <PokemonList handleScroll={ handleScroll } pokemons={pokemonData}/>
              {!loadedEveryPokemon ? <span>Catch some more!</span> : <React.Fragment/> }
            </React.Fragment>

            : <Loader/> }

        </div>

      </Route>

    </Router>

  );

}

export default Pokedex;
