import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import PokemonDisplay from './PokemonDisplay';
import PokemonList from './PokemonList.js';

const PokedexWrapper = styled.div`
  background: var(--pokedex-bg);
  padding: 20px 20px;
  display: block;
`;

const Pokedex = () => {

  //render the pokedex!
  return (

    <Router>

      <Route exact path="/pokemon/:pokemonName">
        <PokedexWrapper>
          <PokemonDisplay/>
        </PokedexWrapper>
      </Route>

      <Route exact path="/">
        <PokedexWrapper>
          <PokemonList/>
        </PokedexWrapper>
      </Route>

    </Router>

  );

};

export default Pokedex;
