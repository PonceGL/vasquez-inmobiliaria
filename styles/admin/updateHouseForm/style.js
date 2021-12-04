import styled from "styled-components";

export const FormStyled = styled.form`
  width: 100%;
  min-height: 70vh;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(6, 1fr);
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

export const Name = styled(Label)``;

export const LabelLocation = styled(Label)``;

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

export const InputName = styled(InputTextBase)`
  width: 100%;
  position: relative;
`;

export const ButtonLocation = styled.button`
  width: 100%;
  padding: 0.5rem;
  color: var(--admin-text);
  border: 0.1rem solid var(--admin-main);
  background-color: transparent;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--admin-text);
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-white);
    border: 0.1rem solid var(--admin-white);
    background-color: var(--admin-main);
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

export const CounterText = styled.p`
  width: fit-content;
  padding: 0.2rem;
  border-radius: 0.4rem;
  color: ${(props) => (props.length > 60 ? `#ff0000` : `var(--admin-white)`)};
  background: #ffffff;
  position: absolute;
  left: 47%;
  transition: 0.3s ease-in-out all;
`;

export const FieldsetDescription = styled(Fieldset)`
  grid-column: 2 / span 1;

  grid-template-rows: ${(props) =>
    props.house ? `repeat(6, 1fr)` : `repeat(3, 1fr)`};
  transition: 0.3s ease-in-out all;
  ${Label} {
    width: 100%;
    margin: 0.5rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-items: start;
    align-items: center;
  }
  ${InputTextBase} {
    width: 100%;
  }
`;

export const Description = styled(FieldsetDescription)`
  grid-column: ${(props) => (props.house ? `2 / span 1` : `1 / span 2`)};
`;

export const InputTextarea = styled.textarea`
  grid-column: 1 / span 2;
  grid-row: 1 / span 6;
  width: 100%;
  height: 100%;
  margin: 0;
  height: inherit;
  min-height: 10rem;
  max-height: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--admin-text);
  border: 0.1rem solid var(--admin-text);
  background-color: transparent;
  outline: none;
  resize: none;
  transition: 0.3s ease-in-out all;
  &:focus {
    border: 0.1rem solid var(--admin-focus);
  }
`;

export const CounterTextarea = styled(CounterText)`
  color: ${(props) =>
    props.length > 156 ? `var(--admin-main)` : `var(--admin-white)`};
  left: initial;
  right: 1rem;
  bottom: 1rem;
  transition: 0.3s ease-in-out all;
`;

export const FieldsetPhotosStyled = styled.fieldset`
  grid-column: 1 / span 2;

  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  border: 0.2rem solid var(--admin-white);
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;

  ${(props) =>
    props.empty
      ? `
  border-radius: 1rem;
  border: 0.2rem solid var(--admin-white);
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
  
  `
      : `
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 15rem;
  grid-auto-rows: 15rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  
  `}
`;

export const ButtonSumit = styled.button`
  grid-column: 1 / span 2;
  width: 50%;
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
