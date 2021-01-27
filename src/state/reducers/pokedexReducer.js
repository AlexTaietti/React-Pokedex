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
        listScrollValue: action.scrollValue,
        pokemonCards: pokedexState.pokemonCards.map((pokemonCard) => {

          return {...pokemonCard, mountedOnce: true };

        })
      };

    default:
      throw new Error();

  }

};

export default pokedexReducer;
