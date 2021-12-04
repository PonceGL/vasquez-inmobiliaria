const cloudinary = require("../../utils/cloudinary");

const deleteImage = async (req, res) => {
  if (req.method === "POST") {
    cloudinary.uploader.destroy(req.body.id);

    res
      .status(200)
      .json({ message: `Delete Image ${req.body.id}`, status: true });
  } else {
    res.status(200).json({ name: "upload-image GET", method: req.method });
  }
};

export default deleteImage;
