import { useState, useEffect } from "react";
import Image from "next/image";
import Axios from "axios";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import {
  ContainerImage,
  ButtonActions,
} from "../../../styles/admin/moreImage/style";

const MoreImage = ({
  height,
  public_id,
  url,
  width,
  title,

  handleRemoveData,
}) => {
  const deleteImage = async () => {
    const { data } = await Axios.post(`/api/deleteImage`, {
      id: public_id,
    });

    if (data.status) {
      handleRemoveData(public_id);
    }
  };

  return (
    <>
      <ContainerImage>
        <Image
          loader={loader}
          src={url}
          alt={`Fotografía principal de ${title}`}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL
        />
        <ButtonActions type="button" onClick={deleteImage}>
          Eliminar
        </ButtonActions>
      </ContainerImage>
    </>
  );
};

export default MoreImage;
