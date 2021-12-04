import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";

//Styled-Components
import {
  Container,
  FormStyled,
  Fieldset,
  Legend,
  Label,
  InputTextBase,
  InputNumber,
  ButtonMore,
  InputEmail,
  ButtonSumit,
  ErrorMessage,
} from "../../../styles/admin/form-whatsapp/style";

const FormWhatsapp = ({ handleGetData }) => {
  const [numerPhone, setNumerPhone] = useState("");
  const [disbleSubmit, setDisbleSubmit] = useState(true);
  const form = useRef(null);

  const handleSendData = async (whatsApp) => {
    const { data } = await Axios.post("/api/whatsApp-contact/new", whatsApp);

    if (data.status) {
      handleGetData();
    } else if (!data.status) {
    }
  };

  // Enviar el formulario de casa
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWhatsApp = new FormData(form.current);
    const whatsApp = {
      numerPhone: newWhatsApp.get("numerPhone"),
    };

    handleSendData(whatsApp);
  };

  useEffect(() => {
    if (numerPhone.length < 10) {
      setDisbleSubmit(false);
    } else {
      setDisbleSubmit(true);
    }
  }, [numerPhone]);
  return (
    <Container>
      <FormStyled ref={form} onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Registrar nuevo Numero de WhatsApp</Legend>
          <InputNumber
            type="tel"
            inputMode="numeric"
            id="numerPhone"
            name="numerPhone"
            placeholder="Solo numeros con WhatsApp"
            maxLength="10"
            value={numerPhone}
            onChange={(e) =>
              setNumerPhone(
                e.target.value.replace(/[a-z]/gi, "").toString().trim()
              )
            }
          />
        </Fieldset>
        <ButtonSumit type="submit" disabled={!disbleSubmit}>
          Registrar
        </ButtonSumit>
      </FormStyled>
    </Container>
  );
};

export default FormWhatsapp;
