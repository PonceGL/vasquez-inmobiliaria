import styled from "styled-components";

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

export const ImageContainer = styled.div`
  width: 100%;
  transition: ease-in-out 0.3s all;
  &:hover {
    transform: scale(1.05);
    z-index: 3;
  }
`;

export const ButtonActions = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-main);
  background-color: var(--admin-white);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0.1;

  position: absolute;

  top: 0.5rem;
  right: 0.5rem;
  z-index: 4;

  transition: ease-in-out 0.3s all;
  &:hover {
    color: var(--admin-white);
    background-color: var(--admin-main);
  }
`;

export const Conatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    ${ButtonActions} {
      opacity: 1;
    }
  }
`;
