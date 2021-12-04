import styled from "styled-components";

export const ConfirmContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
`;

export const InputContainer = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-main);
  border-radius: 1rem;
  position: relative;
  z-index: 2;
  p {
    margin: 1rem 0;
    text-align: center;
    span {
      color: red;
    }
  }
`;

export const InputConfirm = styled.input`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  border: none;
  border-radius: 1rem;
  color: #000000;
  background-color: #ffffff;
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  &:after {
    content: "\\2715";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.5rem;
    color: red;
    line-height: 2.5rem;
    text-align: center;
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    &:after {
      transform: rotate(16deg);
    }
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
