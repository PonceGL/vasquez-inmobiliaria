import { useState } from "react";
import Axios from "axios";
import Link from "next/link";

// Componenst
import UpdateMainImage from "../updateMainImage";
import UpdatePrice from "../updatePrice";
import UpdateName from "../updateName";
import UpdateTypeOfTransaction from "../updateTypeOfTransaction";
import UploadMoreImages from "../uploadMoreImages";
import Modal from "../modal/modal";
import DeleteButton from "../deleteButton";

// Formater para el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Styled-Components
import {
  Conatiner,
  Info,
  ServicesConatiner,
  PhotosConatiner,
  ButtonsContainer,
  ButtonActions,
  LinkActions,
  TextModal,
} from "../../../styles/admin/propertyPreview/style";

const PropertyPreview = ({
  address,
  age,
  bathrooms,
  bottomMeasurement,
  constructionSize,
  description,
  frontMeasurement,
  levelsConstructed,
  location,
  mainPhotography,
  morePictures,
  parking,
  preservation,
  price,
  rooms,
  services,
  showOnweb,
  sold,
  subdivision,
  terrainSize,
  title,
  typeOfProperty,
  typeOfTransaction,
  _id,

  admin,
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
      <h1>{title}</h1>
      <Conatiner>
        <Info>
          <h3>{title}</h3>
          <p>{address}</p>
          <p>Tipo de propiedad: {typeOfProperty}</p>
          <p>Propiedad para: {typeOfTransaction}</p>
          <p>
            Precio: <span>${formatter.format(price)}</span>
          </p>
          <p>Fraccionamiento: {subdivision}</p>
          <p>Habitaciones: {rooms}</p>
          <p>Baños: {bathrooms}</p>
          <p>Descripcion: {description}</p>
          <p>Edad: {age}</p>
          <p>Estado de conservación: {preservation}</p>
          <p>Estacionaminetos: {parking}</p>

          <p>Tamaño del terreno: {terrainSize}</p>
          <p>Tamaño de la construcción: {constructionSize}</p>
          <p>Niveles construidos: {levelsConstructed}</p>
          <p>Medida de frente: {frontMeasurement}</p>
          <p>Medida de fondo: {bottomMeasurement}</p>
          <ServicesConatiner>
            {services.map((service) => (
              <p key={service}>{service} |</p>
            ))}
          </ServicesConatiner>
        </Info>
        <PhotosConatiner>
          {mainPhotography && (
            <UpdateMainImage
              _id={_id}
              title={title}
              mainPhotography={mainPhotography}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
          )}
          {morePictures && (
            <UploadMoreImages
              _id={_id}
              title={title}
              morePictures={morePictures}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
          )}
          <ButtonsContainer>
            <ButtonActions
              type="button"
              onClick={() => {
                setValueToChange({ sold: !sold });
                handleUpdate();
              }}
            >
              {sold ? `Marcar como disponible` : `Marcar como vendida`}
            </ButtonActions>
            <ButtonActions
              type="button"
              onClick={() => {
                setValueToChange({ showOnweb: !showOnweb });
                handleUpdate();
              }}
            >
              {showOnweb ? `Ocultar en web` : `Mostrar en web`}
            </ButtonActions>
            <Link href={`/admin/edit-property/full/${_id}`}>
              <LinkActions>Editar mas información</LinkActions>
            </Link>
            <UpdatePrice
              _id={_id}
              title={title}
              price={price}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
            <UpdateName
              _id={_id}
              title={title}
              price={price}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
            <UpdateTypeOfTransaction
              _id={_id}
              title={title}
              typeOfTransaction={typeOfTransaction}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
            {admin && (
              <DeleteButton
                _id={_id}
                title={title}
                images={morePictures.concat(mainPhotography)}
              />
            )}
          </ButtonsContainer>
        </PhotosConatiner>
      </Conatiner>
    </>
  );
};

export default PropertyPreview;
