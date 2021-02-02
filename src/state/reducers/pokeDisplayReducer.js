const pokeDisplayReducer = (pokeDisplayState, action) => {

  switch (action.type) {

    case 'CHOOSE_POKEMON':
      return {
        pokemon: action.pokemon,
        theme: action.theme,
        chartOptions: action.chartOptions
      };

    case 'RESET_SELECTION':
      return {
        pokemon: undefined,
        theme: undefined,
        chartOptions: undefined
      }

    default:
      throw new Error();

  }

};

export default pokeDisplayReducer;
