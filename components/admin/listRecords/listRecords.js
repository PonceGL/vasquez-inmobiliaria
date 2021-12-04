import { useState } from "react";
import Axios from "axios";

// Componenst
import Modal from "../modal/modal";

// styled Components
import {
  Record,
  ButtonDelete,
  TextModal,
} from "../../../styles/admin/listRecords/style";

const ListRecords = ({
  titleOficce,
  address,
  emailAddress,
  numerPhone,
  phoneNumbers,
  time,
  _id,
  handleGetData,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleDeleteData = async () => {
    const { data } = await Axios.delete(`/api/info-contact/${_id}`);
    if (data.status) {
      handleGetData();
      setModalIsOpen(false);
    }
  };

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleDeleteData();
  };

  const formatPhoneNumber = (numer) => {
    let cleaned = ("" + numer).replace(/\D/g, "");
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
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
          Esta acción eliminará por completo los datos seleccionados
        </TextModal>
        <TextModal>
          <span>{titleOficce}</span>
        </TextModal>
        <TextModal>¿Confirmas la eliminación?</TextModal>
      </Modal>
      <Record>
        <ButtonDelete type="button" onClick={() => setModalIsOpen(true)} />
        {titleOficce && <h4>{titleOficce}</h4>}
        {numerPhone && <p>{formatPhoneNumber(numerPhone)}</p>}
        {phoneNumbers && (
          <p>
            {phoneNumbers.map((phone) => (
              <span key={phone}>{formatPhoneNumber(phone)} /</span>
            ))}
          </p>
        )}
        {emailAddress && <p>{emailAddress}</p>}
        {address && <p>{address}</p>}
        {time && <p>{time}</p>}
      </Record>
    </>
  );
};

export default ListRecords;
