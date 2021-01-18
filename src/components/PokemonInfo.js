import styled from 'styled-components';

const InfoContainer = styled.div`

	padding: 30px 40px;
	border-radius: 10px;
	width: 100%;
	box-shadow: 0px 15px 15px 0px black;

	&.water{
		background: var(--water-info-container-bg);
		& h1{ color: var(--water-info-container-label-color); }
		& p{ color: var(--water-info-container-text-color); }
		& h2{ color: var(--water-info-container-label-color); }
		& span{ color: var(--water-info-container-text-color); }
	}

	&.normal{
		background: var(--water-info-container-bg);
		& h1{ color: var(--water-info-container-label-color); }
		& p{ color: var(--water-info-container-text-color); }
		& h2{ color: var(--water-info-container-label-color); }
		& span{ color: var(--water-info-container-text-color); }
	}

	&.fire{
		background: var(--fire-info-container-bg);
		& h1{ color: var(--fire-info-container-label-color); }
		& p{ color: var(--fire-info-container-text-color); }
		& h2{ color: var(--fire-info-container-label-color); }
		& span{ color: var(--fire-info-container-text-color); }
	}

	&.grass{
		background: var(--grass-info-container-bg);
		& h1{ color: var(--grass-info-container-label-color); }
		& p{ color: var(--grass-info-container-text-color); }
		& h2{ color: var(--grass-info-container-label-color); }
		& span{ color: var(--grass-info-container-text-color); }
	}

	&.electric{
		background: var(--electric-info-container-bg);
		& h1{ color: var(--electric-info-container-label-color); }
		& p{ color: var(--electric-info-container-text-color); }
		& h2{ color: var(--electric-info-container-label-color); }
		& span{ color: var(--electric-info-container-text-color); }
	}

	&.fairy{
		background: var(--fairy-info-container-bg);
		& h1{ color: var(--fairy-info-container-label-color); }
		& p{ color: var(--fairy-info-container-text-color); }
		& h2{ color: var(--fairy-info-container-label-color); }
		& span{ color: var(--fairy-info-container-text-color); }
	}

	&.ghost{
		background: var(--ghost-info-container-bg);
		& h1{ color: var(--ghost-info-container-label-color); }
		& p{ color: var(--ghost-info-container-text-color); }
		& h2{ color: var(--ghost-info-container-label-color); }
		& span{ color: var(--ghost-info-container-text-color); }
	}

	&.poison{
		background: var(--ghost-info-container-bg);
		& h1{ color: var(--ghost-info-container-label-color); }
		& p{ color: var(--ghost-info-container-text-color); }
		& h2{ color: var(--ghost-info-container-label-color); }
		& span{ color: var(--ghost-info-container-text-color); }
	}

	&.rock{
		background: var(--rock-info-container-bg);
		& h1{ color: var(--rock-info-container-label-color); }
		& p{ color: var(--rock-info-container-text-color); }
		& h2{ color: var(--rock-info-container-label-color); }
		& span{ color: var(--rock-info-container-text-color); }
	}

	h1{
		text-transform: capitalize;
		font-size: 3rem;
		margin-bottom: 10px;
		text-shadow: 1.2px 1.2px black;
	}

	p{
		font-size: 2rem;
		margin-bottom: 30px;
	}

	& ul{

		font-size: 1.6rem;
		list-style-type: none;
		width: 100%;

		& li{

			margin-bottom: 20px;
			display: inline-block;
			width: 50%;

			& h2{
				font-weight: lighter;
				font-size: 1.6rem;
				text-shadow: .5px .5px black;
			}

			& span{
				white-space: pre;
				font-size: 2rem;
			}

		}

	}

	@media screen and (max-width: 950px) {
		width: 55%;
		margin: 0 auto;
	}

	@media screen and (max-width: 800px) { width: 70%; }

	@media screen and (max-width: 600px) {

    width: 90%;

    & h1{ font-size: 2rem; }

    & p{ font-size: 1.6rem; }

    & ul {

      font-size: 1.3rem;

      & li{

        & h2{ font-size: 1.3rem; }

        & span { font-size: 1.6rem; }

      }

    }

  }

`;

function PokemonInfo ( { pokemonName, pokemonDetails } ) {

	return (

		<InfoContainer className="water">
      <h1 tabIndex="0">{ pokemonName }</h1>
      <p tabIndex="0">{ pokemonDetails.formattedDescription }</p>
      <ul>
        <li>
          <h2 id="height-label">Height:</h2>
          <span tabIndex="0" aria-labelledby="height-label">{pokemonDetails.height}</span>
        </li>
        <li>
          <h2 id="weight-label">Weight:</h2>
          <span tabIndex="0" aria-labelledby="weight-label">{pokemonDetails.weight}</span>
        </li>
        <li>
          <h2 id="type-label">Type:</h2>
          <span tabIndex="0" aria-labelledby="type-label">{pokemonDetails.type}</span>
        </li>
        <li>
          <h2 id="attribute-label">Abilities:</h2>
          <span tabIndex="0" aria-labelledby="attribute-label">{pokemonDetails.abilities}</span>
        </li>
      </ul>
   </InfoContainer>

	);

}

export default PokemonInfo;
