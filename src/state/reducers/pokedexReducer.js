const pokeDisplayReducer = (pokedexState, action) => {

  switch (action.type) {

    case 'SET_POKEMON_REFERENCE':
      return {
        ...pokedexState,
        pokeReference: action.reference
      };

    case 'SET_POKEMON_DATA':
      return {
        ...pokedexState,
        pokemonData: action.data
      };

    case 'ADD_MULTI_POKEMON_DATA':
      return {
        ...pokedexState,
        pokemonData: { ...pokedexState.pokemonData, ...action.data }
      };

    case 'ADD_POKEMON_DATA':
      return {
        ...pokedexState,
        pokemonData: { ...pokedexState.pokemonData, [action.pokemon.data.name]: {...action.pokemon} }
      };

    case 'FINISH_BOOTING':
      return {
        ...pokedexState,
        booting: false
      };

    case 'START_LOADING_POKEMONS':
      return {
        ...pokedexState,
        loadingMorePokemons: true
      };

    case 'ADD_POKEMONS_TO_POKELIST':
      return {
        ...pokedexState,
        pokemonList: [...pokedexState.pokemonList, ...action.pokemons],
        listIndex: action.index,
        loadingMorePokemons: false
      };

    case 'LOADED_ALL':
      return {
        ...pokedexState,
        loadedAllPokemons: true
      };

    default:
      throw new Error();

  }

};

export default pokeDisplayReducer;
