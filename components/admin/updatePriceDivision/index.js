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

// Formater para el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const UpdatePriceDivision = ({
  _id,
  name,
  pricem2,
  changeDivision,
  setChangeDivision,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const newPriceInput = useRef(null);
  const [newPrice, setNewPrice] = useState("");

  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-division`, {
      id: _id,
      set: { pricem2: parseInt(newPrice) },
    });

    if (data.status) {
      setChangeDivision(!changeDivision);
      setModalIsOpen(false);
      setNewPrice("");
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
    if (newPriceInput.current) {
      let inputText = newPriceInput.current;
      inputText.addEventListener("keypress", (e) => prevent(e));
      return () => {
        inputText.removeEventListener("keypress", (e) => prevent(e));
      };
    }
  }, [newPriceInput]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextModal>Esta acción cambiará el por m² anunciado</TextModal>
        <TextModal>
          <span>{name}</span>
        </TextModal>
        <TextModal>
          De ${formatter.format(pricem2)} A ${formatter.format(newPrice)}
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar el precio?</TextModal>
      </Modal>
      <Label>
        Cambiar precio:
        <Input
          ref={newPriceInput}
          type="tel"
          inputMode="numeric"
          id="pricem2"
          name="pricem2"
          placeholder="Cambiar precio por m²"
          value={newPrice}
          onChange={(e) =>
            setNewPrice(e.target.value.replace(/[a-z]/gi, "").toString().trim())
          }
        />
      </Label>
      {newPrice !== "" && (
        <ButtonActions type="button" onClick={handleUpdate}>
          Cambiar precio
        </ButtonActions>
      )}
    </>
  );
};

export default UpdatePriceDivision;
