import React, { useEffect, useState } from "react";
import Axios from "axios";
import Fetch from "isomorphic-unfetch";
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
  const router = useRouter();
  if (router.isFallback) {
    return <div>Consultando...</div>;
  }

  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const [showMoreText, setShowMoreText] = useState(false);
  //Url Actual
  const [navigatorShare, setNavigatorShare] = useState(false);

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
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/by2lm2keatgii3g2eu2a.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/nulacnfqc7q7kmfrlbaz.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/vd8dsrmn01kevme43gee.jpg",
      alt: "Fotografia de preventa",
    },
    {
      url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853608/vasquez-inmobiliaria/Preventa/v4vhzkk2frmfqqlrxmw7.jpg",
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
              url: "https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/vxnw1jzpaky9l8qzgtxi.jpg",
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
            src="https://res.cloudinary.com/duibtuerj/image/upload/v1646853609/vasquez-inmobiliaria/Preventa/vxnw1jzpaky9l8qzgtxi.jpg"
            alt="Proyecto de preventa"
            // width={1024}
            // height={687}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          />
        </MainImage>
        <InfoContainer>
          <h1>Preventa</h1>
          <p>2a. calle de Los Pinos 28-C</p>
          <p>San Felipe Ecatepec, San Cristóbal De Las...</p>
          <DescriptionContainer show={showMoreText}>
            <Description>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes. Lorem ipsum dolor sit
              amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
              parturient montes
            </Description>
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
            <span>${formatter.format(3500000)}</span> MXN|{" "}
          </Price>
          <IconsContainer>
            <IconInfo>
              <Cama />
              <p>2</p>
            </IconInfo>
            <IconInfo>
              <Bathroom />
              <p>3</p>
            </IconInfo>
            <IconInfo>
              <Garage />
              <p>1</p>
            </IconInfo>
            <IconInfo>
              <Terreno />
              <p>120</p>
            </IconInfo>
          </IconsContainer>

          <FeaturesContainer>
            <h3>Características del inmueble</h3>
            <Features>
              <p>Tipo: Hacienda</p>
              <p>Medida de frente: 5.0 m</p>
              <p>Medida de fondo: 20.0 m</p>
              <p>Edad: 15</p>
              <p>Niveles construidos: 3</p>
              <p>Cocina: integral</p>
              <p>Conservación: Muy Bueno</p>
            </Features>
          </FeaturesContainer>
        </InfoContainer>
        <RenderSection>
          <RenderContainer>
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
                <li>Niveles construidos: 3</li>
                <li>Cocina: integral</li>
                <li>Conservación: Muy Bueno</li>
                <li>Tipo: Hacienda</li>
                <li>Medida de frente: 5.0 m</li>
                <li>Medida de fondo: 20.0 m</li>
                <li>Edad: 15</li>
              </DatailsRenderList>
            </DatailsRender>
          </RenderContainer>

          <RenderContainer reverse={true}>
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
            <DatailsRender>
              <DatailsRenderTitle>Planta Alta</DatailsRenderTitle>
              <DatailsRenderList>
                <li>Niveles construidos: 3</li>
                <li>Cocina: integral</li>
                <li>Conservación: Muy Bueno</li>
                <li>Tipo: Hacienda</li>
                <li>Medida de frente: 5.0 m</li>
                <li>Medida de fondo: 20.0 m</li>
                <li>Edad: 15</li>
              </DatailsRenderList>
            </DatailsRender>
          </RenderContainer>
        </RenderSection>
        <GalleryContainer>
          <DatailsRenderTitle>Galería</DatailsRenderTitle>
          <ImagesContainer>
            <ImageGallery
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
            </ImageGallery>
            <ImageGallery></ImageGallery>
          </ImagesContainer>
        </GalleryContainer>
        <MapContainer>
          <DatailsRenderTitle>Excelente Ubicación</DatailsRenderTitle>
          <HoseMap location={{ lat: "19.497098", lng: "-96.874741" }} />
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
