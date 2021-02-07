import { Card } from '@components';
import styled from 'styled-components';

const EvolutionChain = ({ pokemonEvolution }) => {

  return (

  	<EvolutionContainer>
      <h1>Evolution Chain</h1>
      <ul role="listbox">
	      { pokemonEvolution.map(({ id, data }) => <Card key={id} pokemon={data} /> )}
	    </ul>
    </EvolutionContainer>

  );

};

const EvolutionContainer = styled.div`

  padding-top: 20px;

  h1 {
    color: white;
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 30px;
    text-align: center;
    text-shadow: 2px 2px black;
  }

  ul {

    align-items: center;
    display: flex;
    justify-content: space-around;
    list-style-type: none;

    > li:not(:last-of-type):after{
      bottom: 50%;
      color: white;
      content: "\\227B";
      font-size: 3rem;
      position: absolute;
      right: -50px;
      text-shadow: 1px 1px black;
      transform: translate(-50%, 50%);
    }

  }

  @media screen and (max-width: 700px) {

    ul{

      flex-direction: column;

      > li:not(:last-of-type):after{
        bottom: -50px;
        content: "\\22CE";
        position: absolute;
        right: 50%;
        text-shadow: 0px 2px black;
        transform: translateX(50%);
      }

    }

  }

  @media screen and (max-width: 600px) { padding: 0; }

  @media screen and (max-width: 400px) {

    h1{ font-size: 2.5rem; }

  }

`;

export default EvolutionChain;
