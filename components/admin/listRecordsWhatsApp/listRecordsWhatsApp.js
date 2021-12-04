import styled from "styled-components";
import { useState } from "react";
import Axios from "axios";

// Componenst
import Modal from "../modal/modal";

// Components
import { WhatsApp } from "../../IconsSVG/WhatsApp";

const ListRecordsWhatsApp = ({ _id, numerPhone, handleGetData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleDeleteData = async () => {
    const { data } = await Axios.delete(`/api/whatsApp-contact/${_id}`);
    if (data.status) {
      handleGetData();
      setModalIsOpen(false);
    }
  };

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleDeleteData();
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextModal>
          Esta acción eliminará por completo este número de WhatsApp
        </TextModal>
        <TextModal>
          <span>{numerPhone}</span>
        </TextModal>
        <TextModal>¿Confirmas la eliminación?</TextModal>
      </Modal>
      <Container>
        <ButtonDelete type="button" onClick={() => setModalIsOpen(true)} />
        <LinkWhatsApp
          href={`https://api.whatsapp.com/send?phone=+52${numerPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enlace a WhatsApp"
        >
          <WhatsApp />
          {numerPhone}
        </LinkWhatsApp>
      </Container>
    </>
  );
};

export default ListRecordsWhatsApp;

export const ButtonDelete = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: #ff0000;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  opacity: 0;
  transition: 0.5s ease-in-out all;
  transition-delay: 0.1s;

  position: absolute;
  top: 0;
  right: 0;

  &:after {
    content: "\\00D7";
    font-size: 2rem;
    line-height: 2rem;
    color: #000000;
    text-align: center;
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  position: relative;
  &:hover {
    color: var(--admin-main);
    svg path {
      fill: var(--admin-main);
    }
    ${ButtonDelete} {
      opacity: 1;
    }
  }
`;

export const LinkWhatsApp = styled.a`
  color: var(--admin-text);
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 1rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  transition: 0.3s ease-in-out all;
  svg {
    width: 2rem;
    margin-right: 1rem;
  }

  svg path {
    fill: var(--admin-text);
    transition: 0.3s ease-in-out all;
  }

  &:hover {
    color: var(--admin-main);
    svg path {
      fill: var(--admin-main);
    }
  }
`;

export const TextModal = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--admin-text);
  span {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--admin-main);
  }
`;
