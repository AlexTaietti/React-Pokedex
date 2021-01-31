import Chart from '@components/Chart';
import EvolutionChain from '@components/EvolutionChain';
import { Link, useParams } from 'react-router-dom';
import Loader from '@components/Loader';
import pokeDisplayReducer from '@reducers/PokeDisplayReducer';
import Pokemon from '@classes/Pokemon.js';
import PokemonInfo from '@components/PokemonInfo';
import styled, { ThemeProvider } from 'styled-components';
import themes from '@styles/Themes';
import { useEffect, useReducer } from 'react';

const PokemonDisplay = () => {

  const { pokemonName } = useParams();

  const [ pokeState, pokeDispatch ] = useReducer( pokeDisplayReducer, {
    pokemon: undefined,
    theme: undefined,
    chartOptions: undefined
  });

  const resetSelection = () => pokeDispatch({ type: 'RESET_SELECTION' });

  useEffect(() => {

    const choosePokemon = async (pokemonName) => {

      const pokemon = await Pokemon.fetchPokemonBasicInfo(pokemonName);
      const pokemonDetails = await pokemon.fetchDetails();
      const detailedPokemon = { ...pokemon, details: { ...pokemonDetails } };

      const pokemonType = pokemonDetails.type.split('\n')[0];
      const pokemonTheme = themes[pokemonType];

      const pokemonChartOptions = {

        maxValue: 200,

        increments: 10,

        animation:{
          animated: true,
          duration: 2000,
          easingFunction: 'easeOutElastic'
        },

        style: {

          label: { font: `${ 12.5 * window.devicePixelRatio }px Orbitron` },

          chart: {
            background: true,
            fill: pokemonTheme.infoSolid,
            stroke: pokemonTheme.chartStroke
          },

          polygon: {
            contour: true,
            fill: pokemonTheme.polygonFill,
            stroke: pokemonTheme.polygonStroke,
            lineWidth: 2
          }

        }

      };

      pokeDispatch( { type: 'CHOOSE_POKEMON', pokemon: detailedPokemon, theme: pokemonTheme, chartOptions: pokemonChartOptions });

    };

    choosePokemon(pokemonName);

  }, [pokemonName]);

  return (

      pokeState.pokemon && pokeState.theme ?

        <ThemeProvider theme={ pokeState.theme }>

          <DisplayContainer>

            <main tabIndex="0" className="display-content" aria-label={ `reasons why ${pokeState.pokemon.name} is awesome!` }>

              <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${pokeState.pokemon.name}'s artwork` }>
                <img src={ pokeState.pokemon.details.image } alt={ pokeState.pokemon.name }/>
              </figure>

              <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${pokeState.pokemon.name}` }>
                <PokemonInfo pokemonDetails={ pokeState.pokemon.details } pokemonName={ pokeState.pokemon.name }/>
              </section>

              <div tabIndex="0" className="chart-container" aria-label={ `${pokeState.pokemon.name}'s stats` }>
                <Chart options={ pokeState.chartOptions } data={ pokeState.pokemon.details.statsObject } />
              </div>

              <section tabIndex="0" className="pokemon-evolution" aria-label={ `${pokeState.pokemon.name}'s evolution chain` }>
                <EvolutionChain pokemonName={ pokeState.pokemon.name } pokemonEvolution={ pokeState.pokemon.details.evolutionsArray }/>
              </section>

              <Link onClick={ resetSelection } className="home-link" to="/">&larr;back</Link>

            </main>

          </DisplayContainer>

        </ThemeProvider> : <Loader/>

  );

};

const DisplayContainer = styled.div`

  margin: 0 auto;
  max-width: var(--content-max-width);
  padding: 50px 0;
  position: relative;

  .display-content{
    align-items: center;
    column-gap: 4%;
    display: grid;
    font-family: 'Orbitron', sans-serif;
    grid-template-areas:
    "artwork details"
    "chart chart"
    "evolution-chain evolution-chain";
    grid-template-columns: 48% 48%;
    grid-template-rows: 1fr 600px auto;
  }

  .pokemon-details{ grid-area: details; }

  .pokemon-artwork{

    grid-area: artwork;
    padding: 10px;

    & > img{
      display: block;
      filter: saturate(2.5);
      max-height: 400px;
    }

  }

  .chart-container{
    align-self: stretch;
    grid-area: chart;
    justify-self: stretch;
  }

  .pokemon-evolution{ grid-area: evolution-chain; }

  .home-link{
    font-size: 2rem;
    left: 0;
    position: absolute;
    top: 50px;
    z-index: 1;
  }

  @media screen and (max-width: 950px) {

    .display-content{
      align-items: center;
      grid-template-areas:
      "artwork"
      "details"
      "chart"
      "evolution-chain";
      grid-template-columns: 100%;
      grid-template-rows: auto auto 600px auto;
      row-gap: 40px;
    }

    .pokemon-artwork > img { margin: 0 auto; }

    .home-link{ top: 15px; }

  }

  @media screen and (max-width: 600px) {

    padding: 30px 0;

    .pokemon-artwork > img { width: 300px; }

    .display-content{
      grid-template-rows: auto auto 450px auto;
      row-gap: 30px;
    }

  }

  @media screen and (max-width: 400px) {

    padding: 15px 0;

    .display-content{ grid-template-rows: auto auto 370px auto; }

  }


`;

export default PokemonDisplay;
