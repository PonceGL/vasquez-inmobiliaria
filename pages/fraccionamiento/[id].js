import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HoseMap from "../../components/HoseMap";
import HouseFormContact from "../../components/HouseFormContact";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import {
  Main,
  CoverContainer,
  BackgroundCover,
  Slogan,
  DescriptionContainer,
  AllImagesContainer,
  ImageContainer,
} from "../../styles/fraccionamiento/style";

const Subdivision = ({ divicion }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Consultando...</div>;
  }
  // const [divicion, setDivicion] = useState({});

  // const getData = async () => {
  //   const { data } = await Axios.get(`/api/one-subdivision/${router.query.id}`);

  //   if (data.status) {
  //     setDivicion(data.data[0]);
  //   }
  // };

  // useEffect(() => {
  //   if (router.query.id) {
  //     getData();
  //   }
  // }, [router]);

  if (divicion) {
    const {
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
    } = divicion;

    return (
      <>
        <NextSeo
          title={`${name} | Constructora e Inmobiliaria Vasquez`}
          description=""
          canonical={description.slice(0, 156)}
          name={`${name} | Constructora e Inmobiliaria Vasquez`}
          telephone="+522282107188"
          openGraph={{
            url: "",
            title: `${name} | Constructora e Inmobiliaria Vasquez`,
            description: description.slice(0, 156),
            images: [
              {
                url: logo.url,
                width: 200,
                height: 200,
                alt: logo.alt,
              },
            ],
            site_name: "Constructora e Inmobiliaria Vasquez",
          }}
          twitter={{
            cardType: "summary",
          }}
          address={{
            streetAddress:
              "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, México.",
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
        <Header title={`${name} | Constructora e Inmobiliaria Vasquez`} />
        <Main>
          <CoverContainer>
            <h1>{name}</h1>
            <Slogan>{slogan}</Slogan>
            <BackgroundCover />
            <Image
              loader={loader}
              src={cover.url}
              alt={cover.alt}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL
            />
          </CoverContainer>
          {description && (
            <DescriptionContainer>
              <p>{description}</p>
            </DescriptionContainer>
          )}

          {morePictures.length > 0 && (
            <DescriptionContainer>
              {morePictures[0].hasOwnProperty("url") && (
                <ImageContainer>
                  <Image
                    loader={loader}
                    src={morePictures[0].url}
                    alt={morePictures[0].alt}
                    width={morePictures[0].width}
                    height={morePictures[0].height}
                    placeholder="blur"
                    blurDataURL
                  />
                </ImageContainer>
              )}
            </DescriptionContainer>
          )}

          {moreInformation && (
            <DescriptionContainer>
              <p>{moreInformation}</p>
            </DescriptionContainer>
          )}

          {morePictures.length > 1 && (
            <AllImagesContainer>
              {morePictures
                .slice(1, morePictures.length)
                .map(({ url, alt, width, height, public_id }) => (
                  <ImageContainer key={public_id}>
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
            </AllImagesContainer>
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
          <HouseFormContact title={name} />
        </Main>
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

export default Subdivision;

export const getStaticPaths = async () => {
  const settings = {
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

  const getPaths = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/subdivisions/some`,
    settings
  );
  const { data } = await getPaths.json();

  // Obtener las rutas que queremos pre-renderizar
  const paths = data.map((sub) => ({
    params: { id: sub._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const getProps = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/one-subdivision/${params.id}`
  );
  const { data } = await getProps.json();

  return {
    props: {
      divicion: data[0],
    },
    revalidate: 10,
  };
};
