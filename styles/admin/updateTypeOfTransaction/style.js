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

export const Label = styled.label`
  width: 100%;
  color: var(--admin-text);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s ease-in-out all;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  color: var(--admin-text);
  border: 0.1rem solid var(--admin-text);
  background-color: transparent;
  outline: none;
  transition: 0.3s ease-in-out all;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
    background-color: transparent;
  }
`;

export const ButtonActions = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-main);
  background-color: var(--admin-white);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: ease-in-out 0.3s all;
  &:hover {
    color: var(--admin-white);
    background-color: var(--admin-main);
  }
`;
