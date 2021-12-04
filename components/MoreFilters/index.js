import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import { PropertiesIcon } from "../IconsSVG/PropertiesIcon";
import { TerrenosIcon } from "../IconsSVG/TerrenosIcon";

// Data
// const othres = ["Recámaras", "Baños", "Estacionamiento"];

// Styled-Components
import {
  Container,
  CloseButton,
  TypeContainer,
  TypeWithIcon,
  MoreType,
  Type,
  PriceContainer,
  Price,
  TerrainContainer,
  OtherContainer,
  Other,
  OtherButtons,
  CounterButton,
  CounterButtonMore,
  OtherDisplay,
  LastSection,
  ClearButton,
  ApplyButton,
} from "./style";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// casa
// departamento
// terreno

// /busqueda?subdivision=La-Molienda,Ojo-De-Agua&type=${typeOfProperty}&minp=${minPrice}&maxp=${maxPrice}&minsize=${minArea}&maxsize=${maxArea}&rooms=0&bathrooms=0&parking=0
// "La Molienda", "Ojo De Agua", "Otro", null
// 'casa', 'departamento', 'terreno'

const MoreFilters = ({
  openFilters,
  setOpenFilters,
  typeOfPropertys,
  subdivisions,
}) => {
  const router = useRouter();
  const [typeOfProperty, setTypeOfProperty] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [parking, setParking] = useState(0);

  const handleRedirect = () => {
    const rute = `/busqueda?subdivision=${subdivisions},Otro,null&type=${typeOfProperty}&minp=${
      minPrice || 0
    }&maxp=${maxPrice || 999999999}&minsize=${minArea || 0}&maxsize=${
      maxArea || 999999999
    }&rooms=${rooms}&bathrooms=${bathrooms}&parking=${parking}`;

    if (typeOfProperty === "") {
      alert("Selecciona al menos un tipo de inmueble");
    } else {
      router.push(rute);
    }
  };

  const handleClear = () => {
    setTypeOfProperty("");

    setMinPrice("");
    setMaxPrice("");

    setMinArea("");
    setMaxArea("");

    setRooms(0);
    setBathrooms(0);
    setParking(0);
    router.push("/casas");
  };

  return (
    <Container open={openFilters}>
      <CloseButton onClick={() => setOpenFilters(!openFilters)} />
      <TypeContainer>
        <h4>Tipo de inmueble</h4>
        <TypeWithIcon
          type="button"
          select={typeOfProperty === "casa" ? true : false}
          onClick={() => setTypeOfProperty("casa")}
        >
          <PropertiesIcon />
          <p>Casas</p>
        </TypeWithIcon>
        <TypeWithIcon
          type="button"
          select={typeOfProperty === "terreno" ? true : false}
          onClick={() => setTypeOfProperty("terreno")}
        >
          <TerrenosIcon />
          <p>Terrenos</p>
        </TypeWithIcon>
        {typeOfPropertys.length > 0 && (
          <MoreType>
            {typeOfPropertys.map((item) => (
              <Type
                key={item}
                type="button"
                select={typeOfProperty === item ? true : false}
                onClick={() => setTypeOfProperty(item)}
              >
                {item}
              </Type>
            ))}
          </MoreType>
        )}
      </TypeContainer>

      <PriceContainer>
        <h4>Precio</h4>
        <Price>
          <input
            type="text"
            name="minPrice"
            placeholder={`$${formatter.format("450000")}`}
            maxLength="10"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value.replace(/\D/g, "").trim())
            }
          />
          <p>Precio mínimo</p>
        </Price>
        <Price>
          <input
            type="text"
            name="maxPrice"
            placeholder={`$${formatter.format("4500500")}`}
            maxLength="10"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value.replace(/\D/g, "").trim())
            }
          />
          <p>Precio máximo</p>
        </Price>
      </PriceContainer>

      <TerrainContainer>
        <h4>Área</h4>
        <Price>
          <input
            type="text"
            name="minPrice"
            placeholder="80 m²"
            maxLength="10"
            value={minArea}
            onChange={(e) =>
              setMinArea(e.target.value.replace(/\D/g, "").trim())
            }
          />
          <p>Mínimo 10 m²</p>
        </Price>
        <Price>
          <input
            type="text"
            name="minPrice"
            placeholder="500 m²"
            maxLength="10"
            value={maxArea}
            onChange={(e) =>
              setMaxArea(e.target.value.replace(/\D/g, "").trim())
            }
          />
          <p>Máximo 100000 m²</p>
        </Price>
      </TerrainContainer>

      <OtherContainer hide={typeOfProperty === "terreno" ? true : false}>
        {typeOfProperty !== "terreno" && (
          <>
            <Other>
              <OtherButtons>
                <CounterButton
                  type="button"
                  onClick={() => {
                    if (rooms > 0) {
                      setRooms(rooms - 1);
                    }
                  }}
                />
                <OtherDisplay>{rooms}</OtherDisplay>
                <CounterButtonMore
                  type="button"
                  onClick={() => {
                    if (rooms < 10) {
                      setRooms(rooms + 1);
                    }
                  }}
                />
              </OtherButtons>
              <p>Recámaras</p>
            </Other>

            <Other>
              <OtherButtons>
                <CounterButton
                  type="button"
                  onClick={() => {
                    if (bathrooms > 0) {
                      setBathrooms(bathrooms - 1);
                    }
                  }}
                />
                <OtherDisplay>{bathrooms}</OtherDisplay>
                <CounterButtonMore
                  type="button"
                  onClick={() => {
                    if (bathrooms < 10) {
                      setBathrooms(bathrooms + 1);
                    }
                  }}
                />
              </OtherButtons>
              <p>Baños</p>
            </Other>

            <Other>
              <OtherButtons>
                <CounterButton
                  type="button"
                  onClick={() => {
                    if (parking > 0) {
                      setParking(parking - 1);
                    }
                  }}
                />
                <OtherDisplay>{parking}</OtherDisplay>
                <CounterButtonMore
                  type="button"
                  onClick={() => {
                    if (parking < 10) {
                      setParking(parking + 1);
                    }
                  }}
                />
              </OtherButtons>
              <p>Estacionamiento</p>
            </Other>
          </>
        )}
      </OtherContainer>

      <LastSection>
        <ClearButton type="button" onClick={handleClear}>
          Limpiar
        </ClearButton>
        <ApplyButton type="button" onClick={handleRedirect}>
          Aplicar
        </ApplyButton>
      </LastSection>
    </Container>
  );
};

export default MoreFilters;
