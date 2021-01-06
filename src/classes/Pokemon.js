import { fetchData } from '../utils/utils.js';

export default class Pokemon {

  constructor ({ id, name, sprite, url }) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.url = url;
  }

  async fetchDetails () {

    const pokemonData = await fetchData(this.url);

    let { abilities, weight, height, stats, types, sprites: { other: { dream_world: { front_default: image}}}, species: { url: speciesURL }  } = pokemonData;

    const pokemonSpecies = await fetchData(speciesURL);

    const evolutionData = await fetchData(pokemonSpecies.evolution_chain.url);

    //get pokemon description
    const description = ( pokemonSpecies.flavor_text_entries[1].flavor_text.charAt(0).toUpperCase() + pokemonSpecies.flavor_text_entries[1].flavor_text.slice(1).toLowerCase() ).split('\n').join(' ');

    //get physical properties of the pokemon
    height = `${height/ 10} m`;

    weight = `${weight/ 10} kg`;

    //extract abilities
    const ability = abilities.map((ability, index) => {

      return abilities[index].ability.name;

    }).join('\n');

    //extract stats
    const statsObject = stats.reduce((statsData, currentStatData) => {

      let statsName = currentStatData.stat.name === "special-attack" ? "special (S)" : currentStatData.stat.name === "special-defense" ? "defense(S)" : currentStatData.stat.name;

      statsData[statsName] = currentStatData.base_stat;

      return statsData;

    }, {});

    //extract type string
    const typeArray = types.map( currentType => currentType.type.name );

    const type = typeArray.join('\n');


    //extract evolution chain
    const evolutionsArray = this.extractEvolutionChain(evolutionData.chain);

    for(let i = 0; i < evolutionsArray.length; i++){

      const pokemon = await Pokemon.fetchPokemonBasicInfo(evolutionsArray[i]);

      evolutionsArray[i] = pokemon;

    }

    return { evolutionsArray, statsObject, ability, weight, height, image, description, type };

  }

  setDetails (details) { this.details = details; }

  extractEvolutionChain (chainObject, evolutionChain = []) {

      evolutionChain.push(chainObject.species.name);

      if (chainObject.evolves_to.length > 0) { this.extractEvolutionChain(chainObject.evolves_to[0], evolutionChain); }

      return evolutionChain;

    }

  static async fetchPokemonBasicInfo (pokemonName) {

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const pokemonData = await fetchData(url);

    const pokemon = new Pokemon({
      id: pokemonData.id,
      name: pokemonData.name,
      sprite: {
        front: pokemonData.sprites.front_default,
        back: pokemonData.sprites.back_default
      },
      url: url
    });

    return pokemon;

  }

  static async fetchFirstGenPokemons () {

    const numberOfFirstGenPokemons = 151;
    const pokemons = [];

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfFirstGenPokemons}`);
    const data = await response.json();

    for(let i=0, pokemonData = null, pokemon = null, url=null; i < numberOfFirstGenPokemons; i++){
      url = data.results[i].url;
      pokemonData = await fetchData(url);
      pokemon = new Pokemon({
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: {
          front: pokemonData.sprites.front_default,
          back: pokemonData.sprites.back_default
        },
        url: url
      });

      pokemons.push(pokemon);

    }

    return pokemons;

  }

}
