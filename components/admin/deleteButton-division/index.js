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

const DeleteButton = ({ _id, name, images }) => {
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
    const { data } = await Axios.post(`/api/delete-subdivicion`, {
      id: _id,
    });

    if (data.status) {
      router.push(`/admin/divisions`);
    }
  };

  const deleteConfirm = () => {
    if (confirmText === name) {
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
              Escribe <span>{name}</span> para confirmar
            </p>
            <InputConfirm
              type="text"
              name="confirmText"
              onChange={(e) => setConfirmText(e.target.value)}
            />
            {confirmText.length > 3 && (
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
          Esta acción eliminará por completo los registros de este
          fraccionamiento
        </TextModal>
        <TextModal>
          <span>{name}</span>
        </TextModal>
        <TextModal>¿Confirmas que quieres eliminarlos?</TextModal>
      </Modal>
      <ButtonDelete type="button" onClick={() => setModalIsOpen(true)}>
        Eliminar fraccionamiento
      </ButtonDelete>
    </>
  );
};

export default DeleteButton;
