import { useState, useEffect } from "react";

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
} from "../../../styles/admin/form-contact-information/style";

const FormContactInformation = ({ handleSendData, form, error }) => {
  const [title, setTitle] = useState("");
  const [numerPhone, setNumerPhone] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [addres, setAddres] = useState("");
  const [time, setTime] = useState("");
  const [disbleSubmit, setDisbleSubmit] = useState(true);
  const emailRegex = /[\w\._]{5,30}\+?[\w]{0,20}@[\w\.\-]{3,}\.\w{2,5}$/;

  const [phoneNumbers, setPhoneNumbers] = useState([""]);

  const updatePhoneNumers = () => {
    let current = phoneNumbers.filter((item) => item !== "");
    setPhoneNumbers(current);
    setPhoneNumbers((current) => [...current, numerPhone]);
    setPhoneNumbers((phoneNumbers) => [...phoneNumbers, ""]);
    setNumerPhone("");
  };

  // Enviar el formulario de casa
  const handleSubmit = (e) => {
    e.preventDefault();
    const newOffice = new FormData(form.current);
    const office = {
      titleOficce: newOffice.get("titleOficce"),
      phoneNumbers: phoneNumbers.filter((item) => item !== ""),
      emailAddress: newOffice.get("emailAddress"),
      address: newOffice.get("address"),
      time: newOffice.get("time"),
    };

    handleSendData(office);
    setTimeout(() => {
      setTitle("");
      setNumerPhone("");
      setEmailAddress("");
      setAddres("");
      setTime("");
      setPhoneNumbers([""]);
    }, 1000);
  };

  useEffect(() => {
    if (phoneNumbers === [""] || emailAddress === "") {
      setDisbleSubmit(false);
    } else {
      setDisbleSubmit(true);
    }
  }, [phoneNumbers, emailAddress]);

  return (
    <Container>
      <FormStyled ref={form} onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Registrar nuevos datos de contacto</Legend>
          <Label htmlFor="titleOficce">
            Nombre de oficina:
            <InputTextBase
              type="text"
              id="titleOficce"
              name="titleOficce"
              placeholder="Nombre de oficina"
              value={title}
              onChange={(e) => setTitle(e.target.value.toString())}
              err={emailRegex.test(emailAddress)}
            />
          </Label>
          {phoneNumbers.map((item) => (
            <Label
              key={item}
              htmlFor="numerPhone"
              more={numerPhone.length === 10 ? true : false}
            >
              Nuevo número de teléfono:
              {item === "" ? (
                <>
                  <InputNumber
                    type="tel"
                    inputMode="numeric"
                    id="numerPhone"
                    name="numerPhone"
                    placeholder="Nuevo número de teléfono"
                    maxLength="10"
                    value={numerPhone}
                    onChange={(e) =>
                      setNumerPhone(
                        e.target.value.replace(/[a-z]/gi, "").toString().trim()
                      )
                    }
                  />
                  {numerPhone.length === 10 && (
                    <ButtonMore type="button" onClick={updatePhoneNumers}>
                      +
                    </ButtonMore>
                  )}
                </>
              ) : (
                <p>{item}</p>
              )}
            </Label>
          ))}
          <Label htmlFor="emailAddress">
            Nueva dirección de email:
            <InputEmail
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Nueva dirección de email"
              value={emailAddress}
              onChange={(e) =>
                setEmailAddress(e.target.value.toString().trim())
              }
              err={emailRegex.test(emailAddress)}
            />
          </Label>
          <Label htmlFor="address">
            Nueva dirección:
            <InputTextBase
              type="text"
              id="address"
              name="address"
              placeholder="Nueva dirección"
              value={addres}
              onChange={(e) => setAddres(e.target.value.toString())}
            />
          </Label>
          <Label htmlFor="time">
            Nuevo horario:
            <InputTextBase
              type="text"
              id="time"
              name="time"
              placeholder="Lunes a viernes 8:00 - 20:00"
              value={time}
              onChange={(e) => setTime(e.target.value.toString())}
            />
          </Label>
        </Fieldset>
        {error === "" ? (
          <ButtonSumit type="submit" disabled={!disbleSubmit}>
            Registrar
          </ButtonSumit>
        ) : (
          <ErrorMessage>{error}</ErrorMessage>
        )}
      </FormStyled>
    </Container>
  );
};

export default FormContactInformation;
