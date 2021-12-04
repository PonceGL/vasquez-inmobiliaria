import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: initial;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  color: var(--admin-text);
  background-color: var(--admin-white);

  position: relative;

  @media (min-width: 1000px) {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    transition: 0.3s ease-in-out all;
    ${(props) =>
      props.expand &&
      `
    grid-template-columns: 1fr 20fr 1fr;
    transition: 0.3s ease-in-out all;
  `}
  }
`;

export const ButtonsMovileContainer = styled.div`
  display: none;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0.5rem 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
    z-index: 5;
  }
`;

export const Line = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: var(--admin-text);
  border-radius: 0.1rem;
  transition: 0.3s ease-in-out all;
`;

export const ButtonStyled = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.isOpen &&
    `
    :after {
        content: "\\2715";
        font-size: 2.5rem;
        color: var(--admin-text);
        text-align: center;
        transform: translateY(0);
    }
  `}
  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

export const MainStyled = styled.main`
  width: 100%;
  height: 98vh;
  grid-column: 2 / span 1;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  grid-gap: 4rem;
  justify-items: center;
  align-items: center;
  background-color: var(--admin-bg);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow) inset;
  transition: ease-in-out 0.3s all;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    height: fit-content;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0;
    box-shadow: none;
  }
`;
