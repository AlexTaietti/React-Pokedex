import { BrowserRouter as Router, Route } from 'react-router-dom';
import pokedexReducer from '@reducers/pokedexReducer';
import PokemonDisplay from '@components/PokemonDisplay';
import PokemonList from '@components/PokemonList';
import styled from 'styled-components';
import { useReducer } from 'react';

const Pokedex = () => { //holds pokemon data { basicInfo, details } & the last scroll value of list

  const [ pokedexState, pokedexDispatch ] = useReducer( pokedexReducer, {
    pokemonCardsData: [],
    listScrollValue: undefined
  });

  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route exact path="/pokemon/:pokemonName">
          <PokemonDisplay pokedexDispatch={ pokedexDispatch }/>
        </Route>

        <Route exact path="/">
          <PokemonList pokedexDispatch={ pokedexDispatch } pokemonCardsData={ pokedexState.pokemonCardsData } listScrollValue={ pokedexState.listScrollValue }/>
        </Route>

      </PokedexWrapper>

    </Router>

  );

};

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  display: block;
  padding: 20px 20px;
`;

export default Pokedex;
