import styled, { keyframes } from "styled-components";

const load = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70% {
    transform: translateX(2rem);
  }

  20%,
  40%,
  60% {
    transform: translateX(0.5rem);
  }

  80% {
    transform: translateX(0.8rem);
  }

  90% {
    transform: translateX(-0.8rem);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-image: none;
  ${(props) =>
    props.deploy
      ? `
    height: 100vh;
    background-color: var(--dark-blue);
    color: var(--white);
    flex-direction: column;
    justify-content: space-around;
  `
      : `
    background-color: #ff5151;
    justify-content: center;
  `}
  transition: 0.3s ease-in-out all;

  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    ${(props) =>
      props.deploy
        ? `
    height: 100vh;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
  `
        : `
        position: initial;
    bottom: 2rem;
    left: 2rem;
  `}
  }
`;

export const ButtonFinancing = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--white);
  ${(props) =>
    props.deploy &&
    `
    display: none;
    `}
`;

export const FinancingArrow = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 7rem;
  z-index: 999;
  transition: 0.3s ease-in-out all;
  &:after {
    content: "\\27A1";
    font-size: 2rem;
    color: var(--white);
    text-align: center;
    transform: rotate(180deg);
  }
  animation: ${load} 5s ease-in-out 2s infinite normal none;
  ${(props) =>
    props.deploy &&
    `
    display: none;
    `}
  @media (min-width: 1000px) {
    /* display: none; */
    right: 40%;
  }
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 999;
  transition: 0.3s ease-in-out all;
  &:after {
    content: "\\2715";
    font-size: 3rem;
    color: var(--white);
    text-align: center;
    transform: rotate(180deg);
  }
  ${(props) =>
    props.deploy &&
    `
    display: flex;
        `}
`;

export const First = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2;
  h4 {
    font-size: 2rem;
  }
`;

export const List = styled.ul`
  width: 90%;
  margin-top: 2rem;
`;

export const ListItem = styled.li`
  margin-top: 1rem;
  list-style: disc;
  span {
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

export const Last = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  /* bottom: 3rem; */
  z-index: 2;

  p {
    font-size: 1rem;
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(https://res.cloudinary.com/civsa/image/upload/v1638203929/brand/g4iizeszdlxuchc2fxrc.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.15;
`;
