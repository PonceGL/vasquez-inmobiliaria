import styled from "styled-components";

export const FormStyled = styled.form`
  width: 100%;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 4rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  background: none;
  border: 0.2rem solid var(--admin-text);
`;

export const Legend = styled.legend`
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--admin-text);
`;

export const InputText = styled.input`
  width: 80%;
  padding: 0.5rem;

  border-radius: 0.5rem;
  color: var(--admin-text);
  border: 0.2rem solid var(--admin-text);
  outline: none;
  background: none;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
  }
`;
