import { useRef, useState } from "react";

// Styled-Components
import {
  Form,
  InputText,
  TextareaTextBase,
  SendButton,
  ImagesPreview,
  InputFile,
  InputLabel,
  FileName,
} from "./style";

const FormClientProperty = ({
  imageBase64,
  setImageBase64,
  form,
  handleSubmit,
}) => {
  const preview = useRef(null);
  const [price, setPrice] = useState("");

  const handleFiles = (e) => {
    const data = e.target.files;
    let files = Object.values(data);

    if (files.length > 5) {
      alert("Solo se permiten máximo 5 archivos");
      files = files.slice(0, 5);
    }

    files.map((file) => {
      if (file.size > 2000000) {
        alert(
          `La imagen ${file.name} es demasiado grande, el peso máximo es de 2 MB`
        );
      } else {
        const img = document.createElement("img");
        img.file = file;
        preview.current.appendChild(img);

        const reader = new FileReader();

        reader.onload = ((aImg) => {
          return (e) => {
            aImg.src = e.target.result;
            setImageBase64((imageBase64) => [
              ...imageBase64,
              e.target.result.split("base64,")[1],
            ]);
          };
        })(img);
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <>
      <Form
        ref={form}
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <InputText
          type="text"
          name="name"
          placeholder="Nombre completo"
          required
        />
        <InputText
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          required
        />
        <InputText
          type="number"
          id="price"
          name="price"
          inputMode="numeric"
          placeholder="Precio que pretende"
          value={price}
          onChange={(e) => setPrice(e.target.value.replace(/\D/g, "").trim())}
          required
        />
        <InputText
          type="text"
          name="address"
          placeholder="Ubicación | dirección"
          required
        />
        <TextareaTextBase
          name="message"
          maxLength="300"
          placeholder="Mensaje"
          required
        />

        <div>
          <InputFile
            type="file"
            id="file"
            accept=".jpg, .png, .jpeg"
            multiple={true}
            onChange={handleFiles}
            aria-label="Seleccionar archivos"
          />
          <InputLabel htmlFor="file">
            Seleccionar fotografías
            <FileName />
          </InputLabel>
        </div>

        {/* <input
          type="file"
          accept=".jpg, .png, .jpeg"
          multiple={true}
          onChange={handleFiles}
        /> */}
        <SendButton type="submit">Enviar</SendButton>
      </Form>
      <ImagesPreview ref={preview} />
    </>
  );
};

export default FormClientProperty;

// Nombre completo
// Telefono
// Precio que pretende
// Ubicación / dirección (ciudad)
// Fotografias opcionales
