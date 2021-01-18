import styled from 'styled-components';

const LoaderContainer = styled.div`

  @keyframes bounce {
    10% {  transform: translateY(-35px); }
    15%{  transform: translateY(0px); }
    25%{  transform: translateY(-15px); }
    30%{  transform: translateY(0px); }
    50%{  transform: rotateZ(10deg); }
    60%{  transform: rotateZ(-10deg); }
    70%{  transform: rotateZ(10deg); }
    100%{ transform: rotateZ(0deg); }
  }

  @keyframes shadow {
    10% {  transform: scaleX(0.6); }
    15%{  transform: scaleX(1); }
    25%{  transform: scaleX(0.8); }
    30%{  transform: scaleX(1); }
    50%{  transform: translateX(5px); }
    60%{  transform: translateX(-5px); }
    70%{  transform: translateX(5px); }
    100%{ transform: translateX(-5px); }
  }

  position: fixed;
  z-index: 12121996;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--pokedex-bg);

  .pokeball-container{

    position: relative;
    width: 150px;
    height: 150px;

    &::after{
      content: '';
      position: absolute;
      z-index: -1;
      bottom: -5px;
      left: 30px;
      width: 90px;
      height: 10px;
      background-color: rgb(50, 10, 10);
      border-radius: 50%;
      animation-name: shadow;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    .pokeball{

      position: relative;
      width: 100%;
      height: 100%;
      transform-origin: bottom center;
      animation-name: bounce;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;

      &::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border-width: 3px;
        border-color: black;
        border-style: solid;
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,254,254,1) 49.5%, rgba(0,0,0,1) 49.5%, rgba(0,0,0,1) 51.5%, rgba(244,0,31,1) 51.5%, rgba(255,0,0,1) 100%);
      }

      &::before{
        content: '';
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        z-index: 1;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid black;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%);
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
