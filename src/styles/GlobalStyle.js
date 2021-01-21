import { createGlobalStyle } from 'styled-components';

import OrbitronPath from "../fonts/Orbitron/static/Orbitron-Regular.ttf";

const GlobalStyle = createGlobalStyle`

  :root{

    @font-face {
        font-family: 'Orbitron';
        src: url(${OrbitronPath});
    }

    --content-max-width: 900px;

    //pokedex main colors
    --pokedex-bg: linear-gradient(15deg, rgba(255,45,157,1) 0%, rgba(255,23,0,1) 100%);
    --pokecard-bg: linear-gradient(0deg, rgba(0,93,255,1) 0%, rgba(71,191,165,1) 100%);

    //water info color palette
    --water-info-container-bg: #04b5b5;
    --water-info-container-text-color: #090a62;
    --water-info-container-label-color: white;

  }

  html { font-size: 10px; }

  *, *::before, *::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html{
    min-height: 100%;
    position: relative;
    display: block;
  }

  a{
    text-decoration: none;
    color: black;
  }

`;

export default GlobalStyle;
