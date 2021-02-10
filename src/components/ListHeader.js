import PokemonLogo from '@images/pokemon.png';

const ListHeader = () => {

  return(
    <header tabIndex="0" role="banner" aria-label="pokemon logo">
      <img className="pokemon-logo" src={PokemonLogo} alt="Pokemon"/>
    </header>
  )

}

export default ListHeader;
