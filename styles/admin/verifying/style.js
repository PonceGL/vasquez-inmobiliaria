import styled, { keyframes } from "styled-components";

const grow = keyframes`
  from {transform: scale(0,0); opacity: 0;}
  to {transform: scale(1,1); opacity: 1;}
`;

const move = keyframes`
  from {transform: translateX(0px)}
  to {transform: translateX(45px)}
`;

export const MainStyled = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 2rem auto;
    font-weight: 400;
    color: var(--admin-strong);
  }
`;

export const Box = styled.div`
  height: 1.5rem;
  width: 10.5rem;
  display: flex;
  position: relative;
`;

export const Circle = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--admin-focus);
  animation: ${move} 500ms linear 0ms infinite;
  margin-right: 3rem;
  &:first-child {
    position: absolute;
    top: 0;
    left: 0;
    animation: ${grow} 500ms linear 0ms infinite;
  }

  &:last-child {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0;
    animation: ${grow} 500ms linear 0s infinite reverse;
  }
`;
