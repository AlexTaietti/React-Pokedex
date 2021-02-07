import { fetchData } from './general';

const fetchPokemonDetails = async (pokemonName) => {

  const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

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

    let statsName;

    switch (currentStatData.stat.name){
      case "special-attack":
        statsName = "ATK(S)";
        break;
      case "special-defense":
        statsName = "DEF(S)";
        break;
      case "attack":
        statsName = "ATK";
        break;
      case "defense":
        statsName = "DEF";
        break;
      case "hp":
        statsName = "HP";
        break;
      case "speed":
        statsName = "SPD";
        break;
      default:
        statsName = currentStatData.stat.name;
    }

    statsData[statsName] = currentStatData.base_stat;

    return statsData;

  }, {});

  //extract type string
  const typeArray = types.map( currentType => currentType.type.name );

  const type = typeArray.join('\n');


  //extract evolution chain
  const evolutionsArray = extractEvolutionChain(evolutionData.chain);

  for(let i = 0; i < evolutionsArray.length; i++){

    const pokemon = await fetchPokemonByName(evolutionsArray[i]);

    evolutionsArray[i] = pokemon;

  }

  return { evolutionsArray, statsObject, abilities, weight, height, image, formattedDescription, type };

};

const extractEvolutionChain = (chainObject, evolutionChain = []) => {

  evolutionChain.push(chainObject.species.name);

  if (chainObject.evolves_to.length > 0) { extractEvolutionChain(chainObject.evolves_to[0], evolutionChain); }

  return evolutionChain;

};

const catchPokemon = async (url) => {

  const pokemonData = await fetchData(url);

  if(!pokemonData) { return; }

  const { id, name, sprites : { front_default, back_default } } = pokemonData;

  const pokemonInfo = {
    id: id,
    data:{
      name: name,
      sprite: {
        front: front_default,
        back: back_default
      }
    }
  };

  return pokemonInfo;

};

const fetchPokemonByName = async (pokemonName) => {

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const pokemon = await catchPokemon(url);

  return pokemon;

};

export { fetchPokemonByName, fetchPokemonDetails };
