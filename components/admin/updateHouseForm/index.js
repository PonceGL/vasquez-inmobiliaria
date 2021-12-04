import { useRef, useState, useEffect } from "react";
import Axios from "axios";

// Components
import SelectLocationOnMap from "../selectLocationOnMap/selectLocationOnMap";
import Services from "../services/Services";

// styled Components
import {
  FormStyled,
  Fieldset,
  Legend,
  Label,
  Name,
  Select,
  InputName,
  ButtonLocation,
  InputNumber,
  CounterText,
  FieldsetDescription,
  Description,
  InputTextarea,
  CounterTextarea,
  ButtonSumit,
} from "../../../styles/admin/new-record";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const UpdateHouseForm = ({
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

  form,
  handleSubmit,
}) => {
  const [typesOfProperties, setTypesOfProperties] = useState([]);
  const [listOfSubdivisions, setListOfSubdivisions] = useState([]);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [latitudeInput, setLatitudeInput] = useState(location.lat);
  const [longitudeInput, setLongitudeInput] = useState(location.lng);
  const [amenities, setAmenities] = useState(services.concat([""]));
  //Form
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get(`/api/typesOfRealEstate`);
      setTypesOfProperties(data.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get(`/api/subdivisions`);
      setListOfSubdivisions(data.data);
    };
    getData();
  }, []);

  const handleCloseMap = () => {
    setIsOpenMap(!isOpenMap);
  };

  return (
    <>
      <FormStyled ref={form} onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>Actualizar Información</Legend>
          <Label htmlFor="typeOfProperty">
            Tipo de inmueble
            <Select
              id="typeOfProperty"
              name="typeOfProperty"
              defaultValue={typeOfProperty}
            >
              {typesOfProperties.map((type) => (
                <option key={type._id} value={type.value.toLowerCase()}>
                  {type.value}
                </option>
              ))}
            </Select>
          </Label>

          <Label htmlFor="price">
            Precio
            <InputNumber
              type="number"
              id="price"
              name="price"
              inputMode="numeric"
              placeholder={`$${formatter.format(price)}`}
            />
          </Label>

          <Name htmlFor="title">
            Nombre de la propiedad
            <InputName
              type="text"
              id="title"
              name="title"
              placeholder={title}
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
            {propertyName !== "" && (
              <CounterText length={propertyName.length}>
                {propertyName.length}
              </CounterText>
            )}
          </Name>

          <Label htmlFor="typeOfTransaction">
            ¿Propiedad para?
            <Select
              id="typeOfTransaction"
              name="typeOfTransaction"
              defaultValue={typeOfTransaction}
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
              placeholder={address}
            />
          </Name>

          <Name htmlFor="location">
            Ubicación
            <ButtonLocation type="button" onClick={handleCloseMap}>
              {latitudeInput !== "19.504253" && longitudeInput !== "-96.848917"
                ? `${latitudeInput}, ${longitudeInput}`
                : "Seleccionar ubicación"}
            </ButtonLocation>
          </Name>
          <input type="hidden" name="lat" value={latitudeInput} />
          <input type="hidden" name="lng" value={longitudeInput} />
        </Fieldset>
        <FieldsetDescription>
          <Legend>Descripción de la propiedad</Legend>
          <Label htmlFor="terrainSize">
            Tamaño del terreno
            <InputNumber
              type="number"
              id="terrainSize"
              name="terrainSize"
              placeholder={terrainSize}
            />
          </Label>
          <Label htmlFor="constructionSize">
            Área construida
            <InputNumber
              type="number"
              id="constructionSize"
              name="constructionSize"
              placeholder={constructionSize}
            />
          </Label>
          <Label htmlFor="rooms">
            Habitaciones
            <InputNumber
              type="number"
              id="rooms"
              name="rooms"
              placeholder={rooms}
            />
          </Label>
          <Label htmlFor="bathrooms">
            Baños
            <InputNumber
              type="number"
              id="bathrooms"
              name="bathrooms"
              placeholder={bathrooms}
            />
          </Label>
          <Label htmlFor="parking">
            Estacionamientos
            <InputNumber
              type="number"
              id="parking"
              name="parking"
              placeholder={parking}
            />
          </Label>
          <Label htmlFor="subdivision">
            Fraccionamiento
            <Select
              id="subdivision"
              name="subdivision"
              defaultValue={subdivision}
            >
              <option value="Otro">Otro</option>
              {listOfSubdivisions.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </Select>
          </Label>
        </FieldsetDescription>
        <Description>
          <Legend>Servicios</Legend>
          <Services amenities={amenities} setAmenities={setAmenities} />
          <input
            type="hidden"
            name="services"
            value={amenities.filter((item) => item !== "")}
          />
        </Description>
        <Description>
          <Legend>Descripción</Legend>
          <InputTextarea
            type="text"
            id="description"
            name="description"
            placeholder={description}
            onChange={(e) => setPropertyDescription(e.target.value)}
          />
          {propertyDescription !== "" && (
            <CounterTextarea length={propertyDescription.length}>
              {propertyDescription.length}
            </CounterTextarea>
          )}
        </Description>

        <ButtonSumit type="submit">Actualizar propiedad</ButtonSumit>
      </FormStyled>
      <SelectLocationOnMap
        isOpen={isOpenMap}
        latitudeInput={latitudeInput}
        setLatitudeInput={setLatitudeInput}
        longitudeInput={longitudeInput}
        setLongitudeInput={setLongitudeInput}
        handleClose={handleCloseMap}
      />
    </>
  );
};

export default UpdateHouseForm;
