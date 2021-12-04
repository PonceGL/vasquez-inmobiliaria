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

const UpdatePrice = ({
  _id,
  title,
  price,
  changesHouses,
  setchangesHouses,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const newPriceInput = useRef(null);
  const [newPrice, setNewPrice] = useState("");

  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-property`, {
      id: _id,
      set: { price: parseInt(newPrice) },
    });

    if (data.status) {
      setchangesHouses(!changesHouses);
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
        <TextModal>Esta acción cambiará el precio de la propiedad</TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>
          De ${formatter.format(price)} A ${formatter.format(newPrice)}
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar su precio?</TextModal>
      </Modal>
      <Label>
        Cambiar precio:
        <Input
          ref={newPriceInput}
          type="tel"
          inputMode="numeric"
          id="numerPhone"
          name="numerPhone"
          placeholder="Cambiar precio"
          maxLength="10"
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

export default UpdatePrice;
