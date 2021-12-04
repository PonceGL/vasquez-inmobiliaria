import styled from "styled-components";

export const Container = styled.li`
  width: 100%;
  height: 100%;
  background-color: var(--admin-white);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  transition: ease-in-out 0.3s all;
  p {
    margin: 1rem 0;
    font-size: 1.5rem;
    color: var(--admin-strong);
  }
  span {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--admin-strong);
  }

  @media (max-width: 1000px) {
    min-height: 22rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const LinkHouse = styled.a`
  font-size: 2rem;
  font-weight: 700;
  color: var(--admin-strong);
  transition: ease-in-out 0.3s all;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  border-radius: 0 0 1rem 1rem;

  position: absolute;
  bottom: 0;
  left: 0;
`;

export const ButtonActions = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-strong);
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: ease-in-out 0.3s all;
  &:hover {
    opacity: 1;
    background-color: var(--admin-white);
    color: var(--admin-main);
  }
`;

export const LinkActions = styled.a`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-strong);
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: ease-in-out 0.3s all;
  &:hover {
    opacity: 1;
    background-color: var(--admin-white);
    color: var(--admin-main);
  }
`;

export const TextModal = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--admin-text);
  span {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--admin-main);
  }
`;
