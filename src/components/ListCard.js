import { sessionStorageReducer } from '@utils';
import { Card } from '@components';

const ListCard = ({ pokemon }) => {

  //on click cache the current scroll position in sessionStorage
  const handleClick = () => {

    sessionStorageReducer( 'SET', { key: 'pokeListScrollValue', data: window.scrollY } );

    console.info(`You chose ${pokemon.name.replace( /\b\w/g, l => l.toUpperCase() )}!`);

  };

  return <Card className="list-card" pokemon={ pokemon } onClick={ handleClick }/>;

};

export default ListCard;
