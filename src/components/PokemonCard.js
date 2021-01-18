import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.li`

  @keyframes rotate-back{
    0%{ transform: rotateY(180deg); }
    50%{ transform: rotateY(360deg); }
    100%{ transform: rotateY(180deg); }
  }

  @keyframes rotate-front{
    0%{ transform: rotateY(0deg); }
    50%{ transform: rotateY(180deg); }
    100%{ transform: rotateY(360deg); }
  }

  @keyframes rotate-normal-back{
    100%{ transform: rotateY(180deg); }
  }

  @keyframes rotate-normal-front{
    100%{ transform: rotateY(0deg); }
  }

  text-align: center;
  margin: 10px 10px 60px;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  border-radius: 10px;
  background: var(--pokecard-bg);
  width: 165px;
  box-shadow: 0px 7px 11px -3px black;
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-delay: 0s;
  transform: translateY(0);
  opacity: 1;

  &.hidden{
    transition-property: opacity, transform;
    transition-duration: 1s;
    transition-delay: 0s;
    transform: translateY(-10px);
    opacity: 0;
  }

  & a { display: block; }

  .sprite{

    position: relative;
    padding: 15px 15px 25px;

    &-side{

      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      backface-visibility: hidden;

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

    .sprite-side--front{ animation-name: rotate-front; }

    .sprite-side--back{ animation-name: rotate-back; }

  }

  @media screen and (max-width: 450px) {

      width: 140px;

      .sprite > figcaption { font-size: 1.3rem; }

      .sprite-side{ width: 75px; }

  }


`;

const PokemonCard = ({ pokemon }) => {

  const [visible, setVisibility] = useState(false);

  useEffect(() => { setTimeout(() => setVisibility(true)); }, []);

  return (

      <Card aria-label={pokemon.name} className={ visible ? "mounted" : "hidden" }>
        <Link to={`/pokemon/${pokemon.name}`}>
        <figure aria-label={`${pokemon.name}'s sprite`} className="sprite">
          <img alt={`${pokemon.name}'s back side`} className="sprite-side sprite-side--back" src={pokemon.sprite.back}/>
          <img alt={`${pokemon.name}'s front side`} className="sprite-side sprite-side--front" src={pokemon.sprite.front}/>
          <figcaption>{pokemon.name}</figcaption>
        </figure>
        </Link>
      </Card>

  );

}

export default PokemonCard;
