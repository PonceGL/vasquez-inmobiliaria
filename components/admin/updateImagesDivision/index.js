import { useState, useEffect } from "react";
import Axios from "axios";
import { uploadWidget } from "../../../utils/uploadWidget";

// Components
import MoreImage from "../moreImage";

// Styled-Components
import {
  MoreImageContainer,
  UploadImageButton,
  CoverContainer,
} from "../../../styles/admin/updateImagesDivision/style";

const UpdateImagesDivision = ({
  _id,
  title,
  morePictures,
  changeDivision,
  setChangeDivision,
}) => {
  const [newImages, setNewImages] = useState([]);

  const handleRemoveData = async (id) => {
    setNewImages([]);
    const nuewArr = morePictures.filter((item) => item.public_id !== id);
    const { data } = await Axios.post(`/api/update-division`, {
      id: _id,
      set: { morePictures: nuewArr },
    });
    if (data.status) {
      setChangeDivision(!changeDivision);
    }
  };

  const handleUpdateData = async () => {
    setNewImages([]);
    const nuewArr = [...morePictures, ...newImages];

    const { data } = await Axios.post(`/api/update-division`, {
      id: _id,
      set: { morePictures: nuewArr },
    });
    if (data.status) {
      setChangeDivision(!changeDivision);
    }
  };

  useEffect(() => {
    if (newImages.length > 0) {
      handleUpdateData();
    }
  }, [newImages]);

  return (
    <MoreImageContainer>
      {morePictures.map((image) => (
        <MoreImage
          key={image.public_id}
          {...image}
          title={title}
          handleRemoveData={handleRemoveData}
        />
      ))}
      <UploadImageButton
        type="button"
        onClick={() => uploadWidget(newImages, setNewImages)}
      >
        Cargar más imagenes
      </UploadImageButton>
    </MoreImageContainer>
  );
};

export default UpdateImagesDivision;
