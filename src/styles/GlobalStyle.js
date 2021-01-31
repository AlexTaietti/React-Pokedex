import { createGlobalStyle } from 'styled-components';

import OrbitronPath from "@fonts/Orbitron/static/Orbitron-Regular.ttf";

const GlobalStyle = createGlobalStyle`

  :root{

    @font-face {
        font-family: 'Orbitron';
        src: url(${OrbitronPath});
    }

    --content-max-width: 900px;

    //pokedex main colors
    --pokedex-bg: linear-gradient(15deg,rgba(255,45,157,1) 0%,rgb(203 31 13) 100%);
    --pokecard-bg: linear-gradient(0deg,rgb(28 81 172) 0%,rgba(71,191,165,1) 100%);

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

  button{
    background: none;
    border: none;
  }

`;

export default GlobalStyle;
