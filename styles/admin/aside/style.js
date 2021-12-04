import styled from "styled-components";

export const AsideStyled = styled.aside`
  width: 100%;
  height: 100vh;
  padding: 5rem 3rem;
  background-color: var(--admin-white);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  position: absolute;
  top: 0;
  right: -100%;
  z-index: 2;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.open &&
    `
    right: 0;
  `}
  @media (min-width: 1000px) {
    grid-column: 3 / span 1;
    height: 100%;
    padding-right: 3rem;
    /* padding-right: 0;
    padding-left: 3rem; */
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    justify-items: center;
    align-items: center;
    transition: 0.3s ease-in-out all;
    position: initial;
    ${(props) =>
      props.expand &&
      `
    padding: 0;
  `}
  }
`;

export const TopButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.expand &&
    `
    align-items: center;
  `}

  @media (max-width: 1000px) {
    height: initial;
    margin-top: 2rem;
  }
`;

export const ButtonChangeTheme = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--admin-text);
  transform: translateY(-2rem);
  transition: 0.3s ease-in-out all;
  &:hover {
    transform: translateY(-2rem) rotate(25deg);
  }
  @media (max-width: 1000px) {
    transform: translateY(0);
    &:hover {
      transform: translateY(0) rotate(25deg);
    }
  }
`;

export const ChangeWidth = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--admin-text);
  transform: translateY(-2rem);
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-main);
  }
`;

export const UserContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1000px) {
    width: 90%;
  }
`;

export const ProfileLink = styled.a`
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--admin-text);
  transition: 0.3s ease-in-out all;
  span {
    font-size: 1rem;
    opacity: 0;
    transform: translateX(-1rem);
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    color: var(--admin-main);
    span {
      transform: translateX(1rem);
      opacity: 0.5;
    }
  }
  @media (max-width: 1000px) {
    font-size: 1.6rem;
  }
`;

export const ButtonExit = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--admin-bg);
  color: var(--admin-text);
  border: none;
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: ease-in-out 0.3s all;
  &:hover {
    background-color: var(--admin-main);
    color: var(--admin-bg);
  }
`;
