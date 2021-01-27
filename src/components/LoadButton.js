import styled, { keyframes } from 'styled-components';
import { useVisibility } from '../state/hooks/useVisibility.js';

const pulse = keyframes`
  0%{ transform: translate(50%, 0); }
  30%{ transform: translate(50%, 10px); }
  60%{ transform: translate(50%, 0); }
`;

const Button = styled.button`

  font-family: 'Orbitron', sans-serif;
  text-shadow: 2px 2px black;
  display: block;
  text-align: center;
  margin: 40px auto 100px;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  position: relative;
  transition-property: opacity, transform;
  transition-duration: 0.5s;
  transition-delay: 0s;
  transform: translateY(0);
  opacity: 1;

  &.hidden{
    transition-property: opacity, transform;
    transition-duration: 1s;
    transition-delay: 0s;
    transform: translateY(-10px);
    opacity: 0;
  }


  &:after{
    content: "\\22CE";
    position: absolute;
    right: 50%;
    bottom: -35px;
    font-size: 2.5rem;
    transform: translate(50%, 0);
    text-shadow: 0px 2px black;
    animation-name: ${ pulse };
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  }

`;

const LoadButton = ({ handleClick }) => {

  const visible = useVisibility(true);

  return ( <Button className={ visible ? 'mounted' : 'hidden' } onClick={ handleClick }>Click to catch some more!</Button> );

}

export default LoadButton;
