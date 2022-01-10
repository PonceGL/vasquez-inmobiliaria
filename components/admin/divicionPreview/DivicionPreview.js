import { useState } from "react";
import Image from "next/image";
import Axios from "axios";

//Components
import UpdateLogoDivision from "../updateLogoDivision";
import UpdateCoverDivision from "../updateCoverDivision";
import UpdateImagesDivision from "../updateImagesDivision";
import UpdatePriceDivision from "../updatePriceDivision";
import Modal from "../modal/modal";
import DeleteButton from "../deleteButton-division";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled Components
import {
  Conatiner,
  Info,
  NameAndLogoContainer,
  ImageContainer,
  BlockElement,
  PhotosConatiner,
  CoverContainer,
  ButtonsContainer,
  ButtonActions,
  TextModal,
} from "../../../styles/admin/divicionPreview/style";

const DivicionPreview = ({
  address,
  cover,
  description,
  location,
  logo,
  moreInformation,
  morePictures,
  name,
  pricem2,
  registrationDate,
  showOnweb,
  slogan,
  _id,

  admin,
  changeDivision,
  setChangeDivision,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valueToChange, setValueToChange] = useState({});

  const handleUpdateData = async (house) => {
    delete house._id;
    const { data } = await Axios.post(`/api/update-division`, {
      id: _id,
      set: valueToChange,
    });

    if (data.status) {
      setChangeDivision(!changeDivision);
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
        click={handleUpdateData}
      >
        <TextModal>
          Esta acción no elimina el registro del fraccionamiento, pero cambia su
          visibilidad en la web
        </TextModal>
        <TextModal>
          <span>{name}</span>
        </TextModal>
        <TextModal>¿Confirmas que quieres cambiar su visibilidad?</TextModal>
      </Modal>
      <Conatiner>
        <Info>
          <NameAndLogoContainer>
            <h1>{name}</h1>
            <ImageContainer>
              {logo && (
                <UpdateLogoDivision
                  _id={_id}
                  name={name}
                  logo={logo}
                  changeDivision={changeDivision}
                  setChangeDivision={setChangeDivision}
                />
              )}
            </ImageContainer>
          </NameAndLogoContainer>
          {slogan && (
            <BlockElement>
              <p>{slogan}</p>
            </BlockElement>
          )}
          {pricem2 && (
            <BlockElement>
              <p>
                Precio por m²: <span>${formatter.format(pricem2)}</span>
              </p>
              <p>{showOnweb ? `Se muestra en Web` : `No se muestra en Web`}</p>
            </BlockElement>
          )}
          {address && (
            <BlockElement>
              <p>{address}</p>
            </BlockElement>
          )}
          {description && (
            <BlockElement>
              <p>{description}</p>
            </BlockElement>
          )}
          {moreInformation && (
            <BlockElement>
              <p>{moreInformation}</p>
            </BlockElement>
          )}
        </Info>
        <PhotosConatiner>
          {cover && (
            <UpdateCoverDivision
              _id={_id}
              name={name}
              cover={cover}
              // changesHouses={changesHouses}
              // setchangesHouses={setchangesHouses}
              changeDivision={changeDivision}
              setChangeDivision={setChangeDivision}
            />
          )}
          <UpdateImagesDivision
            _id={_id}
            title={name}
            cover={cover}
            morePictures={morePictures}
            changeDivision={changeDivision}
            setChangeDivision={setChangeDivision}
          />
          <ButtonsContainer>
            <ButtonActions
              type="button"
              onClick={() => {
                setValueToChange({ showOnweb: !showOnweb });
                handleUpdate();
              }}
            >
              {showOnweb ? `Ocultar en web` : `Mostrar en web`}
            </ButtonActions>

            <UpdatePriceDivision
              _id={_id}
              name={name}
              pricem2={pricem2}
              changeDivision={changeDivision}
              setChangeDivision={setChangeDivision}
            />
            {admin && (
              <DeleteButton
                _id={_id}
                name={name}
                images={morePictures.concat(logo).concat(cover)}
              />
            )}
          </ButtonsContainer>
        </PhotosConatiner>
      </Conatiner>
    </>
  );
};

export default DivicionPreview;
