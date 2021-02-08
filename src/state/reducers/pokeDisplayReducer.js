const pokeDisplayReducer = (pokeDisplayState, action) => {

  switch (action.type) {

    case 'CHOOSE_POKEMON':
      return {
        pokemon: action.pokemon,
        theme: action.theme,
        chartOptions: action.chartOptions,
        evolutionChain: action.evolutionChain
      };

    case 'RESET_SELECTION':
      return {
        pokemon: undefined,
        theme: undefined,
        chartOptions: undefined,
        evolutionChain: []
      }

    default:
      throw new Error();

  }

};

export default pokeDisplayReducer;
