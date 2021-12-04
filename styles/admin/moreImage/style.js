import styled from "styled-components";

export const ButtonActions = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
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

export const ContainerImage = styled.div`
  border: 0.1rem solid white;
  width: 100%;
  height: 100%;
  position: relative;
  transition: ease-in-out 0.3s all;
  &:hover {
    transform: scale(1.2);
    z-index: 3;
    ${ButtonActions} {
      opacity: 1;
    }
  }
`;
