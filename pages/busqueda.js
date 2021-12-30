import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import House from "../components/House";
import SearchFilters from "../components/SearchFilters";

// Styled-Components
import { Main, Filling, Empty } from "../styles/houses/style";

const HomePage = () => {
  const router = useRouter();
  const query = router.query;
  const [houses, setHouses] = useState([]);

  // /busqueda?subdivision=La-Molienda,Ojo-De-Agua&type=casa&minp=0&maxp=999999999&minsize=0&maxsize=999999999&rooms=0&bathrooms=0&parking=0
  // "LA MOLIENDA", "OJO DE AGUA", "Otro", null
  // 'casa', 'departamento', 'terreno'
  const getData = async () => {
    const subs = query.subdivision.replace(/-/g, " ").split(",");

    const type = query.type.replace(/-/g, " ");

    const queryConfig = {
      match: {
        showOnweb: { $eq: true },
        subdivision: { $in: subs.concat(null) },
        typeOfProperty: { $eq: type },
        price: { $gte: parseInt(query.minp), $lte: parseInt(query.maxp) },
        terrainSize: {
          $gte: parseInt(query.minsize),
          $lte: parseInt(query.maxsize),
        },
        rooms: { $gte: parseInt(query.rooms) },
        bathrooms: { $gte: parseInt(query.bathrooms) },
        parking: { $gte: parseInt(query.parking) },
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
    };

    const { data } = await Axios.post(`/api/some-houses/some`, queryConfig);

    if (data.status) {
      setHouses(data.data);
    }
  };

  useEffect(() => {
    if (query.hasOwnProperty("type")) {
      getData();
    }
  }, [query]);

  console.log("houses: ", houses);

  return (
    <>
      <NextSeo
        title="Vasquez Inmobiliaria"
        description="Descripción"
        canonical=""
        openGraph={{
          url: "",
          title: "Vasquez Inmobiliaria",
          description: "Descripción",
          images: [
            {
              url: "https://res.cloudinary.com/civsa/image/upload/v1638987890/propiedades/orrozlyzen26otnl1h3g.jpg?w=1080&q=75",
              width: 200,
              height: 200,
              alt: "Logotipo de Vasquez Inmobiliaria",
            },
          ],
          site_name: "Vasquez Inmobiliaria",
        }}
        twitter={{
          cardType: "summary",
        }}
      />
      <Header title="Vasquez Inmobiliaria" />
      <Main>
        {houses.length > 0 ? (
          <>
            <SearchFilters houses={houses} />
            {houses.map((house) => (
              <House key={house._id} {...house} />
            ))}
          </>
        ) : (
          <Empty>
            <SearchFilters houses={houses} />
            <h3>No encontré nada</h3>
            <p>Por favor intenta con otros parámetros de búsqueda</p>
            <p>
              Utiliza el botón <span>Limpiar</span>, para quitar los filtros
            </p>
          </Empty>
        )}
        <Filling />
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;
