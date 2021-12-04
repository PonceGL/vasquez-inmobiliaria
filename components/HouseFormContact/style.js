import styled from "styled-components";

export const InfoContainer = styled.section`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${(props) =>
    props.white
      ? `background-color: var(--white);`
      : `background-color: var(--dark-blue);`}
  @media (min-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 1000px) {
    grid-column: 2 / span 1;
    width: 100%;
    height: 100%;
  }
`;

export const FormStyled = styled.form`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  @media (min-width: 750px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  padding-left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
  transition: 0.3s ease-in-out all;
`;

export const Legend = styled.legend`
  margin-bottom: 0.5rem;
  padding: 1rem;
  padding-left: 0;
  font-size: 1.6rem;
  font-weight: 600;
  ${(props) => (props.white ? `color: var(--black);` : `color: var(--white);`)}
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
  padding: 1rem;

  border-radius: 2rem;
  ${(props) => (props.white ? `color: var(--black);` : `color: var(--white);`)}
  ${(props) =>
    props.white
      ? `
    border: 0.1rem solid rgba(0, 0, 0, 1);
  
    `
      : `
    border: 0.1rem solid rgba(229, 229, 229, 1);
    background: rgba(229, 229, 229, 0.2);
    `}

  outline: none;
  transition: 0.3s ease-in-out all;
  /* &:focus {
    border: 0.1rem solid var(--admin-focus);
  } */
  &::placeholder {
    ${(props) =>
      props.white ? `color: var(--black);` : `color: var(--white);`}
    opacity: 0.5;
  }
`;

export const TextareaTextBase = styled.textarea`
  width: 100%;
  min-height: 20rem;
  padding: 1rem;

  border-radius: 2rem;
  ${(props) => (props.white ? `color: var(--black);` : `color: var(--white);`)}
  ${(props) =>
    props.white
      ? `
    border: 0.1rem solid rgba(0, 0, 0, 1);
  
    `
      : `
    border: 0.1rem solid rgba(229, 229, 229, 1);
    background: rgba(229, 229, 229, 0.2);
    `}
  outline: none;
  resize: vertical;
  transition: 0.3s ease-in-out all;
  /* &:focus {
    border: 0.1rem solid var(--admin-focus);
  } */
  &::placeholder {
    ${(props) =>
      props.white ? `color: var(--black);` : `color: var(--white);`}
    opacity: 0.5;
  }
`;

export const SendButton = styled.button`
  width: 100%;
  padding: 1rem;

  border-radius: 2rem;
  color: var(--white);
  border: none;
  background: var(--light-blue);
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
`;

export const SuccessMessage = styled.div`
  width: 90%;
  min-height: 20rem;
  padding: 1rem;
  margin: 2rem auto;

  ${(props) => (props.white ? `color: var(--black);` : `color: var(--white);`)}

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h4 {
    font-size: 2rem;
    text-align: center;
  }

  p {
    text-align: center;
  }
`;
