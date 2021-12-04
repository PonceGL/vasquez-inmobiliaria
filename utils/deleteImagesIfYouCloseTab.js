import Axios from "axios";

export const deleteImagesIfYouCloseTab = (images) => {
  images.forEach(async (element) => {
    await Axios.post("/api/deleteImage", {
      id: element.public_id,
    });
  });
};
