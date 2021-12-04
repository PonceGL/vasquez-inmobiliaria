import { useState, useEffect } from "react";
import Axios from "axios";
import Image from "next/image";
import { uploadWidget } from "../../../utils/uploadWidget";
import { deleteImagesIfYouCloseTab } from "../../../utils/deleteImagesIfYouCloseTab";

// Componenst
import Modal from "../modal/modal";

// Styled-Components
import {
  TextModal,
  Conatiner,
  ImageContainer,
  ButtonActions,
} from "../../../styles/admin/updateMainImage/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const UpdateMainImage = ({
  _id,
  title,
  mainPhotography,
  changesHouses,
  setchangesHouses,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newImage, setNewImage] = useState([]);

  // Escribe en la base de datos la nueva imagen
  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-property`, {
      id: _id,
      set: { mainPhotography: newImage[0] },
    });

    if (data.status) {
      setchangesHouses(!changesHouses);
      setModalIsOpen(false);
    }
  };

  const handleUpdate = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  // Despliega wl Widget de Cloudinary
  const uploadFile = () => {
    deleteImagesIfYouCloseTab([mainPhotography]);
    setModalIsOpen(false);
    uploadWidget(newImage, setNewImage);
  };

  // Detacta al cambio de imagen desde cloudinary y ejecuta la funcion para escribir en la base de datos
  useEffect(() => {
    if (newImage.length > 0) {
      handleUpdateData();
    }
  }, [newImage]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={uploadFile}
      >
        <TextModal>Esta acción eliminará la imagen actual de</TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>(esto es irreversible)</TextModal>
        <TextModal>¿Confirmas que quieres cambiar la imagen?</TextModal>
      </Modal>
      <Conatiner>
        <ImageContainer>
          <Image
            loader={loader}
            src={mainPhotography.url}
            alt={`Fotografía principal de ${title}`}
            width={mainPhotography.width}
            height={mainPhotography.height}
            placeholder="blur"
            blurDataURL
          />
        </ImageContainer>
        <ButtonActions type="button" onClick={() => handleUpdate()}>
          Cambiar imagen
        </ButtonActions>
      </Conatiner>
    </>
  );
};

export default UpdateMainImage;
