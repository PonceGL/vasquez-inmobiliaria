import { useRef, useState } from "react";
import { sendEmail } from "../../utils/sendEmail";

// Styled-Components
import {
  InfoContainer,
  FormStyled,
  Fieldset,
  Legend,
  InputTextBase,
  TextareaTextBase,
  SendButton,
  SuccessMessage,
} from "./style";

const HouseFormContact = ({ title, white }) => {
  const form = useRef(null);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = new FormData(form.current);

    const message = {
      name: newMessage.get("name"),
      email: newMessage.get("email"),
      phone: newMessage.get("phone"),
      message: newMessage.get("message"),
      title: title,
      property: window.location.href,
      date: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
    };

    setSending(true);
    sendEmail(message, setSuccess);
  };

  return (
    <InfoContainer white={white}>
      {!success ? (
        <FormStyled onSubmit={handleSubmit} ref={form} white={white}>
          <Fieldset white={white}>
            <Legend white={white}>Envíanos un Mensaje</Legend>
          </Fieldset>
          <InputTextBase
            type="text"
            name="name"
            placeholder="Nombre"
            white={white}
            required
          />
          <InputTextBase
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            white={white}
          />
          <InputTextBase
            type="tel"
            name="phone"
            placeholder="Teléfono"
            white={white}
            required
          />
          <TextareaTextBase
            name="message"
            maxLength="300"
            placeholder="Mensaje"
            white={white}
            required
          />
          <SendButton type="submit" white={white}>
            {sending ? `Enviando...` : `Enviar`}
          </SendButton>
        </FormStyled>
      ) : (
        <SuccessMessage white={white}>
          <h4>Su mensaje se envió correctamente.</h4>
          <p>Nos pondremos en contacto cuanto antes.</p>
        </SuccessMessage>
      )}
    </InfoContainer>
  );
};

export default HouseFormContact;
