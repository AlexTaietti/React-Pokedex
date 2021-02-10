import { ListCard } from '@components';
import styled from 'styled-components';

function PokemonList ({ pokemons }) {

  return (
    <PokeList>
      { pokemons.map( pokemon => <ListCard key={pokemon.id} pokemon={pokemon.data} /> ) }
    </PokeList>
  );

};

const PokeList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: space-around;
`;

export default PokemonList;
