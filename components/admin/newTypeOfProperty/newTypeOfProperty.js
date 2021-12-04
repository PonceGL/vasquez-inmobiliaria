import React, { useState } from "react";
import fetch from "isomorphic-unfetch";

// Components
import Modal from "../modal/modal";

// Styled Components
import {
  FormStyled,
  Fieldset,
  Legend,
  InputText,
} from "../../../styles/admin/newTypeOfProperty/style";

const NewTypeOfProperty = ({ isOpen, handleClose }) => {
  const [newType, setNewType] = useState("");

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const type = {
      newType: newType.charAt(0).toUpperCase() + newType.slice(1),
    };

    fetch(`/api/typesOfRealEstate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(type),
    })
      .then((response) => response.json())
      .then(({ result }) => {
        console.log(result);
        handleClose(false);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      typeButton="submit"
      click={handleSubmit}
    >
      <FormStyled onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Nuevo tipo de inmueble</Legend>
          <InputText
            type="text"
            name="newType"
            value={newType}
            onChange={(e) => setNewType(e.target.value.toLowerCase())}
          />
        </Fieldset>
      </FormStyled>
    </Modal>
  );
};

export default NewTypeOfProperty;
