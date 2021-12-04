import { useState, useRef, useEffect } from "react";
import Axios from "axios";

// Componenst
import Modal from "../modal/modal";

// Styled-Components
import {
  TextModal,
  Label,
  Input,
  ButtonActions,
} from "../../../styles/admin/updatePrice/style";

const UpdateName = ({ _id, title, changesHouses, setchangesHouses }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const newNameInput = useRef(null);
  const [newName, setNewName] = useState("");

  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-property`, {
      id: _id,
      set: { title: newName },
    });

    if (data.status) {
      setchangesHouses(!changesHouses);
      setModalIsOpen(false);
      setNewName("");
    }
  };

  const handleUpdate = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleUpdateData();
  };

  const prevent = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdate();
    }
  };

  useEffect(() => {
    if (newNameInput.current) {
      let inputText = newNameInput.current;
      inputText.addEventListener("keypress", (e) => prevent(e));
      return () => {
        inputText.removeEventListener("keypress", (e) => prevent(e));
      };
    }
  }, [newNameInput]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextModal>Esta acción cambiará el nombre de la propiedad</TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>
          De {title} A {newName}
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar su nombre?</TextModal>
      </Modal>
      <Label>
        Cambiar nombre:
        <Input
          ref={newNameInput}
          type="text"
          placeholder="Cambiar nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value.toString())}
        />
      </Label>
      {newName !== "" && (
        <ButtonActions type="button" onClick={handleUpdate}>
          Cambiar nombre
        </ButtonActions>
      )}
    </>
  );
};

export default UpdateName;
