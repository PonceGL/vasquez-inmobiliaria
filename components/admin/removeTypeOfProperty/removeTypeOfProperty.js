import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

// Components
import Modal from "../modal/modal";

// Styled Components
import {
  FormStyled,
  Fieldset,
  Legend,
  Section,
  TextContainer,
  ButtonsContainer,
  Button,
} from "../../../styles/admin/removeTypeOfProperty/style";

const removeTypeOfProperty = ({ when, isOpen, handleClose }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [typesForElemination, setTypesForElemination] = useState([]);

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/deleteTypesOfRealEstate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(typesForElemination),
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

  const handleClick = (value) => {
    if (typesForElemination.includes(value)) {
      let remove = typesForElemination.filter((types) => types !== value);
      console.log("remove: ", remove);
      setTypesForElemination(remove);
    } else {
      setTypesForElemination((typesForElemination) => [
        ...typesForElemination,
        value,
      ]);
    }
  };

  useEffect(async () => {
    const types = await fetch(`/api/deleteTypesOfRealEstate`);
    const { data } = await types.json();
    setPropertyTypes(data);
  }, [when]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      typeButton="submit"
      click={handleSubmit}
    >
      <FormStyled onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Eliminar tipo de inmueble</Legend>
          <Section>
            <TextContainer>
              <p>Selecciona los que quieres eliminar</p>
              <p>Esta acción es irreversible</p>
            </TextContainer>
            <ButtonsContainer>
              {propertyTypes.length > 0 && (
                <>
                  {propertyTypes.map((type) => (
                    <Button
                      type="button"
                      key={type._id}
                      onClick={() => handleClick(type.value)}
                      forDelete={typesForElemination.includes(type.value)}
                    >
                      {type.value}
                    </Button>
                  ))}
                </>
              )}
            </ButtonsContainer>
          </Section>
        </Fieldset>
      </FormStyled>
    </Modal>
  );
};

export default removeTypeOfProperty;
