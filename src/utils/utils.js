export const fetchData = async (url) => {

  try{

    const response = await fetch(url);

    if(!response.ok){ throw new Error(response.status); }

    const data = await response.json();

    return data;

  } catch(e) { console.error(e); }

}

export const isEmpty = (object) => {

  for(let prop in object){

    if(object.hasOwnProperty(prop)) return false;

  }

  return true;

}

export const fetchPokemonDetails = async (id) => {

  const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);

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

export const extractEvolutionChain = (chainObject, evolutionChain = []) => {

  evolutionChain.push(chainObject.species.name);

  if (chainObject.evolves_to.length > 0) { extractEvolutionChain(chainObject.evolves_to[0], evolutionChain); }

  return evolutionChain;

};

export const catchPokemon = async (url) => {

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

export const fetchPokemonByName = async (pokemonName) => {

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const pokemon = await catchPokemon(url);

  return pokemon;

};

export const catchSomePokemons = async (offset = 0, limit = 16) => {

  const pokemonInfoObjects = [];

  //catch 'em all!
  const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

  for(let i=0; i < pokemonData.results.length; i++){

    const url = pokemonData.results[i].url;

    const pokemonInfo = await catchPokemon(url);

    if(!pokemonInfo) {

      const splitURL = url.split('/');
      const pokemonID = splitURL[splitURL.length - 1];

      console.warn(`Poké ID: ${ pokemonID } => pokemon has been skipped, the data retrieved cannot be used by this app.`);

      continue;

    };

    pokemonInfoObjects.push(pokemonInfo);

  }

  //return pokemons array
  return pokemonInfoObjects;


};
