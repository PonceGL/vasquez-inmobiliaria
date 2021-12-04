import React from "react";

// Components
import ImagePreview from "../imagePreview/ImagePreview";
import { uploadWidget } from "../../../utils/uploadWidget";

// Styled Components
import { UploadImageButton } from "../../../styles/admin/uploadPhotosComponent/style";

const UploadPhotosComponent = ({
  morePictures,
  setMorePictures,
  mainPhotography,
  updateMainPhotography,
}) => {
  // Despliega el Widget de Cloudinary
  const uploadFile = () => {
    uploadWidget(morePictures, setMorePictures);
  };

  return (
    <>
      {morePictures.length > 0 && (
        <>
          {morePictures.map((picture) => (
            <ImagePreview
              key={picture.public_id}
              url={picture.url}
              alt={picture.original_filename}
              width={picture.width}
              height={picture.height}
              public_id={picture.public_id}
              morePictures={morePictures}
              setMorePictures={setMorePictures}
              mainPhotography={mainPhotography}
              updateMainPhotography={updateMainPhotography}
            />
          ))}
        </>
      )}
      <UploadImageButton
        type="button"
        onClick={() => uploadFile()}
        emty={morePictures.length === 0 ? true : false}
      >
        {morePictures.length === 0 ? `Cargar imágenes` : `Cargar más imagenes`}
      </UploadImageButton>
    </>
  );
};

export default UploadPhotosComponent;
