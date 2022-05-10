import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Image from "next/image";

// Styled-Components
import {
  Main,
  IconShareContainer,
  IconsContainer,
  IconInfo,
  ShowMoreButton,
  DescriptionContainer,
  Description,
  Gradient,
  Price,
  Features,
} from "../../../styles/detailsHouse/style";
import {
  MainImage,
  InfoContainer,
  FeaturesContainer,
  RenderSection,
  RenderContainer,
  Render,
  DatailsRender,
  DatailsRenderList,
  DatailsRenderTitle,
  GalleryContainer,
  ImagesContainer,
  ImageGallery,
  MapContainer,
  FinancingContainer,
  FinancingOptions,
} from "../../../styles/preventa/style";

// Components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Cama } from "../../../components/IconsSVG/CamaIcon";
import { Bathroom } from "../../../components/IconsSVG/BathroomIcon";
import { Garage } from "../../../components/IconsSVG/GarageIcon";
import { Terreno } from "../../../components/IconsSVG/TerrenoIcon";
import HoseMap from "../../../components/HoseMap";
import HouseFormContact from "../../../components/HouseFormContact";
import { ShareIcon } from "../../../components/IconsSVG/ShareIcon";
import GalleryFullScreen from "../../../components/GalleryFullScreen";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Preventa = () => {
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const [showMoreText, setShowMoreText] = useState(true);
  //Url Actual
  const [navigatorShare, setNavigatorShare] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if ("share" in navigator) {
      setNavigatorShare(true);
    }
  }, []);

  if (router.isFallback) {
    return <div>Consultando...</div>;
  }

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

  const handleGetDataWhatsApp = async () => {
    const { data } = await Axios.get("/api/whatsApp-contact/all");
    if (data.data.length > 0) {
      setWhatsAppNumber(data.data[0]);
    }
  };

  const imagesUrl = [
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/knyjjvhlyrvbsrn0stvc.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/vxnw1jzpaky9l8qzgtxi.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/f6j7vft6s8u3ocnoz2gl.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/tfg8lirkdzc85o8ipb86.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/pih7aa5bxsfjdprsinqe.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/civsa/image/upload/v1652202042/propiedades/l2rs2giuqqk514deqlyf.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/by2lm2keatgii3g2eu2a.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/civsa/image/upload/v1645984519/propiedades/ctfqom8gduen8pgn5pe5.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/vd8dsrmn01kevme43gee.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/civsa/image/upload/v1645984519/propiedades/t9hdjsbbllaq8ez6q19w.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/v4vhzkk2frmfqqlrxmw7.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/civsa/image/upload/v1645984519/propiedades/pypf851bezmxmorywq1j.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/civsa/image/upload/v1652202043/propiedades/mivire5b9oypzktpyleu.jpg",
      alt: "Fotografia de preventa",
    },
  ];

  return (
    <>
      <NextSeo
        title={`Preventa | Vasquez Inmobiliaria`}
        description="Propiedad en preventa"
        canonical=""
        openGraph={{
          url: "",
          title: `Preventa | Vasquez Inmobiliaria`,
          description: "Propiedad en preventa",
          images: [
            {
              url: imagesUrl[11].url,
              width: 1024,
              height: 687,
              alt: "Proyecto de preventa",
            },
          ],
          site_name: "Vasquez Inmobiliaria",
        }}
        twitter={{
          cardType: "summary",
        }}
      />
      {openFullScreen && (
        <GalleryFullScreen
          images={imagesUrl}
          setOpenGallery={setOpenFullScreen}
          indexImage={indexImage}
        />
      )}
      <Header title="Preventa" />
      <Main>
        {navigatorShare && (
          <IconShareContainer onClick={share}>
            <ShareIcon />
          </IconShareContainer>
        )}

        <MainImage>
          <Image
            loader={loader}
            src={imagesUrl[11].url}
            alt="Proyecto de preventa"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          />
        </MainImage>
        <InfoContainer>
          <h1>Preventa</h1>
          {/* <p>2a. calle de Los Pinos 28-C</p>
          <p>San Felipe Ecatepec, San Cristóbal De Las...</p> */}
          <DescriptionContainer show={showMoreText}>
            <Description>
              PREVENTA PROTOTIPO LIVENZA VENTA DE CASA NUEVA CON 2 RECAMARAS, 2
              1/2 BAÑOS, CISTERNA, COCHERA, PATIO TRASERO, SALA, COMEDOR,
              COCINA.
            </Description>
            {/* <Gradient show={showMoreText}>
              <ShowMoreButton
                type="button"
                onClick={() => setShowMoreText(!showMoreText)}
                show={showMoreText}
              >
                {showMoreText ? `Mostrar menos` : `Mostrar más`}
              </ShowMoreButton>
            </Gradient> */}
          </DescriptionContainer>
          {/* <Price>
            <span>${formatter.format(3500000)}</span> MXN|{" "}
          </Price> */}
          <IconsContainer>
            <IconInfo>
              <Cama width="2rem" />
              <p>2</p>
            </IconInfo>
            <IconInfo>
              <Bathroom width="1.5rem" />
              <p>
                2 <span style={{ fontSize: "1rem" }}>1/2</span>
              </p>
            </IconInfo>
            <IconInfo>
              <Garage width="2rem" />
              <p>1</p>
            </IconInfo>
            <IconInfo>
              <Terreno width="2rem" />
              <p>125</p>
            </IconInfo>
          </IconsContainer>

          <FeaturesContainer>
            <h3>Características del inmueble</h3>
            <Features>
              <p>Tipo: Casa Nueva</p>
              <p>Niveles construidos: 2</p>
              <p>84 m2 de construcción</p>
              <p>Conservación: Nuevo</p>
            </Features>
          </FeaturesContainer>
        </InfoContainer>
        <RenderSection>
          <RenderContainer
            style={{
              position: "sticky",
              top: "0",
            }}
          >
            <Render>
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/ueglzmmbbno85ruk4pd4.jpg"
                alt="Planta baja"
                width={253}
                height={768}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </Render>
            <DatailsRender>
              <DatailsRenderTitle>Planta Baja</DatailsRenderTitle>
              <DatailsRenderList>
                <br />
                <p>Cocina: integral</p>
                <br />
                <p>Sala</p>
                <br />
                <p>Comedor</p>
                <br />
                <p>1/2 Baño</p>
                <br />
                <p>Cisterna</p>
                <br />
                <p>Patio Trasero</p>
                <br />
                <p>Estacionamiento</p>
              </DatailsRenderList>
            </DatailsRender>
          </RenderContainer>

          <RenderContainer
            reverse={true}
            // style={{
            //   alignItems: "flex-end",
            // }}
            second={true}
          >
            <Render>
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/iachfyiee2mapeys5fkq.jpg"
                alt="Planta Alta"
                width={253}
                height={768}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </Render>
            <DatailsRender
            // style={{
            //   transform: "translateY(10rem)",
            //   position: "relative",
            //   zIndex: "-1",
            // }}
            >
              <DatailsRenderTitle>Planta Alta</DatailsRenderTitle>
              <DatailsRenderList>
                <br />
                <li>2 Habitaciones</li>
                <br />
                <li>2 Baños</li>
              </DatailsRenderList>
            </DatailsRender>
          </RenderContainer>
        </RenderSection>
        <GalleryContainer>
          <DatailsRenderTitle>Galería</DatailsRenderTitle>
          <ImagesContainer>
            {imagesUrl.length > 0 && (
              <>
                {imagesUrl.map(({ url, alt }, index) => (
                  <ImageGallery
                    key={url}
                    onClick={() => {
                      setIndexImage(index);
                      setOpenFullScreen(!openFullScreen);
                    }}
                  >
                    <Image
                      loader={loader}
                      src={url}
                      alt={alt}
                      //   width={883}
                      //   height={768}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL
                    />
                  </ImageGallery>
                ))}
              </>
            )}
            {/* <ImageGallery
              onClick={() => {
                setIndexImage(0);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/knyjjvhlyrvbsrn0stvc.jpg"
                alt="Proyecto de preventa"
                //   width={883}
                //   height={768}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(1);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/vxnw1jzpaky9l8qzgtxi.jpg"
                alt="Proyecto de preventa"
                //   width={1024}
                //   height={687}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(2);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/f6j7vft6s8u3ocnoz2gl.jpg"
                alt="Proyecto de preventa"
                //   width={862}
                //   height={768}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(3);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/tfg8lirkdzc85o8ipb86.jpg"
                alt="Proyecto de preventa"
                //   width={992}
                //   height={604}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(4);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/pih7aa5bxsfjdprsinqe.jpg"
                alt="Proyecto de preventa"
                //   width={1024}
                //   height={576}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(5);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/by2lm2keatgii3g2eu2a.jpg"
                alt="Proyecto de preventa"
                //   width={1024}
                //   height={613}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(6);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/nulacnfqc7q7kmfrlbaz.jpg"
                alt="Proyecto de preventa"
                //   width={1024}
                //   height={639}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(7);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/vd8dsrmn01kevme43gee.jpg"
                alt="Proyecto de preventa"
                //   width={1024}
                //   height={639}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery>
            <ImageGallery
              onClick={() => {
                setIndexImage(8);
                setOpenFullScreen(!openFullScreen);
              }}
            >
              <Image
                loader={loader}
                src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/v4vhzkk2frmfqqlrxmw7.jpg"
                alt="Proyecto de preventa"
                //   width={906}
                //   height={768}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageGallery> */}
          </ImagesContainer>
        </GalleryContainer>
        <MapContainer>
          <DatailsRenderTitle>Excelente Ubicación</DatailsRenderTitle>
          <HoseMap location={{ lat: "19.495433", lng: "-96.875245" }} />
        </MapContainer>
        <FinancingContainer>
          <DatailsRenderTitle>Opciones de financiamiento</DatailsRenderTitle>
          <FinancingOptions>
            <li>40% DE ENGANCHE A 6 MESES SIN INTERESES</li>
            <li>
              40% DE ENGANCHE A 12 MESES CON EL 1.2% DE INTERES SOBRE SALDOS
              INSOLUTOS
            </li>
            <li>
              TAMBIÉN ACEPTAMOS CRÉDITOS FOVISSTE, INFONAVIT, INSTITUCIONES
              BANCARIAS, SIMULACIÓN DE CRÉDITO
            </li>
          </FinancingOptions>
        </FinancingContainer>
        <HouseFormContact title="Preventa" />
      </Main>
      <Footer />
    </>
  );
};

export default Preventa;
