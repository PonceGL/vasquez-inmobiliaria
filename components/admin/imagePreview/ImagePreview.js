import React, { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";

// Styled Components
import {
  ImagePreviewStyled,
  DeleteButton,
  MainImageButton,
} from "../../../styles/admin/imagePreview/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ImagePreview = ({
  url,
  alt,
  width,
  height,
  public_id,
  morePictures,
  setMorePictures,
  mainPhotography,
  updateMainPhotography,
}) => {
  const [showBorder, setShowBorder] = useState(false);

  const deleteImage = () => {
    Axios({
      method: "post",
      url: "/api/deleteImage",
      data: {
        id: public_id,
      },
    })
      .then((response) => {
        let removeItem = morePictures.filter(
          (item) => item.public_id !== public_id
        );
        setMorePictures(removeItem);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleMainPhotography = () => {
    let imageFilter = morePictures.filter(
      (item) => item.public_id === public_id
    );
    updateMainPhotography({
      url: imageFilter[0].url,
      width: imageFilter[0].width,
      height: imageFilter[0].height,
      public_id: imageFilter[0].public_id,
      alt: imageFilter[0].alt,
    });
  };

  const handleRemoveMainPhotography = () => {
    if (mainPhotography.public_id === public_id) {
      updateMainPhotography(null);
    }
  };

  useEffect(() => {
    if (mainPhotography !== null) {
      if (mainPhotography.public_id === public_id) {
        setShowBorder(true);
      } else {
        setShowBorder(false);
      }
    } else {
      setShowBorder(false);
    }
  }, [mainPhotography]);

  return (
    <ImagePreviewStyled border={showBorder}>
      {mainPhotography === null ? (
        <DeleteButton type="button" onClick={deleteImage} />
      ) : (
        <>
          {mainPhotography.public_id !== public_id && (
            <DeleteButton type="button" onClick={deleteImage} />
          )}
        </>
      )}
      {mainPhotography === null && (
        <MainImageButton type="button" onClick={handleMainPhotography} />
      )}
      {mainPhotography !== null && (
        <>
          {mainPhotography.public_id === public_id && (
            <MainImageButton
              type="button"
              onClick={handleRemoveMainPhotography}
              main={true}
            />
          )}
        </>
      )}
      <img src={url} alt={alt} />
    </ImagePreviewStyled>
  );
};

export default ImagePreview;
