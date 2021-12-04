import { useState } from "react";
import Axios from "axios";

// Componenst
import Modal from "../modal/modal";

// Styled-Components
import {
  TextModal,
  Label,
  Select,
  ButtonActions,
} from "../../../styles/admin/updateTypeOfTransaction/style";

const UpdateTypeOfTransaction = ({
  _id,
  title,
  typeOfTransaction,
  changesHouses,
  setchangesHouses,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newType, setnewType] = useState("");

  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-property`, {
      id: _id,
      set: { typeOfTransaction: newType },
    });
    if (data.status) {
      setchangesHouses(!changesHouses);
      setModalIsOpen(false);
      setnewType("");
    }
  };

  const handleUpdate = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleUpdateData();
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
          Esta acción cambiará de la información de la propiedad
        </TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>
          De {typeOfTransaction} A {newType}
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar a {newType}?</TextModal>
      </Modal>
      <Label htmlFor="typeOfTransaction">
        ¿Propiedad para?
        <Select onChange={(e) => setnewType(e.target.value)}>
          <option value="Venta">Venta</option>
          <option value="Renta">Renta</option>
          <option value="Venta y Renta">Venta y Renta</option>
        </Select>
      </Label>
      {newType !== "" && (
        <>
          {newType !== typeOfTransaction && (
            <ButtonActions type="button" onClick={handleUpdate}>
              Cambiar a {newType}
            </ButtonActions>
          )}
        </>
      )}
    </>
  );
};

export default UpdateTypeOfTransaction;
