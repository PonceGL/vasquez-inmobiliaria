import React, { useEffect, useState } from "react";
import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import House from "../components/House";

// Components
import SearchFilters from "../components/SearchFilters";

// Styled-Components
import { Main, Filling } from "../styles/houses/style";

const HomePage = ({ houses }) => {
  // const [houses, setHouses] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await Axios.post(`/api/some-houses/some`, {
  //       match: {
  //         showOnweb: { $eq: true },
  //       },
  //       query: {
  //         title: 1,
  //         address: 1,
  //         description: 1,
  //         mainPhotography: 1,
  //         price: 1,
  //         _id: 1,
  //         rooms: 1,
  //         bathrooms: 1,
  //         parking: 1,
  //         terrainSize: 1,
  //       },
  //       limit: 20,
  //     });

  //     if (data.status) {
  //       setHouses(data.data);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <NextSeo
        title="Propiedades | Constructora e Inmobiliaria Vasquez"
        description="Tenemos una propiedad a tu medida, no dudes en contactarnos, la mejor atención para ti en todo el proceso de compra – venta."
        canonical=""
        name="Propiedades | Constructora e Inmobiliaria Vasquez"
        telephone="+522282107188"
        openGraph={{
          url: "",
          title: "Constructora e Inmobiliaria Vasquez",
          description:
            "Tenemos una propiedad a tu medida, no dudes en contactarnos, la mejor atención para ti en todo el proceso de compra – venta.",
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
      <Header title="Propiedades | Constructora e Inmobiliaria Vasquez" />
      <Main>
        {houses.length > 0 && (
          <>
            <SearchFilters houses={houses} />
            {houses.map((house) => (
              <House key={house._id} {...house} />
            ))}
          </>
        )}
        <Filling />
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const settings = {
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
      limit: 20,
    }),
  };

  const getProps = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/some-houses/some`,
    settings
  );
  const { data } = await getProps.json();

  return {
    props: {
      houses: data,
    },
    revalidate: 10,
  };
};
