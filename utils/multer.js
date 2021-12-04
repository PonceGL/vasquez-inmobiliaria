const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "public/images"),
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9 + path.extname(file.originalname));
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.exthame(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Tipo de archivo no valido"), false);
      return;
    }
    cb(null, true);
  },
});
