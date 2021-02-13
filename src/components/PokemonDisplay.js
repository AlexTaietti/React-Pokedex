import { Chart, EvolutionChain, Loader, PokemonInfo } from '@components';
import { Link, useParams } from 'react-router-dom';
import { pokeDisplayReducer } from '@reducers';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from '@styles';
import { useEffect, useReducer } from 'react';

const PokemonDisplay = ({ catchPokemons, getEnhancedPokemon }) => {


  //extract the name of the selected pokemon from the URL
  const { pokemonName } = useParams();


  //set-up the state of the display
  const [ pokeState, pokeDispatch ] = useReducer( pokeDisplayReducer, {
    pokemon: undefined,
    theme: undefined,
    chartOptions: undefined,
    evolutionChain: []
  });


  //destructure state for easier access throughout the component
  const { pokemon, theme, chartOptions, evolutionChain } = pokeState;


  //whenever a new pokemon is choosen set the display's state accordingly
  useEffect(() => {

    const choosePokemon = async (pokemonName) => {

      const detailedPokemon = await getEnhancedPokemon(pokemonName);

      const { type, evolutionsArray } = detailedPokemon.details;

      const pokemonType = type.split('\n')[0];
      const pokemonTheme = themes[pokemonType];

      const evolution = await catchPokemons(evolutionsArray);

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

      pokeDispatch( { type: 'CHOOSE_POKEMON', pokemon: detailedPokemon, evolutionChain: evolution, theme: pokemonTheme, chartOptions: pokemonChartOptions });

    };

    //catch that pokemon!
    choosePokemon(pokemonName);

  }, [pokemonName]);


  return (

      pokemon ?

        <ThemeProvider theme={ theme }>

          <DisplayContainer>

            <main tabIndex="0" className="display-content" aria-label={ `reasons why ${pokemon.data.name} is awesome!` }>

              <figure tabIndex="0" className="pokemon-artwork" aria-label={ `${pokemon.data.name}'s artwork` }>
                <img src={ pokemon.details.image } alt={ pokemon.data.name }/>
              </figure>

              <section tabIndex="0" className="pokemon-details" aria-label={ `general info about ${pokemon.data.name}` }>
                <PokemonInfo pokemonDetails={ pokemon.details } pokemonName={ pokemon.data.name }/>
              </section>

              <div tabIndex="0" className="chart-container" aria-label={ `${pokemon.data.name}'s stats` }>
                <Chart options={ chartOptions } data={ pokemon.details.statsObject } />
              </div>

              <section tabIndex="0" className="pokemon-evolution" aria-label={ `${pokemon.data.name}'s evolution chain` }>
                <EvolutionChain pokemonName={ pokemon.data.name } pokemonEvolution={ evolutionChain }/>
              </section>

              <Link className="home-link" to="/">&larr;back</Link>

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
