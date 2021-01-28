import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useFadeIn } from '../state/hooks/useFadeIn';

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

const Card = styled.li`

  background: var(--pokecard-bg);
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

  &.hidden{
    opacity: 0;
    transform: translateY(-10px);
    transition-delay: 0s;
    transition-duration: 1s;
    transition-property: opacity, transform;
  }

  & a { display: block; }

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

const PokemonCard = ({ pokedexDispatch, mountedOnce, pokemon }) => {

  const fadeIn = useFadeIn(mountedOnce);

  const handleClick = () => {

    if(pokedexDispatch) pokedexDispatch({ type: 'SET_SCROLL_VALUE', scrollValue: window.scrollY });

    console.info(`You chose ${pokemon.name}!`);

  };

  return (

      <Card onClick={ handleClick } aria-label={pokemon.name} className={ fadeIn ? "hidden" : "mounted" }>
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
