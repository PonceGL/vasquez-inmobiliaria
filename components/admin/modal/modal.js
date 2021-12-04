import React from "react";
import ReactDOM from "react-dom";

// Styled Components
import {
  ModalBackground,
  ModalContainer,
  ModalStyled,
  ModalHeader,
  ModalFooter,
  ModalMain,
  CloseButton,
  AcceptButton,
} from "../../../styles/admin/modal/style";

const Modal = ({ children, isOpen, handleClose, typeButton, click }) => {
  if (!isOpen) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <ModalContainer>
        <ModalStyled>
          <ModalHeader>
            <CloseButton type="button" onClick={() => handleClose(false)} />
          </ModalHeader>
          <ModalMain>{children}</ModalMain>
          <ModalFooter>
            <AcceptButton type={typeButton} onClick={click}>
              Aceptar
            </AcceptButton>
          </ModalFooter>
        </ModalStyled>
        <ModalBackground />
      </ModalContainer>,
      document.getElementById("modal-root")
    );
  }
};

export default Modal;
