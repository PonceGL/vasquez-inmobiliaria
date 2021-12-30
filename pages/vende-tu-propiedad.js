import { useState, useRef } from "react";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellText from "../components/sell-Text";
import FormClientProperty from "../components/FormClientProperty";
import { sendEmailWithImages } from "../utils/sendEmailWithImages";

// Styled-Components
import { Main } from "../styles/vende-tu-propiedad/style";

const TuPropiedad = () => {
  const form = useRef(null);
  const [imageBase64, setImageBase64] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = new FormData(form.current);

    const message = {
      name: newMessage.get("name"),
      email: newMessage.get("email"),
      message: newMessage.get("message"),
      date: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
      image: imageBase64,
    };

    sendEmailWithImages(message);
  };

  return (
    <>
      <Header title="Tú propiedad | Constructora e Inmobiliaria Vasquez" />
      <Main>
        <h1>Vende tu propiedad</h1>
        <SellText />
        <FormClientProperty
          imageBase64={imageBase64}
          setImageBase64={setImageBase64}
          form={form}
          handleSubmit={handleSubmit}
        />
      </Main>
      <Footer />
    </>
  );
};

export default TuPropiedad;
