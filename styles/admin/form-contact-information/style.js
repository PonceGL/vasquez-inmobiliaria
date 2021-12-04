import styled from "styled-components";

export const Container = styled.section`
  /* grid-column: 2 / sapan 1; */
  width: 100%;
  margin: 1rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// Form :::::::::::::

export const FormStyled = styled.form`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
  border: 0.2rem solid var(--admin-white);
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;

  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */

  border: none;
  transition: 0.3s ease-in-out all;
`;

export const Legend = styled.legend`
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--admin-main);
  transition: 0.3s ease-in-out all;
`;

export const Label = styled.label`
  grid-column: 1 / span 2;
  width: 100%;
  color: var(--admin-text);

  display: grid;
  grid-template-columns: ${(props) => (props.more ? `33% 62% 5%` : `1fr 2fr`)};
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
  opacity: 0.5;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
  }
`;

export const ButtonMore = styled.button`
  width: 100%;
  padding: 0.5rem;

  border-radius: 0.5rem;
  color: var(--admin-text);
  border: 0.1rem solid var(--admin-text);
  background-color: transparent;
  outline: none;
  transition: 0.3s ease-in-out all;
  opacity: 0.5;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
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

export const InputEmail = styled(InputTextBase)`
  color: ${(props) => (props.err ? `var(--admin-text)` : `#ff0000`)};
`;

// Viewer :::::::::::::

export const Viewer = styled(Fieldset)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const InputReadOnly = styled.p`
  width: 100%;
  padding: 0.5rem;

  border-radius: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--admin-text);
  border: none;
  background-color: transparent;
  transition: 0.3s ease-in-out all;
`;

export const TextReadOnly = styled(InputReadOnly)`
  text-transform: capitalize;
`;

export const ButtonSumit = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.6rem;
  color: var(--admin-main);
  background-color: var(--admin-bg);
  border: 0.1rem solid var(--admin-main);
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover {
      color: var(--admin-main);
      background-color: var(--admin-bg);
      border: 0.1rem solid var(--admin-main);
    }
  }
  &:hover {
    color: var(--admin-strong);
    border: 0.1rem solid var(--admin-strong);
    background-color: var(--admin-main);
  }
`;

export const ErrorMessage = styled.p`
  grid-column: 1 / span 2;
  width: 50%;
  padding: 0.5rem;
  text-align: center;
  font-size: 2rem;
  color: #ff0000;
  border: 0.1rem solid #ff0000;
  border-radius: 0.5rem;
  transition: 0.3s ease-in-out all;
`;
