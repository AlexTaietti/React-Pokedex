const pokedexReducer = (pokedexState, action) => {

  switch (action.type) {

    case 'ADD_POKEMONS':
      return {
        ...pokedexState,
        lastID: action.lastID,
        pokemonCardsData: [ ...pokedexState.pokemonCardsData, ...action.pokemonCardsData ]
      };

    case 'UPDATE_ITEMS_MOUNT':
      return {
        ...pokedexState,
        pokemonCardsData: pokedexState.pokemonCardsData.map((pokemonCardData) => {

          return {...pokemonCardData, mountedOnce: true };

        })
      };

    case 'SET_SCROLL_VALUE':
      return {
        ...pokedexState,
        listScrollValue: action.scrollValue,
      }

    default:
      throw new Error();

  }

};

export default pokedexReducer;
