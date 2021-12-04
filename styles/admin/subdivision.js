import styled from "styled-components";

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;

  border-radius: 1rem;
  border: 0.2rem solid var(--admin-white);
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
`;

export const Legend = styled.legend`
  margin: 1rem 0;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--admin-text);
  transition: 0.3s ease-in-out all;
`;

export const Label = styled.label`
  grid-column: 1 / span 2;
  width: 100%;
  color: var(--admin-text);

  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  transition: 0.3s ease-in-out all;
`;

export const InputTextBase = styled.input`
  width: 100%;
  padding: 0.5rem;

  border-radius: 0.5rem;
  color: var(--admin-text);
  border: 0.1rem solid var(--admin-text);
  background-color: transparent;
  outline: none;
  transition: 0.3s ease-in-out all;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
  }
`;

export const FieldsetDescription = styled(Fieldset)`
  grid-column: 2 / span 1;
`;

export const Description = styled(Fieldset)`
  grid-column: 1 / span 2;
`;
