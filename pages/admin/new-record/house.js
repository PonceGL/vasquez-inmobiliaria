import React, { useRef, useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { deleteImagesIfYouCloseTab } from "../../../utils/deleteImagesIfYouCloseTab";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

// Utils
import { newEntry } from "../../../utils/newEntry";

// Components
import AdminSection from "../../../components/admin/adminSection/AdminSection";
import Aside from "../../../components/admin/aside/Aside";

import FieldsetHose from "../../../components/admin/fieldsetHose/FieldsetHose";
import UploadPhotosComponent from "../../../components/admin/uploadPhotosComponent/UploadPhotosComponent";
import NewTypeOfProperty from "../../../components/admin/newTypeOfProperty/newTypeOfProperty";
import RemoveTypeOfProperty from "../../../components/admin/removeTypeOfProperty/removeTypeOfProperty";
import SelectLocationOnMap from "../../../components/admin/selectLocationOnMap/selectLocationOnMap";
import Services from "../../../components/admin/services/Services";
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
  FormStyled,
  Fieldset,
  Legend,
  Label,
  Name,
  LabelLocation,
  Select,
  InputName,
  ButtonLocation,
  InputNumber,
  CounterText,
  FieldsetDescription,
  Description,
  InputTextarea,
  CounterTextarea,
  FieldsetPhotosStyled,
  ButtonSumit,
} from "../../../styles/admin/new-record";

const House = () => {
  const AuthUser = useAuthUser();
  const [expand, setExpand] = useState(false);
  const form = useRef(null);
  const typeOfPropertyRef = useRef(null);
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [typeOfPropertyValue, setTypeOfPropertyValue] = useState("casa");
  const [amenities, setAmenities] = useState([""]);
  const [isOpenModalNew, setIsOpenModalNew] = useState(false);
  const [isOpenModalRemove, setIsOpenModalRemove] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [typesOfProperties, setTypesOfProperties] = useState([]);
  const [listOfSubdivisions, setListOfSubdivisions] = useState([]);
  const [latitudeInput, setLatitudeInput] = useState("19.504253");
  const [longitudeInput, setLongitudeInput] = useState("-96.848917");
  const [registered, setRegistered] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activateSubmit, setActivateSubmit] = useState(false);

  // Preview Images
  const [urlmainPhotography, setUrlmainPhotography] = useState(null);
  const [morePictures, setMorePictures] = useState([]);

  // Enviar el formulario de casa
  const handleSubmit = (e) => {
    e.preventDefault();

    const newHouse = new FormData(form.current);
    const house = {
      typeOfProperty: newHouse.get("typeOfProperty"),

      title: newHouse.get("title"),
      price: parseInt(newHouse.get("price")),
      currency: newHouse.get("currency"),
      pricem2: parseInt(newHouse.get("pricem2")) || 0,

      typeOfTransaction: newHouse.get("typeOfTransaction"),
      address: newHouse.get("address"),

      location: {
        lat: latitudeInput,
        lng: longitudeInput,
      },

      terrainSize: parseInt(newHouse.get("terrainSize")) || 0,
      constructionSize: parseInt(newHouse.get("constructionSize")) || 0,

      subdivision: newHouse.get("subdivision"),

      description: newHouse.get("description"),

      mainPhotography: morePictures.filter(
        (item) => item.public_id === urlmainPhotography.public_id
      )[0],
      morePictures: morePictures.filter(
        (item) => item.public_id !== urlmainPhotography.public_id
      ),

      services: amenities.filter((item) => item !== ""),

      sold: false,
      showOnweb: true,
      registrationDate: new Date(),
    };

    if (typeOfPropertyValue === "casa") {
      house.rooms = parseInt(newHouse.get("rooms")) || 0;
      house.bathrooms = parseInt(newHouse.get("bathrooms")) || 0;
      house.parking = parseInt(newHouse.get("parking")) || 0;

      house.frontMeasurement = parseInt(newHouse.get("frontMeasurement")) || 0;
      house.bottomMeasurement =
        parseInt(newHouse.get("bottomMeasurement")) || 0;
      house.preservation = newHouse.get("preservation");
      house.levelsConstructed =
        parseInt(newHouse.get("levelsConstructed")) || 0;
      house.age = parseInt(newHouse.get("age")) || 0;
    }

    setSaving(true);
    newEntry(house, setRegistered, "/api/new-houses");

    // console.log(house);
  };

  // Maneja el vento de cambio de tipo de propiedad
  const handleTypeOfProperty = (value) => {
    setTypeOfPropertyValue(value);
  };

  useEffect(async () => {
    const types = await fetch(`/api/typesOfRealEstate`);
    const { data } = await types.json();
    setTypesOfProperties(data);
  }, [isOpenModalNew, isOpenModalRemove]);

  useEffect(async () => {
    const subdivisions = await fetch(`/api/subdivisions`);
    const { data } = await subdivisions.json();
    setListOfSubdivisions(data);
  }, []);

  useEffect(() => {
    typeOfPropertyValue === "otro"
      ? setIsOpenModalNew(true)
      : setIsOpenModalNew(false);

    typeOfPropertyValue === "modify"
      ? setIsOpenModalRemove(true)
      : setIsOpenModalRemove(false);
  }, [typeOfPropertyValue]);

  const handleCloseMap = () => {
    setIsOpenMap(!isOpenMap);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onbeforeunload = () => {
        if (!registered) {
          deleteImagesIfYouCloseTab(morePictures);
        }
      };
    }
  }, [registered, morePictures]);

  useEffect(() => {
    if (
      propertyName !== "" &&
      propertyDescription !== "" &&
      urlmainPhotography !== null &&
      latitudeInput !== "19.504253" &&
      longitudeInput !== "-96.848917"
    ) {
      setActivateSubmit(true);
    } else {
      setActivateSubmit(false);
    }
  }, [
    propertyName,
    propertyDescription,
    urlmainPhotography,
    latitudeInput,
    longitudeInput,
  ]);

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
                <Label htmlFor="typeOfProperty">
                  Tipo de inmueble
                  <Select
                    id="typeOfProperty"
                    name="typeOfProperty"
                    defaultValue="Casa"
                    ref={typeOfPropertyRef}
                    onChange={(e) => handleTypeOfProperty(e.target.value)}
                  >
                    {typesOfProperties.map((type) => (
                      <option key={type._id} value={type.value.toLowerCase()}>
                        {type.value}
                      </option>
                    ))}
                    {typesOfProperties.length > 0 && (
                      <option value="Otro">Otro</option>
                    )}
                    {typesOfProperties.length > 0 && (
                      <option value="modify">--Editar lista--</option>
                    )}
                  </Select>
                </Label>

                <Name htmlFor="title">
                  Nombre de la propiedad
                  <InputName
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Nombre (Máximo 60 caracteres)"
                    maxLength="60"
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

                <Label htmlFor="price">
                  {typeOfPropertyValue === "casa" ||
                  typeOfPropertyValue === "departamento"
                    ? `Precio`
                    : `Precio de la propiedad`}
                  <InputNumber
                    type="number"
                    id="price"
                    name="price"
                    inputMode="numeric"
                    placeholder="Precio"
                    required
                  />
                </Label>

                <Label htmlFor="typeOfTransaction">
                  ¿Propiedad para?
                  <Select
                    id="typeOfTransaction"
                    name="typeOfTransaction"
                    defaultValue="sale"
                  >
                    <option value="Venta">Venta</option>
                    <option value="Renta">Renta</option>
                    <option value="Venta y Renta">Venta y Renta</option>
                  </Select>
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
              <FieldsetDescription
                house={
                  (typeOfPropertyValue === "casa" ||
                    typeOfPropertyValue === "departamento") &&
                  true
                }
              >
                <Legend>Descripción de la propiedad</Legend>
                <Label htmlFor="terrainSize">
                  Tamaño del terreno
                  <InputNumber
                    type="number"
                    id="terrainSize"
                    name="terrainSize"
                    placeholder="m²"
                  />
                </Label>
                <Label htmlFor="constructionSize">
                  Área construida
                  <InputNumber
                    type="number"
                    id="constructionSize"
                    name="constructionSize"
                    placeholder="m²"
                  />
                </Label>

                {typeOfPropertyValue === "casa" ||
                typeOfPropertyValue === "departamento" ? (
                  <>
                    <Label htmlFor="rooms">
                      Habitaciones
                      <InputNumber
                        type="number"
                        id="rooms"
                        name="rooms"
                        placeholder="3"
                      />
                    </Label>
                    <Label htmlFor="bathrooms">
                      Baños
                      <InputNumber
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        placeholder="1"
                      />
                    </Label>
                    <Label htmlFor="parking">
                      Estacionamientos
                      <InputNumber
                        type="number"
                        id="parking"
                        name="parking"
                        placeholder="1"
                      />
                    </Label>
                  </>
                ) : (
                  <>
                    <Label htmlFor="price">
                      Precio por metro cuadrado
                      <InputNumber
                        type="number"
                        id="price"
                        name="pricem2"
                        inputMode="numeric"
                        placeholder="Precio por metro cuadrado"
                        required
                      />
                    </Label>
                    <Services
                      amenities={amenities}
                      setAmenities={setAmenities}
                    />
                  </>
                )}
                <Label htmlFor="subdivision">
                  Fraccionamiento
                  <Select id="subdivision" name="subdivision" defaultValue="">
                    {listOfSubdivisions.map((type) => (
                      <option key={type._id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                    <option value={"Otro"}>Otro</option>
                  </Select>
                </Label>
              </FieldsetDescription>
              {(typeOfPropertyValue === "casa" ||
                typeOfPropertyValue === "departamento") && (
                <FieldsetHose
                  amenities={amenities}
                  setAmenities={setAmenities}
                />
              )}
              <Description
                house={
                  (typeOfPropertyValue === "casa" ||
                    typeOfPropertyValue === "departamento") &&
                  true
                }
              >
                <Legend>Descripción</Legend>
                <InputTextarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descripción (Para el posicionamiento en buscadores solo se usarán los primeros 156 caracteres)"
                  onChange={(e) => setPropertyDescription(e.target.value)}
                  required
                />
                {propertyDescription !== "" && (
                  <CounterTextarea length={propertyDescription.length}>
                    {propertyDescription.length}
                  </CounterTextarea>
                )}
              </Description>
              <FieldsetPhotosStyled
                empty={morePictures.length === 0 ? true : false}
              >
                <Legend>Fotografías</Legend>
                <UploadPhotosComponent
                  morePictures={morePictures}
                  setMorePictures={setMorePictures}
                  mainPhotography={urlmainPhotography}
                  updateMainPhotography={setUrlmainPhotography}
                />
              </FieldsetPhotosStyled>

              <ButtonSumit type="submit" disabled={!activateSubmit}>
                Registrar la propiedad
              </ButtonSumit>
              {!activateSubmit && (
                <p>
                  Necesario: Nombre de la propiedad - Ubicación - Descripción -
                  Fotografía principal
                </p>
              )}
            </FormStyled>
          </MainStyled>

          <NewTypeOfProperty
            isOpen={isOpenModalNew}
            handleClose={setIsOpenModalNew}
          />
          <RemoveTypeOfProperty
            when={typesOfProperties}
            isOpen={isOpenModalRemove}
            handleClose={setIsOpenModalRemove}
          />
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
})(House);
