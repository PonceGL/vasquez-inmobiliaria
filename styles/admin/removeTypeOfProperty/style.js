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
  border: 0.2rem solid red;
`;

export const Legend = styled.legend`
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: red;
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  p {
    text-align: center;
    color: var(--admin-text);
  }
  p:nth-child(2) {
    opacity: 0.6;
    color: red;
    font-weight: 600;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  max-height: 90%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Button = styled.button`
  width: 80%;
  padding: 0.5rem;
  margin: 1rem auto;

  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 1rem;
  border: none;
  background-color: ${(props) => (props.forDelete ? `red` : `var(--admin-bg)`)};
  color: var(--admin-text);
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-strong);
    background-color: ${(props) =>
      props.forDelete ? `red` : `var(--admin-focus)`};
  }
`;
