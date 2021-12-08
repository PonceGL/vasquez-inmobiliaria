import { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { deleteImagesIfYouCloseTab } from "../../../utils/deleteImagesIfYouCloseTab";

// Components
import Modal from "../modal/modal";

// Styled-Components
import {
  ButtonDelete,
  TextModal,
} from "../../../styles/admin/propertyPreview/style";

import {
  ConfirmContainer,
  InputContainer,
  CloseButton,
  InputConfirm,
  Background,
} from "../../../styles/admin/deleteButton/style";

const DeleteButton = ({ _id, title, images }) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleClose();
    setConfirm(true);
  };

  const handleSendData = async () => {
    const { data } = await Axios.post(`/api/delete-property`, {
      id: _id,
    });

    if (data.status) {
      router.push(`/admin/properties`);
    }
  };

  const deleteConfirm = () => {
    if (confirmText === title) {
      deleteImagesIfYouCloseTab(images);
      handleSendData();
      setConfirmText("");
    }
  };

  return (
    <>
      {confirm && (
        <ConfirmContainer>
          <InputContainer>
            <CloseButton type="button" onClick={() => setConfirm(false)} />
            <p>
              Escribe <span>{title}</span> para confirmar
            </p>
            <InputConfirm
              type="text"
              name="confirmText"
              onChange={(e) => setConfirmText(e.target.value)}
            />
            {confirmText === title && (
              <ButtonDelete type="button" onClick={deleteConfirm}>
                Eliminar
              </ButtonDelete>
            )}
          </InputContainer>
          <Background />
        </ConfirmContainer>
      )}
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextModal>
          Esta acción eliminará por completo los registros de esta propiedad
        </TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>¿Confirmas que quieres eliminarla?</TextModal>
      </Modal>
      <ButtonDelete type="button" onClick={() => setModalIsOpen(true)}>
        Eliminar propiedad
      </ButtonDelete>
    </>
  );
};

export default DeleteButton;
