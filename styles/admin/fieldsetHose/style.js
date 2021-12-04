import styled from "styled-components";

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${(props) =>
    props.length ? `1fr 1fr 1fr 2fr` : `repeat(4, 1fr)`};
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;

  border-radius: 1rem;
  border: 0.2rem solid var(--admin-white);
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Legend = styled.legend`
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--admin-text);
  transition: 0.3s ease-in-out all;
  @media (max-width: 1000px) {
    font-size: 2rem;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: start;
  align-items: center;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const InputTextBase = styled.input`
  width: 100%;
  padding: 0.5rem;
  color: var(--admin-text);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--admin-text);
  background-color: transparent;
  outline: none;
  transition: 0.3s ease-in-out all;
  &:focus {
    border: 0.1rem solid var(--admin-main);
  }
  @media (max-width: 1000px) {
    margin-top: 0.5rem;
  }
`;

export const InputNumber = styled(InputTextBase)`
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.3rem 0;
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
