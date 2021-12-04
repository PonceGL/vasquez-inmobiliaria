import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { deleteImagesIfYouCloseTab } from "../../../utils/deleteImagesIfYouCloseTab";
import { uploadWidget } from "../../../utils/uploadWidget";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Utils
import { newEntry } from "../../../utils/newEntry";

// Components
import AdminSection from "../../../components/admin/adminSection/AdminSection";
import Aside from "../../../components/admin/aside/Aside";

import UploadPhotosComponent from "../../../components/admin/uploadPhotosComponent/UploadPhotosComponent";
import SelectLocationOnMap from "../../../components/admin/selectLocationOnMap/selectLocationOnMap";
import SuccesAlert from "../../../components/admin/succesAlert/SuccesAlert";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../../styles/admin/AdminInicio";
import {
  Fieldset,
  FieldsetDescription,
  Description,
} from "../../../styles/admin/subdivision";

import {
  FormStyled,
  Legend,
  Label,
  Name,
  InputName,
  ButtonLocation,
  InputNumber,
  CounterText,
  InputTextarea,
  CounterTextarea,
  FieldsetLogoStyled,
  ButtonSumit,
  IdentityButton,
  IdentityButtonMoreImages,
  ImageContainer,
  CoverContainer,
  MoreImagesContainer,
} from "../../../styles/admin/new-record";

const Subdivision = () => {
  const AuthUser = useAuthUser();
  const [expand, setExpand] = useState(false);
  const form = useRef(null);
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [latitudeInput, setLatitudeInput] = useState("19.504253");
  const [longitudeInput, setLongitudeInput] = useState("-96.848917");
  const [registered, setRegistered] = useState(false);

  // Preview Images
  const [urlmainPhotography, setUrlmainPhotography] = useState(null);
  const [imageLogo, setImageLogo] = useState([]);
  const [cover, setCover] = useState([]);
  const [morePictures, setMorePictures] = useState([]);

  // Enviar el formulario de casa
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSubdivision = new FormData(form.current);
    const subdivision = {
      name: newSubdivision.get("title"),
      slogan: newSubdivision.get("slogan"),
      pricem2: newSubdivision.get("price"),
      address: newSubdivision.get("address"),
      location: {
        lat: latitudeInput,
        lng: longitudeInput,
      },
      description: newSubdivision.get("description"),
      moreInformation: newSubdivision.get("moreInformation"),

      logo: imageLogo[0],
      cover: cover[0],

      morePictures: morePictures,

      showOnweb: true,
      registrationDate: new Date(),
    };

    newEntry(subdivision, setRegistered, "/api/new-subdivisions");
  };

  const handleCloseMap = () => {
    setIsOpenMap(!isOpenMap);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onbeforeunload = () => {
        if (!registered) {
          deleteImagesIfYouCloseTab(imageLogo);
          deleteImagesIfYouCloseTab(cover);
          deleteImagesIfYouCloseTab(morePictures);
        }
      };
    }
  }, [registered, morePictures]);

  // Movile
  const [mainIsOpen, setMainIsOpen] = useState(false);
  const [asideIsOpen, setAsideIsOpen] = useState(false);

  return (
    <>
      <NextSeo noindex={true} />

      <Container expand={expand}>
        <ButtonsMovileContainer>
          <ButtonStyled
            onClick={() => setMainIsOpen(!mainIsOpen)}
            isOpen={mainIsOpen}
          >
            <Line />
            <Line />
            <Line />
          </ButtonStyled>
          <ButtonStyled
            onClick={() => setAsideIsOpen(!asideIsOpen)}
            isOpen={asideIsOpen}
          >
            <Line />
            <Line />
            <Line />
          </ButtonStyled>
        </ButtonsMovileContainer>
        <AdminSection expand={expand} user={AuthUser} open={mainIsOpen} />
        <>
          <MainStyled>
            <FormStyled
              ref={form}
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <Fieldset>
                <Legend>Información principal</Legend>

                <Name htmlFor="title">
                  Nombre del fraccionamiento
                  <InputName
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Nombre (Máximo 60 caracteres)"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    required
                  />
                  {propertyName !== "" && (
                    <CounterText length={propertyName.length}>
                      {propertyName.length}
                    </CounterText>
                  )}
                </Name>

                <Name htmlFor="slogan">
                  Slogan
                  <InputName
                    type="text"
                    id="slogan"
                    name="slogan"
                    placeholder="Slogan del Fraccionameiento"
                    // required
                  />
                  {propertyName !== "" && (
                    <CounterText length={propertyName.length}>
                      {propertyName.length}
                    </CounterText>
                  )}
                </Name>

                <Label htmlFor="price">
                  Precio por m²
                  <InputNumber
                    type="number"
                    id="price"
                    name="price"
                    inputMode="numeric"
                    placeholder="Precio"
                    // required
                  />
                </Label>

                <Name htmlFor="address">
                  Dirección
                  <InputName
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Calle, número, ciudad, etc."
                    required
                  />
                </Name>
                <Name htmlFor="location">
                  Ubicación
                  <ButtonLocation type="button" onClick={handleCloseMap}>
                    {latitudeInput !== "19.504253" &&
                    longitudeInput !== "-96.848917"
                      ? `${latitudeInput}, ${longitudeInput}`
                      : "Seleccionar ubicación"}
                  </ButtonLocation>
                </Name>
              </Fieldset>
              <FieldsetDescription>
                <Legend>Descripción</Legend>
                <InputTextarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descripción, (Para el posicionamiento en buscadores solo se usarán los primeros 156 caracteres) ((Este campo es opcional, pero importante))"
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  required
                />
                {propertyDescription !== "" && (
                  <CounterTextarea length={propertyDescription.length}>
                    {propertyDescription.length}
                  </CounterTextarea>
                )}
              </FieldsetDescription>
              <Description>
                <Legend>Más Información</Legend>
                <InputTextarea
                  type="text"
                  id="moreInformation"
                  name="moreInformation"
                  placeholder="Descripción más amplia. Servicios o tipos de propiedades (Este campo es opcional)"
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  // required
                />
                {propertyDescription !== "" && (
                  <CounterTextarea length={propertyDescription.length}>
                    {propertyDescription.length}
                  </CounterTextarea>
                )}
              </Description>
              <FieldsetLogoStyled>
                <Legend>Identidad</Legend>
                {imageLogo.length > 0 ? (
                  <ImageContainer>
                    <Image
                      loader={loader}
                      src={imageLogo[0].url}
                      alt={imageLogo[0].alt}
                      width={imageLogo[0].width}
                      height={imageLogo[0].height}
                      placeholder="blur"
                      blurDataURL
                    />
                  </ImageContainer>
                ) : (
                  <IdentityButton
                    type="button"
                    onClick={() => uploadWidget(imageLogo, setImageLogo, 1)}
                  >
                    Cargar Logotipo
                  </IdentityButton>
                )}

                {cover.length > 0 ? (
                  <CoverContainer>
                    <Image
                      loader={loader}
                      src={cover[0].url}
                      alt={cover[0].alt}
                      width={cover[0].width}
                      height={cover[0].height}
                      placeholder="blur"
                      blurDataURL
                    />
                  </CoverContainer>
                ) : (
                  <IdentityButton
                    type="button"
                    onClick={() => uploadWidget(cover, setCover, 1)}
                  >
                    Cargar Portada
                  </IdentityButton>
                )}

                {morePictures.length > 0 ? (
                  <MoreImagesContainer>
                    {morePictures.map(({ url, alt, width, height }) => (
                      <ImageContainer key={url}>
                        <Image
                          loader={loader}
                          src={url}
                          alt={alt}
                          width={width}
                          height={height}
                          placeholder="blur"
                          blurDataURL
                        />
                      </ImageContainer>
                    ))}
                  </MoreImagesContainer>
                ) : (
                  <IdentityButtonMoreImages
                    type="button"
                    onClick={() =>
                      uploadWidget(morePictures, setMorePictures, 10)
                    }
                  >
                    Más fotografias
                  </IdentityButtonMoreImages>
                )}
              </FieldsetLogoStyled>

              <ButtonSumit type="submit">Registrar la propiedad</ButtonSumit>
            </FormStyled>
          </MainStyled>

          <SelectLocationOnMap
            isOpen={isOpenMap}
            latitudeInput={latitudeInput}
            setLatitudeInput={setLatitudeInput}
            longitudeInput={longitudeInput}
            setLongitudeInput={setLongitudeInput}
            handleClose={handleCloseMap}
          />
          {registered && <SuccesAlert name={propertyName} />}
        </>
        <Aside
          expand={expand}
          setExpand={setExpand}
          user={AuthUser}
          open={asideIsOpen}
        />
      </Container>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Subdivision);
