const pokedexReducer = (pokedexState, action) => {

  switch (action.type) {

    case 'ADD_POKEMONS':
      return {
        ...pokedexState,
        lastID: action.lastID,
        pokemonCards: [ ...pokedexState.pokemonCards, ...action.pokemonCards ]
      };

    case 'UPDATE_ITEMS_MOUNT':
      return {
        ...pokedexState,
        pokemonCards: pokedexState.pokemonCards.map((pokemonCard) => {

          return {...pokemonCard, mountedOnce: true };

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
