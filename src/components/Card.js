import { PokemonCardContent } from '@components';
import styled, { keyframes } from 'styled-components';

const Card = ({ pokemon, ...restOfProps }) => {

  return (

    <StyledCard aria-label={ pokemon.name } {...restOfProps}>
      <PokemonCardContent pokemon={ pokemon } />
    </StyledCard>

  );

};

const fadeIn = keyframes`
  0%{ opacity: 0; transform: translateY(-10px); }
  100%{ opacity: 1; transform: translateY(0); }
`;

const rotateBack = keyframes`
  0%{ transform: rotateY(180deg); }
  50%{ transform: rotateY(360deg); }
  100%{ transform: rotateY(180deg); }
`;

const rotateFront = keyframes`
  0%{ transform: rotateY(0deg); }
  50%{ transform: rotateY(180deg); }
  100%{ transform: rotateY(360deg); }
`;

const StyledCard = styled.li`

  background: ${ (props) => props.theme.infoSolid ? props.theme.infoSolid : "var(--pokecard-bg)" };
  border-radius: 10px;
  box-shadow: 0px 7px 11px -3px black;
  font-family: 'Orbitron', sans-serif;
  margin: 10px 10px 60px;
  opacity: 1;
  position: relative;
  text-align: center;
  transform: translateY(0);
  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  width: 165px;

  &.list-card {
    animation-delay: 0.2s;
    animation-duration: 0.4s;
    animation-fill-mode: backwards;
    animation-name: ${ fadeIn };
  }

  a { display: block; }

  .sprite{

    padding: 15px 15px 25px;
    position: relative;

    &-side{

      backface-visibility: hidden;
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      &--front{
        position: relative;
        transform: rotateY(0deg);
      }

      &--back{
        position: absolute;
        transform: rotateY(180deg);
      }

    }

    & > figcaption{
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
      text-shadow: 1px 1px black;
      letter-spacing: .5px;
      text-transform: capitalize;
    }

  }

  &:hover{

    .sprite-side--front{ animation-name: ${rotateFront}; }

    .sprite-side--back{ animation-name: ${ rotateBack }; }

  }

  @media screen and (max-width: 450px) {

      width: 140px;

      .sprite > figcaption { font-size: 1.3rem; }

      .sprite-side{ width: 75px; }

  }


`;

export default Card;
