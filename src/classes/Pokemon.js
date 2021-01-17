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

    let { abilities, weight, height, stats, types, sprites: { other: { 'official-artwork': { front_default: image}}}, species: { url: speciesURL }  } = pokemonData;

    const pokemonSpecies = await fetchData(speciesURL);

    const evolutionData = await fetchData(pokemonSpecies.evolution_chain.url);

    //get pokemon description
    const description = pokemonSpecies.flavor_text_entries.find(text => text.language.name === 'en').flavor_text;

    const formattedDescription = description.replace(/\n|\u000c/g, ' ');

    //get physical properties of the pokemon
    height = `${height/ 10} m`;

    weight = `${weight/ 10} kg`;

    //extract abilities
    abilities = abilities.map((ability, index) => {

      return abilities[index].ability.name;

    }).join('\n');

    //extract stats
    const statsObject = stats.reduce((statsData, currentStatData) => {

      let statsName = currentStatData.stat.name === "special-attack" ? "atk(S)" : currentStatData.stat.name === "special-defense" ? "def(S)" : currentStatData.stat.name;

      statsData[statsName] = currentStatData.base_stat;

      return statsData;

    }, {});

    //extract type string
    const typeArray = types.map( currentType => currentType.type.name );

    const type = typeArray.join('\n');


    //extract evolution chain
    const evolutionsArray = Pokemon.extractEvolutionChain(evolutionData.chain);

    for(let i = 0; i < evolutionsArray.length; i++){

      const pokemon = await Pokemon.fetchPokemonBasicInfo(evolutionsArray[i]);

      evolutionsArray[i] = pokemon;

    }

    return { evolutionsArray, statsObject, abilities, weight, height, image, formattedDescription, type };

  }

  static extractEvolutionChain (chainObject, evolutionChain = []) {

    evolutionChain.push(chainObject.species.name);

    if (chainObject.evolves_to.length > 0) { Pokemon.extractEvolutionChain(chainObject.evolves_to[0], evolutionChain); }

    return evolutionChain;

  }

  static async fetchPokemonBasicInfo (pokemonName) {

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const { id, name, sprites : { front_default, back_default }} = await fetchData(url);

    const pokemon = new Pokemon({
      id: id,
      name: name,
      sprite: {
        front: front_default,
        back: back_default
      },
      url: url
    });

    return pokemon;

  }

  static async fetchBatchPokemons (offset = 0, limit = 20) {

    const pokemons = [];

    //catch 'em all!
    const data = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    for(let i=0; i < data.results.length; i++){

      const url = data.results[i].url;

      const pokemonData = await fetchData(url);

      if(!pokemonData) continue;

      const { id, name, sprites : { front_default, back_default }} = pokemonData;

      const pokemon = new Pokemon({
        id: id,
        name: name,
        sprite: {
          front: front_default,
          back: back_default
        },
        url: url
      });

      pokemons.push(pokemon);

    }

    //return pokemons array
    return pokemons;


  }

}
