import PokemonCard from './PokemonCard.js';
import styled from 'styled-components';

const EvolutionContainer = styled.div`

  padding-top: 20px;

  h1 {
    color: white;
    text-align: center;
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 30px;
    text-shadow: 2px 2px black;
  }

  ul {

    display: flex;
    list-style-type: none;
    align-items: center;
    justify-content: space-around;

    > li:not(:last-of-type):after{
      content: "\\227B";
      position: absolute;
      right: -50px;
      bottom: 50%;
      font-size: 3rem;
      transform: translate(-50%, 50%);
      color: white;
      text-shadow: 1px 1px black;
    }

  }

  @media screen and (max-width: 700px) {

    ul{

      flex-direction: column;

      > li:not(:last-of-type):after{
        content: "\\22CE";
        position: absolute;
        right: 50%;
        bottom: -50px;
        transform: translateX(50%);
        text-shadow: 0px 2px black;
      }

    }

  }

  @media screen and (max-width: 600px) { padding: 0; }

  @media screen and (max-width: 400px) {

    h1{ font-size: 2.5rem; }

  }

`;


const EvolutionChain = ({ pokemonEvolution, pokemonName }) => {

  return (

  	<EvolutionContainer>
      <h1>Evolution Chain</h1>
      <ul role="listbox">
	      { pokemonEvolution.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />) }
	    </ul>
    </EvolutionContainer>

  );

};

export default EvolutionChain;
