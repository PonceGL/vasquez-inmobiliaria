import React, { useEffect, useState } from "react";
import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

// Components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Cama } from "../../../components/IconsSVG/CamaIcon";
import { Bathroom } from "../../../components/IconsSVG/BathroomIcon";
import { Garage } from "../../../components/IconsSVG/GarageIcon";
import { Terreno } from "../../../components/IconsSVG/TerrenoIcon";
import HouseGalery from "../../../components/HouseGalery";
import HoseMap from "../../../components/HoseMap";
import HouseFormContact from "../../../components/HouseFormContact";
import { WhatsApp } from "../../../components/IconsSVG/WhatsApp";
import Related from "../../../components/Related";

import { ShareIcon } from "../../../components/IconsSVG/ShareIcon";

// Styled-Components
import {
  Main,
  Sold,
  IconShareContainer,
  IconsContainer,
  IconInfo,
  InfoContainer,
  LocationLink,
  ShowMoreButton,
  DescriptionContainer,
  Description,
  Gradient,
  Price,
  FeaturesContainer,
  Features,
  Services,
  WhatsAppButton,
  RelatedContainer,
} from "../../../styles/detailsHouse/style";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const DetailsHouse = ({ property }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Consultando...</div>;
  }
  // const [property, setProperty] = useState({});
  const [related, setRelated] = useState([]);
  const [showMoreText, setShowMoreText] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState({});
  //Url Actual
  const [navigatorShare, setNavigatorShare] = useState(false);

  // const getData = async () => {
  //   const { data } = await Axios.get(`/api/one-house/${router.query.id}`);

  //   if (data.status) {
  //     setProperty(data.data[0]);
  //   }
  // };

  // useEffect(() => {
  //   if (router.query.id) {
  //     getData();
  //   }
  // }, [router]);

  const share = () => {
    navigator
      .share({
        title: property.title,
        text: property.description.slice(0, 156),
        url: window.location.href,
      })
      .then(() => console.log("Compartir fue un éxito."))
      .catch((error) => console.log("El reparto falló", error));
  };

  useEffect(() => {
    if ("share" in navigator) {
      setNavigatorShare(true);
    }
  }, []);

  const handleGetDataWhatsApp = async () => {
    const { data } = await Axios.get("/api/whatsApp-contact/all");
    if (data.data.length > 0) {
      setWhatsAppNumber(data.data[0]);
    }
  };

  useEffect(() => {
    handleGetDataWhatsApp();
  }, []);

  useEffect(async () => {
    if (property) {
      const { data } = await Axios.post(`/api/some-houses/some`, {
        match: {
          showOnweb: { $eq: true },
          typeOfProperty: { $eq: property.typeOfProperty },
          title: { $ne: property.title },
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
        limit: 6,
      });

      if (data.status) {
        setRelated(data.data);
      }
    }
  }, [property]);

  if (property) {
    const {
      address,
      age,
      bathrooms,
      bottomMeasurement,
      constructionSize,
      currency,
      description,
      frontMeasurement,
      levelsConstructed,
      location,
      mainPhotography,
      morePictures,
      parking,
      preservation,
      price,
      pricem2,
      registrationDate,
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
    } = property;
    return (
      <>
        <NextSeo
          title={`${title} | Vasquez Inmobiliaria`}
          description={description.slice(0, 156)}
          canonical=""
          openGraph={{
            url: "",
            title: `${title} | Vasquez Inmobiliaria`,
            description: description.slice(0, 156),
            images: [
              {
                url: mainPhotography.url,
                width: 200,
                height: 200,
                alt: mainPhotography.alt,
              },
            ],
            site_name: "Vasquez Inmobiliaria",
          }}
          twitter={{
            cardType: "summary",
          }}
        />
        <Header title={title} />
        <Main>
          {sold && (
            <Sold>
              <p>Vendida</p>
            </Sold>
          )}
          {navigatorShare && (
            <IconShareContainer onClick={share}>
              <ShareIcon />
            </IconShareContainer>
          )}
          {morePictures.length > 0 && (
            <HouseGalery
              mainPhotography={mainPhotography}
              morePictures={morePictures}
              title={title}
            />
          )}
          <InfoContainer>
            <h1>{title}</h1>
            <p>{address}</p>
            {location && (
              <>
                {location.hasOwnProperty("lat") && (
                  <>
                    {location.hasOwnProperty("lng") && (
                      <LocationLink
                        href={`https://www.google.com/maps/search/?api=1&query=${location.lat}%2C${location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Ubicación en el Mapa
                      </LocationLink>
                    )}
                  </>
                )}
              </>
            )}
            <DescriptionContainer show={showMoreText}>
              <Description>{description}</Description>
              <Gradient show={showMoreText}>
                <ShowMoreButton
                  type="button"
                  onClick={() => setShowMoreText(!showMoreText)}
                  show={showMoreText}
                >
                  {showMoreText ? `Mostrar menos` : `Mostrar más`}
                </ShowMoreButton>
              </Gradient>
            </DescriptionContainer>
            <Price>
              <span sold={sold}>${formatter.format(price)}</span> {currency}|{" "}
              {typeOfTransaction}
            </Price>
            <IconsContainer>
              {rooms && (
                <IconInfo>
                  <Cama />
                  <p>{rooms}</p>
                </IconInfo>
              )}
              {bathrooms && (
                <IconInfo>
                  <Bathroom />
                  <p>{bathrooms}</p>
                </IconInfo>
              )}
              {parking && (
                <IconInfo>
                  <Garage />
                  <p>{parking}</p>
                </IconInfo>
              )}
              {terrainSize && (
                <IconInfo>
                  <Terreno />
                  <p>{terrainSize}</p>
                </IconInfo>
              )}
            </IconsContainer>
          </InfoContainer>
          <FeaturesContainer>
            <h3>Características del inmueble</h3>
            <Features>
              {typeOfProperty && <p>Tipo de inmueble: {typeOfProperty}</p>}
              {levelsConstructed && (
                <p>Niveles construidos: {levelsConstructed}</p>
              )}
              {frontMeasurement && <p>Medida de frente: {frontMeasurement}</p>}
              {bottomMeasurement && <p>Medida de fondo: {bottomMeasurement}</p>}
              {constructionSize && (
                <p>Metros construidos: {constructionSize}</p>
              )}
              {terrainSize && (
                <p>
                  Tamaño del terreno: {terrainSize}m<span>2</span>
                </p>
              )}
              {age && <p>Edad: {age}</p>}
              {preservation && <p>Estado: {preservation}</p>}
            </Features>
          </FeaturesContainer>
          <FeaturesContainer>
            <h3>La propiedad cuenta</h3>
            <Features>
              {rooms && <p>Habitaciones: {rooms}</p>}
              {bathrooms && <p>Baños: {bathrooms}</p>}
              {parking && <p>Estacionamientos: {parking}</p>}
              {constructionSize && (
                <p>Metros construidos: {constructionSize}</p>
              )}
            </Features>
          </FeaturesContainer>
          {services && (
            <Services>
              {services.map((service) => (
                <p key={service}>{service}</p>
              ))}
            </Services>
          )}
          {location && (
            <>
              {location.hasOwnProperty("lat") && (
                <>
                  {location.hasOwnProperty("lng") && (
                    <HoseMap location={location} />
                  )}
                </>
              )}
            </>
          )}
          <HouseFormContact title={title} />
          {whatsAppNumber.hasOwnProperty("numerPhone") && (
            <WhatsAppButton
              href={`https://api.whatsapp.com/send?phone=+52${whatsAppNumber.numerPhone}&text=Hola!%20Me%20interesa%20esta%20propiedad%20${title}%20y%20Quisiera%20mas%20informaci%C3%B3n-%20${window.location.href}%20-`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enlace a WhatsApp"
            >
              <WhatsApp />
              {whatsAppNumber.numerPhone}
            </WhatsAppButton>
          )}
          {related.length > 0 && (
            <RelatedContainer>
              <>
                {related.map((item) => (
                  <Related key={item._id} {...item} />
                ))}
              </>
            </RelatedContainer>
          )}
        </Main>
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

export default DetailsHouse;

export const getStaticPaths = async () => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      match: {
        showOnweb: { $eq: true },
      },
      query: {
        _id: 1,
      },
      limit: 20,
    }),
  };

  const getHouses = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/some-houses/some`,
    settings
  );
  const { data } = await getHouses.json();

  // Obtener las rutas que queremos pre-renderizar
  const paths = data.map((sub) => ({
    params: { id: sub._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const getProps = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/one-house/${params.id}`
  );
  const { data } = await getProps.json();

  return {
    props: {
      property: data[0],
    },
    revalidate: 10,
  };
};
