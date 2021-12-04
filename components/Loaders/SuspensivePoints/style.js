import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% { 
    transform: translateY(-0.8rem);
   }
  100% { 
    transform: translateY(0);
    }
`;

export const Conatiner = styled.div`
  width: fit-content;
  height: 1.4rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1rem);
  grid-gap: 0.5rem;
  justify-items: center;
  align-items: end;
  cursor: progress;
`;

export const Point = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--blue);
  animation: ${load} 0.5s ease-in-out
    ${(props) => props.delay && `${props.delay}s`} infinite alternate;
`;
