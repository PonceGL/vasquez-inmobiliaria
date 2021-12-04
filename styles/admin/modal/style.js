import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const ModalStyled = styled.div`
  min-width: 50rem;
  min-height: 30rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 2rem;
  background-color: var(--admin-bg);
  overflow: hidden;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  position: relative;
  z-index: 4;
`;

export const ModalHeader = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ModalFooter = styled(ModalHeader)`
  justify-content: center;
  align-items: center;
`;

export const ModalMain = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: relative;
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

export const AcceptButton = styled.button`
  width: 50%;
  padding: 0.5rem;
  font-size: 1.6rem;
  color: var(--admin-strong);
  border: 0.2rem solid var(--admin-main);
  background-color: var(--admin-main);
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-main);
    border: 0.2rem solid var(--admin-strong);
    background-color: var(--admin-strong);
  }
`;

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--admin-white);
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
