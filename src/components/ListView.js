import { Loader } from '@components';
import { sessionStorageReducer } from '@utils';
import styled from 'styled-components';
import { useLayoutEffect, useEffect } from 'react';

const ListView = ({ children, pokemons, catchMorePokemons }) => {


  //if the pokemons list is empty get the first batch of pokedudes
  useEffect(() => {

    if ( !pokemons.length ) catchMorePokemons();

  }, []);


  //if a scroll value is found in cache set the scroll accordingly
  useLayoutEffect(() => {

    const scrollValue = sessionStorageReducer('GET', 'pokeListScrollValue');

    if(scrollValue) window.scrollTo(0, scrollValue);

  }, []);


  return pokemons.length ? <ListViewWrapper>{ children }</ListViewWrapper> : <Loader/>;

};

const ListViewWrapper = styled.div`

  margin: 0 auto;
  max-width: var(--content-max-width);
  padding-top: 40px;

  & > header{

    display: block;
    margin: 0 auto 60px;
    max-width: 60%;

    & > img{ width: 100%; }

  }

  @media screen and (max-width: 700px){

    & > header { max-width: 80%; }

  }

  @media screen and (max-width: 500px){

    & > header { max-width: 100%; }

  }

`;

export default ListView;
