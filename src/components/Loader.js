import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  10%{  transform: translateY(-35px); }
  15%{  transform: translateY(0px); }
  25%{  transform: translateY(-15px); }
  30%{  transform: translateY(0px); }
  50%{  transform: rotateZ(10deg); }
  60%{  transform: rotateZ(-10deg); }
  70%{  transform: rotateZ(10deg); }
  100%{ transform: rotateZ(0deg); }
`;

const shadow = keyframes`
  10%{  transform: scaleX(0.6); }
  15%{  transform: scaleX(1); }
  25%{  transform: scaleX(0.8); }
  30%{  transform: scaleX(1); }
  50%{  transform: translateX(5px); }
  60%{  transform: translateX(-5px); }
  70%{  transform: translateX(5px); }
  100%{ transform: translateX(-5px); }
`;

const LoaderContainer = styled.div`

  align-items: center;
  background: var(--pokedex-bg);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 12121996;

  .pokeball-container{

    height: 150px;
    position: relative;
    width: 150px;

    &::after{
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: ${ shadow };
      animation-timing-function: ease-in-out;
      background-color: rgb(50, 10, 10);
      border-radius: 50%;
      bottom: -5px;
      content: '';
      height: 10px;
      left: 30px;
      position: absolute;
      width: 90px;
      z-index: -1;
    }

    .pokeball{

      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: ${ bounce };
      animation-timing-function: ease-in-out;
      height: 100%;
      position: relative;
      transform-origin: bottom center;
      width: 100%;

      &::after{
        border-color: black;
        border-radius: 50%;
        border-style: solid;
        border-width: 3px;
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,254,254,1) 49.5%, rgba(0,0,0,1) 49.5%, rgba(0,0,0,1) 51.5%, rgba(244,0,31,1) 51.5%, rgba(255,0,0,1) 100%);
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
      }

      &::before{
        border-radius: 50%;
        border: 3px solid black;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%);
        content: '';
        height: 30px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        z-index: 1;
      }

    }

  }


`;

const Loader = () => {
  return (
    <LoaderContainer tabIndex="0" role="progressbar" aria-label="loading pokedex">
      <div className="pokeball-container">
        <div className="pokeball"></div>
      </div>
    </LoaderContainer>
  )
}

export default Loader;
