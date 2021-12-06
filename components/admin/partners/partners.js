import { useState } from "react";
import Image from "next/image";
import {
  updateUserInfo,
  removeVerification,
  enableUser,
  disabledUser,
} from "../../../utils/firebaseActions";

// Componenst
import Modal from "../modal/modal";

// styled Components
import {
  Container,
  ImageContainer,
  NoImage,
  Name,
  InfoContainer,
  Info,
  ButtonAction,
  TextModal,
} from "../../../styles/admin/partners/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Partners = ({
  uid,
  displayName,
  photoURL,
  email,
  phoneNumber,
  emailVerified,
  disabled,

  changePartners,
  setChangePartners,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDisable = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const handleSubmit = () => {
    disabledUser(uid, changePartners, setChangePartners);
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextModal>Esta acción negará el acceso total al usuario</TextModal>
        <TextModal>
          <span>{displayName}</span>
        </TextModal>
      </Modal>
      <Container>
        <ImageContainer>
          {photoURL ? (
            <Image
              loader={loader}
              src={photoURL}
              alt={`Fotografía de perfil de ${email}`}
              width={500}
              height={500}
            />
          ) : (
            <NoImage>
              <p>{displayName.slice(0, 1)}</p>
            </NoImage>
          )}
        </ImageContainer>
        {displayName ? <Name>{displayName}</Name> : <p>No ingresó nombre</p>}
        {email && <p>{email}</p>}
        {phoneNumber && <p>{phoneNumber}</p>}
        <InfoContainer>
          <Info ok={emailVerified}>
            {emailVerified ? `Verificado` : `No Verificado`}
          </Info>
          <Info ok={!disabled}>
            {!disabled ? `Habilitado` : `No Habilitado`}
          </Info>
        </InfoContainer>
        {emailVerified ? (
          <ButtonAction
            type="button"
            onClick={() =>
              removeVerification(uid, changePartners, setChangePartners)
            }
          >
            Retirar verificación
          </ButtonAction>
        ) : (
          <ButtonAction
            type="button"
            onClick={() =>
              updateUserInfo(uid, changePartners, setChangePartners)
            }
          >
            Verificar Usuario
          </ButtonAction>
        )}
        {!disabled ? (
          <ButtonAction
            type="button"
            onClick={() =>
              handleDisable(uid, changePartners, setChangePartners)
            }
          >
            Deshabilitar Usuario
          </ButtonAction>
        ) : (
          <ButtonAction
            type="button"
            onClick={() => enableUser(uid, changePartners, setChangePartners)}
          >
            Habilitar Usuario
          </ButtonAction>
        )}
      </Container>
    </>
  );
};

export default Partners;
