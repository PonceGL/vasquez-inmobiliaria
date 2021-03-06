import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PropertiesIcon } from "../components/IconsSVG/PropertiesIcon";
import { TerrenosIcon } from "../components/IconsSVG/TerrenosIcon";
import CustomSelect from "../components/CustomSelect";
import { Liderazgo } from "../components/IconsSVG/LiderazgoIcon";
import { Experiencia } from "../components/IconsSVG/ExperienciaIcon";
import { ServicioExcelente } from "../components/IconsSVG/Servicio-ExcelenteIcon";
import { PrecioJusto } from "../components/IconsSVG/Precio-JustoIcon";

import { Facebook } from "../components/IconsSVG/Facebook";
// import { Instagram } from "../components/IconsSVG/Instagram";
import { WhatsApp } from "../components/IconsSVG/WhatsApp";
// import { Twitter } from "../components/IconsSVG/Twitter";

// Styled-Components
import {
  Main,
  Cover,
  SoccialContainer,
  Line,
  SoccialIconsContainer,
  CoverInfo,
  CoverActions,
  ButtonsContainer,
  TypeWithIcon,
  SearchButton,
  InitSearchContainer,
  Filter,
  NewPropertiesContainer,
  HousesContainer,
  House,
  ImageContainer,
  TitleAndPriceConatiner,
  Title,
  Price,
  Address,
  We,
  WeItemsContainer,
  Item,
  IconConatiner,
  TextConatiner,
  ItemTitle,
  ItemText,
} from "../styles/inicio/style";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const HomePage = ({ subdivisions, whatsAppNumber, houses }) => {
  const [typeOfProperty, setTypeOfProperty] = useState("casa");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");

  return (
    <>
      <NextSeo
        title="Constructora e Inmobiliaria Vasquez"
        description="Constructora e Inmobiliaria Vasquez, m??s de 25 a??os de no solo hacer y vender propiedades, sino de cumplir sue??os"
        canonical=""
        name="Constructora e Inmobiliaria Vasquez"
        telephone="+522282107188"
        openGraph={{
          url: "",
          title: "Constructora e Inmobiliaria Vasquez",
          description:
            "Constructora e Inmobiliaria Vasquez, m??s de 25 a??os de no solo hacer y vender propiedades, sino de cumplir sue??os",
          images: [
            {
              url: "https://res.cloudinary.com/civsa/image/upload/v1638987890/propiedades/orrozlyzen26otnl1h3g.jpg?w=1080&q=75",
              width: 200,
              height: 200,
              alt: "Logotipo de Constructora e Inmobiliaria Vasquez",
            },
          ],
          site_name: "Constructora e Inmobiliaria Vasquez",
        }}
        twitter={{
          cardType: "summary",
        }}
        address={{
          streetAddress:
            "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, M??xico.",
          addressLocality: "Xalapa Veracruz",
          addressRegion: "MEX",
          postalCode: "91110",
          addressCountry: "MX",
        }}
        openingHours={[
          {
            opens: "08:00",
            closes: "20:30",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          },
        ]}
      />
      <Header title="Constructora e Inmobiliaria Vasquez" />

      <Main>
        <Cover>
          <SoccialContainer>
            <Line />
            <SoccialIconsContainer>
              <a
                href="https://www.facebook.com/Constructora-e-Inmobiliaria-Vasquez-117127883446986/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Facebook"
              >
                <Facebook />
              </a>
              {/* <a href="#">
                <Instagram />
              </a> */}
              {whatsAppNumber.hasOwnProperty("numerPhone") && (
                <a
                  href={`https://wa.me/52${whatsAppNumber.numerPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enlace a WhatsApp"
                >
                  <WhatsApp />
                </a>
              )}
              {/* <a href="#">
                <Twitter />
              </a> */}
            </SoccialIconsContainer>
            <Line />
          </SoccialContainer>
          <CoverInfo>
            <h2>El mejor momento para invertir en tu inmueble</h2>
            <p>??Qu?? tipo de inmueble est??s buscando?</p>
          </CoverInfo>
          <CoverActions>
            <ButtonsContainer>
              <TypeWithIcon
                type="button"
                select={typeOfProperty === "casa" ? true : false}
                onClick={() => setTypeOfProperty("casa")}
              >
                <PropertiesIcon />
                <p>Propiedades</p>
              </TypeWithIcon>
              <TypeWithIcon
                type="button"
                select={typeOfProperty === "terreno" ? true : false}
                onClick={() => setTypeOfProperty("terreno")}
              >
                <TerrenosIcon />
                <p>Terrenos</p>
              </TypeWithIcon>
            </ButtonsContainer>
            {subdivisions.length > 0 && (
              <CustomSelect
                subdivisions={subdivisions}
                setSelectedSubdivision={setSelectedSubdivision}
              />
            )}
            <Link href={`/casas`}>
              <SearchButton>Iniciar B??squeda Flexible</SearchButton>
            </Link>
          </CoverActions>
          <InitSearchContainer>
            <Link
              href={
                selectedSubdivision === ""
                  ? "/casas"
                  : `/busqueda?subdivision=${selectedSubdivision}&type=${typeOfProperty}&minp=0&maxp=999999999&minsize=0&maxsize=999999999&rooms=0&bathrooms=0&parking=0`
              }
            >
              <a>Buscar</a>
            </Link>
          </InitSearchContainer>
          <Filter />
          <img
            src="https://res.cloudinary.com/civsa/image/upload/v1638203929/brand/g4iizeszdlxuchc2fxrc.jpg"
            alt="Fotograf??a de portada"
          />
        </Cover>
        <NewPropertiesContainer>
          <h2>Nuevas propiedades</h2>
          <HousesContainer>
            {houses.length > 0 && (
              <>
                {houses.map(
                  ({ _id, address, mainPhotography, price, title }) => (
                    <House key={_id}>
                      <Link href={`/detalles/casa/${_id}`}>
                        <ImageContainer>
                          <Image
                            loader={loader}
                            src={mainPhotography.url}
                            alt={`Fotograf??a principal de ${title}`}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL
                          />
                        </ImageContainer>
                      </Link>
                      <TitleAndPriceConatiner>
                        <Title>{title}</Title>
                        <Price>${formatter.format(price)} MXN</Price>
                      </TitleAndPriceConatiner>
                      <Address>{address}</Address>
                    </House>
                  )
                )}
              </>
            )}
          </HousesContainer>
        </NewPropertiesContainer>
        <We>
          <h2>??Porqu?? confiar en nosotros?</h2>
          <WeItemsContainer id="we-items-container">
            <Item>
              <IconConatiner>
                <button type="button">
                  <Liderazgo />
                </button>
              </IconConatiner>
              <TextConatiner>
                <ItemTitle>Liderazgo</ItemTitle>
                <ItemText>
                  Mediante innovaci??n nos distinguimos en nuestros productos,
                  ofreciendo para ti la mejor calidad de propiedades en la zona,
                  con una alta plusval??a, pensamos en tu comodidad y la de los
                  tuyos.
                </ItemText>
              </TextConatiner>
            </Item>

            <Item>
              <IconConatiner>
                <button type="button">
                  <Experiencia />
                </button>
              </IconConatiner>
              <TextConatiner>
                <ItemTitle>Experiencia</ItemTitle>
                <ItemText>
                  Nos respaldan mas de 25 a??os de no solo hacer y vender
                  propiedades, sino de cumplir sue??os, que mediante la confianza
                  de nuestros m??s de 200 clientes hemos hecho posible.
                </ItemText>
              </TextConatiner>
            </Item>

            <Item>
              <IconConatiner>
                <button type="button">
                  <ServicioExcelente />
                </button>
              </IconConatiner>
              <TextConatiner>
                <ItemTitle>Servicio Excelente</ItemTitle>
                <ItemText>
                  Tenemos una propiedad a tu medida, no dudes en contactarnos,
                  la mejor atenci??n para ti en todo el proceso de compra ???
                  venta.
                </ItemText>
              </TextConatiner>
            </Item>
          </WeItemsContainer>
        </We>
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const settingsHouses = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      match: {
        showOnweb: { $eq: true },
      },
      query: {
        title: 1,
        address: 1,
        description: 1,
        mainPhotography: 1,
        price: 1,
        _id: 1,
        rooms: 1,
        bathrooms: 1,
        parking: 1,
        terrainSize: 1,
      },
      limit: 4,
    }),
  };

  const settingsSubdivisions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      match: {
        showOnweb: { $eq: true },
      },
      query: {
        name: 1,
      },
      limit: 10,
    }),
  };

  const getHouses = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/some-houses/some`,
    settingsHouses
  );
  const { data: houses } = await getHouses.json();

  const getSubdivisions = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/subdivisions/some`,
    settingsSubdivisions
  );
  const { data: subdivisions } = await getSubdivisions.json();

  const getWhatsApp = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/whatsApp-contact/all`
  );
  const { data: whatsAppNumber } = await getWhatsApp.json();

  return {
    props: {
      subdivisions,
      houses,
      whatsAppNumber: whatsAppNumber[0],
    },
    revalidate: 10,
  };
};
