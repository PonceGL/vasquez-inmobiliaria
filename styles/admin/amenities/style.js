import styled from "styled-components";

export const Label = styled.label`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-gap: 1rem;
  justify-items: start;
  align-items: center;
`;

export const InputTextBase = styled.input`
  grid-column: ${(props) => (props.column ? `1 / span 2` : `1 / span 1`)};

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
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  margin: 0 auto;
  color: var(--admin-main);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--admin-main);
  background: none;
  outline: none;
  transition: 0.3s ease-in-out all;
  cursor: pointer;
  position: relative;
  &:after {
    content: "\\002B";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.5rem;
    color: var(--admin-main);
    line-height: 2.5rem;
    text-align: center;
    transition: 0.3s ease-in-out all;
  }
  &:focus {
    border: 0.1rem solid var(--admin-focus);
  }
  &:hover {
    color: var(--admin-focus);
    border: 0.1rem solid var(--admin-focus);
    &:after {
      color: var(--admin-focus);
    }
  }
`;

export const DeleteButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: #ff6363;
  border: 0.1rem solid #eb0000;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transition: 0.3s ease-in-out all;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1;
  &:after {
    content: "\\00D7";
    font-size: 2rem;
    line-height: 2rem;
    color: #000000;
    text-align: center;
  }
  &:hover {
    background-color: #fdb827;
    border: 0.1rem solid #fdb827;
    opacity: 1;
  }
`;

export const Benefits = styled.p`
  font-size: 1.4rem;
  position: relative;
  &:hover {
    ${DeleteButton} {
      opacity: 1;
      transform: translate(0.5rem, -2.5rem);
    }
  }
`;
