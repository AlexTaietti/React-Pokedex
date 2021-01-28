import styled, { keyframes } from 'styled-components';
import { useVisibility } from '../state/hooks/useVisibility.js';

const pulse = keyframes`
  0%{ transform: translate(50%, 0); }
  30%{ transform: translate(50%, 10px); }
  60%{ transform: translate(50%, 0); }
`;

const Button = styled.button`

  color: white;
  cursor: pointer;
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin: 40px auto 100px;
  opacity: 1;
  position: relative;
  text-align: center;
  text-shadow: 2px 2px black;
  transform: translateY(0);
  transition-delay: 0s;
  transition-duration: 0.5s;
  transition-property: opacity, transform;

  &.hidden{
    opacity: 0;
    transform: translateY(-10px);
    transition-delay: 0s;
    transition-duration: 1s;
    transition-property: opacity, transform;
  }


  &:after{
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-name: ${ pulse };
    animation-timing-function: ease-out;
    bottom: -35px;
    content: "\\22CE";
    font-size: 2.5rem;
    position: absolute;
    right: 50%;
    text-shadow: 0px 2px black;
    transform: translate(50%, 0);
  }

`;

const LoadButton = ({ handleClick }) => {

  const visible = useVisibility(true);

  return ( <Button className={ visible ? 'mounted' : 'hidden' } onClick={ handleClick }>Click to catch some more!</Button> );

}

export default LoadButton;
