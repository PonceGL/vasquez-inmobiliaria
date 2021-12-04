import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import { Main } from "../styles/inicio/style";
import {
  MainImage,
  BackgroundCover,
  Description,
} from "../styles/nosotros/style";

const Nosotros = () => {
  return (
    <>
      <NextSeo
        title="Nosotros | Constructora e Inmobiliaria Vasquez"
        description="Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños"
        canonical=""
        name="Nosotros | Constructora e Inmobiliaria Vasquez"
        telephone="+522282107188"
        openGraph={{
          url: "",
          title: "Constructora e Inmobiliaria Vasquez",
          description:
            "Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños",
          images: [
            {
              url: "https://res.cloudinary.com/duibtuerj/image/upload/v1636671404/vasquez-inmobiliaria/brand/logotipo_ep0uyp.jpg",
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
      <Header title="Nosotros | Constructora e Inmobiliaria Vasquez" />
      <Main>
        <MainImage>
          <h1>Constructora e Inmobiliaria Vasquez</h1>
          <BackgroundCover />
          {/* <Image
            loader={loader}
            src="https://res.cloudinary.com/duibtuerj/image/upload/v1638477898/vasquez-inmobiliaria/brand/about_rq0hq1.jpg"
            alt="Agente de bienes raices mostrando una propiedad a clientes felices"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          /> */}
        </MainImage>
        <Description>
          <p>
            En <span>Constructora e Inmobiliaria Vasquez</span> somos una
            empresa <span>líder, eficiente, comprometida, robusta</span>, en la
            que demostramos la capacidad de asumir los retos propuestos por
            nuestros clientes, porque no solo son propiedades, son{" "}
            <span>patrimonios invaluables</span> para ti y los tuyos, tenemos la
            mejor disposición y potencial de ofrecerte nuestros productos, más
            de <span>25 años de experiencia</span> nos avalan como una de las
            empresas lideres en la zona
          </p>
        </Description>
      </Main>
      <Footer />
    </>
  );
};

export default Nosotros;
