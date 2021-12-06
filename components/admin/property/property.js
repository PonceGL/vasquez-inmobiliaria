import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";

// Componenst
import Modal from "../modal/modal";

// Styled Components
import {
  Container,
  LinkHouse,
  ImageContainer,
  InfoContainer,
  ButtonsContainer,
  ButtonActions,
  LinkActions,
  TextModal,
} from "../../../styles/admin/property/style";

// Formater para el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Property = ({
  _id,
  title,
  price,
  address,
  mainPhotography,
  typeOfTransaction,
  showOnweb,
  sold,

  changesHouses,
  setchangesHouses,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valueToChange, setValueToChange] = useState({});

  const handleUpdateData = async () => {
    const { data } = await Axios.post(`/api/update-property`, {
      id: _id,
      set: valueToChange,
    });

    if (data.status) {
      setchangesHouses(!changesHouses);
      setModalIsOpen(false);
    }
  };

  const handleUpdate = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    handleUpdateData();
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
          Esta acción no elimina esta propiedad, pero cambia su visibilidad en
          la web
        </TextModal>
        <TextModal>
          <span>{title}</span>
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar su visibilidad?</TextModal>
      </Modal>
      <Container>
        <ImageContainer>
          <Image
            loader={loader}
            src={mainPhotography.url}
            alt={`Fotografía principal de ${title}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          />
        </ImageContainer>
        <InfoContainer>
          <LinkHouse
            href={`/detalles/casa/${_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </LinkHouse>
          <p>
            <span>{typeOfTransaction}</span>
          </p>
          <p>
            Precio: <span>${formatter.format(price)}</span>
          </p>
          <ButtonsContainer>
            <ButtonActions
              type="button"
              onClick={() => {
                setValueToChange({ sold: !sold });
                handleUpdate();
              }}
            >
              {sold ? `Marcar disponible` : `Marcar como vendida`}
            </ButtonActions>
            <ButtonActions
              type="button"
              onClick={() => {
                setValueToChange({ showOnweb: !showOnweb });
                handleUpdate();
              }}
            >
              {showOnweb ? `Ocultar` : `Mostrar en web`}
            </ButtonActions>
            <LinkActions
              href={`/detalles/casa/${_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar
            </LinkActions>
            <Link href={`/admin/edit-property/${_id}`}>
              <LinkActions>Editar</LinkActions>
            </Link>
          </ButtonsContainer>
        </InfoContainer>
      </Container>
    </>
  );
};

export default Property;

// edit-property

// address,
// age,
// bathrooms,
// bottomMeasurement,
// constructionSize,
// description,
// frontMeasurement,
// levelsConstructed,
// location,
// mainPhotography,
// morePictures,
// parking,
// preservation,
// price,
// rooms,
// services,
// showOnweb,
// sold,
// subdivision,
// terrainSize,
// title,
// typeOfProperty,
// typeOfTransaction,
// _id,
