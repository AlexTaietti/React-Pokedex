import Card from '@components/Card';
import { useFadeIn } from '@hooks/useFadeIn';

const ListCard = ({ pokedexDispatch, mountedOnce, pokemon }) => {

  const fadeIn = useFadeIn(mountedOnce);

  const handleClick = () => {

    if(pokedexDispatch) pokedexDispatch({ type: 'SET_SCROLL_VALUE', scrollValue: window.scrollY });

    console.info(`You chose ${pokemon.name.replace( /\b\w/g, l => l.toUpperCase() )}!`);

  };

  return <Card pokemon={ pokemon } onClick={ handleClick } className={ fadeIn ? "hidden" : "mounted" }/>;

};

export default ListCard;
