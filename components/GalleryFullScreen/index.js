import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import {
  Conatiner,
  View,
  ImageContainer,
  AltText,
  Controls,
  Back,
  Next,
  Close,
  Background,
} from "./style";

const GalleryFullScreen = ({ images, setOpenGallery, indexImage }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(indexImage);
  }, []);

  const next = () => {
    // console.log("next", count);
    if (count >= images.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const prev = () => {
    // console.log("prev", count);
    if (count === 0) {
      setCount(images.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  const withKey = (e) => {
    if (e.which === 27 || e.keyCode === 27) {
      setOpenGallery(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => withKey(e));
    return () => {
      window.removeEventListener("keydown", (e) => withKey(e));
    };
  }, []);

  return (
    <Conatiner>
      <Close onClick={() => setOpenGallery(false)} />
      <View>
        <ImageContainer>
          <Image
            loader={loader}
            src={images[count].url}
            alt={`Fotografía `}
            // width={images[count].width}
            // height={images[count].height}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL
          />
        </ImageContainer>
      </View>
      {images[count].alt && <AltText>{images[count].alt}</AltText>}
      <Controls>
        <Back onClick={prev} />
        <Next onClick={next} />
      </Controls>
      <Background />
    </Conatiner>
  );
};

export default GalleryFullScreen;
