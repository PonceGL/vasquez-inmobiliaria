import { useState } from "react";
import Image from "next/image";

// Components
import GalleryFullScreen from "../GalleryFullScreen";

// Styled-Components
import {
  GaleryContainer,
  ContainerScroll,
  ImageMainContainer,
  ImageContainer,
  PointsConatiner,
  Points,
  ConterImagesContainer,
} from "./style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const HouseGalery = ({ mainPhotography, morePictures, title }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  return (
    <>
      {openGallery && (
        <GalleryFullScreen
          images={[mainPhotography].concat(morePictures)}
          setOpenGallery={setOpenGallery}
          indexImage={indexImage}
        />
      )}
      <GaleryContainer>
        <PointsConatiner>
          <Points />
          {morePictures.map((dot) => (
            <Points key={dot.public_id} />
          ))}
        </PointsConatiner>
        <ContainerScroll col={morePictures.length + 1}>
          {morePictures.length > 4 && (
            <ConterImagesContainer>
              <p
                onClick={() => {
                  setIndexImage(4);
                  setOpenGallery(!openGallery);
                }}
              >
                +{morePictures.length - 4}
              </p>
            </ConterImagesContainer>
          )}
          <ImageMainContainer
            onClick={() => {
              setIndexImage(0);
              setOpenGallery(!openGallery);
            }}
          >
            <Image
              loader={loader}
              src={mainPhotography.url}
              alt={mainPhotography.alt}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL
            />
          </ImageMainContainer>
          {morePictures.map(({ height, public_id, url, width, alt }, i) => (
            <ImageContainer
              key={public_id}
              onClick={() => {
                setIndexImage(i + 1);
                setOpenGallery(!openGallery);
              }}
            >
              <Image
                loader={loader}
                src={url}
                alt={`Fotografía de ${alt}`}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageContainer>
          ))}
        </ContainerScroll>
      </GaleryContainer>
    </>
  );
};

export default HouseGalery;
