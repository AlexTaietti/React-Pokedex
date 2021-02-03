import { BrowserRouter as Router, Route } from 'react-router-dom';
import pokedexReducer from '@reducers/pokedexReducer';
import PokemonDisplay from '@components/PokemonDisplay';
import PokemonList from '@components/PokemonList';
import styled from 'styled-components';
import { useReducer, useState } from 'react';

const Pokedex = () => {

  const [ listScrollValue, setListScrollValue ] = useState(undefined);
  const [ pokemonCardsData, setPokemonCardsData ] = useState({});

  //render the pokedex!
  return (

    <Router>

      <PokedexWrapper>

        <Route path="/pokemon/:pokemonName">
          <PokemonDisplay setPokemonCardsData={ setPokemonCardsData } pokemonCardsData={ pokemonCardsData }/>
        </Route>

        <Route exact path="/">
          <PokemonList listScrollValue={ listScrollValue } setListScrollValue={ setListScrollValue } pokemonCardsData={ pokemonCardsData } setPokemonCardsData={ setPokemonCardsData }/>
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
