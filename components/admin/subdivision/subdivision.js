import React, { useEffect, useState } from "react";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";

// Components
import { ProgressCircle } from "../../IconsSVG/ProgressCircle";

// Styled Components
import {
  SubdivisionStyled,
  ImageContainer,
  InfoContainer,
  SubdivisionName,
  SalesContainer,
  CirlceContainer,
  Number,
  Text,
  Sold,
  ActionsContainer,
  LinkActions,
} from "../../../styles/admin/subdivision/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Subdivision = ({
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

  showImage,
  changesHouses,
}) => {
  const [houses, setHouses] = useState(0);
  const [info, setInfo] = useState([]);
  const [homesSold, setHomesSold] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/some-houses/some`, {
        match: {
          showOnweb: { $eq: true },
          subdivision: { $eq: name },
          typeOfProperty: { $in: ["casa", "departamento", "terreno"] },
          price: { $gte: 0, $lte: 999999999 },
          terrainSize: { $gte: 0, $lte: 999999999 },
          rooms: { $gte: 0 },
          bathrooms: { $gte: 0 },
          parking: { $gte: 0 },
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
        limit: 100000,
      });

      if (data.status) {
        setHouses(data.total);
        setInfo(data.data);
      }
    };
    getData();
  }, [changesHouses]);

  useEffect(() => {
    if (info) {
      let sold = info.filter((house) => house.sold);
      setHomesSold(sold);
    }
  }, [info]);

  return (
    <SubdivisionStyled showImage={showImage}>
      {showImage && (
        <ImageContainer>
          <Image
            loader={loader}
            src={logo.url}
            alt={`Logotipo de ${name}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          />
        </ImageContainer>
      )}
      <InfoContainer showImage={showImage}>
        <SubdivisionName>{name}</SubdivisionName>
        <Text>
          {showOnweb ? (
            <span>Se muestra en web</span>
          ) : (
            <span>No se muestra en web</span>
          )}
        </Text>
        <Text>
          <span>{houses}</span> Propiedades registradas
        </Text>
      </InfoContainer>
      {showImage && (
        <ActionsContainer>
          <Link href="#">
            <LinkActions>Visitar</LinkActions>
          </Link>
          <Link href={`/admin/edit-division/${_id}`}>
            <LinkActions>Editar</LinkActions>
          </Link>
        </ActionsContainer>
      )}
      <SalesContainer showImage={showImage}>
        <CirlceContainer porcent={(100 * homesSold.length) / houses}>
          <ProgressCircle />
          <Number sales={homesSold.length > 0 ? true : false}>
            {homesSold.length}
          </Number>
        </CirlceContainer>
        <Sold>Vendidas</Sold>
      </SalesContainer>
    </SubdivisionStyled>
  );
};

export default Subdivision;
