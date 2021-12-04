import Image from "next/image";
import Link from "next/link";

// Components
import { Cama } from "../IconsSVG/CamaIcon";
import { Bathroom } from "../IconsSVG/BathroomIcon";
import { Garage } from "../IconsSVG/GarageIcon";
import { Terreno } from "../IconsSVG/TerrenoIcon";

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
  Container,
  ImageContainer,
  IconsContainer,
  IconInfo,
  InfoContainer,
  Description,
  Price,
} from "./style";

const House = ({
  title,
  address,
  description,
  mainPhotography,
  price,
  _id,
  rooms,
  bathrooms,
  parking,
  terrainSize,
}) => {
  return (
    <Container>
      <Link href={`/detalles/casa/${_id}`}>
        <ImageContainer>
          <Image
            loader={loader}
            src={mainPhotography.url}
            alt={`Fotografía principal de ${title}`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL
          />
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
        </ImageContainer>
      </Link>
      <InfoContainer>
        <h3>{title}</h3>
        <p>{address}</p>
        <Description>{description}</Description>
        <Price>${formatter.format(price)}</Price>
      </InfoContainer>
    </Container>
  );
};

export default House;
