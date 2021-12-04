const cloudinary = require("cloudinary").v2;

// NEXT_PUBLIC_CLOUDINARY_URL: ,
// NEXT_PUBLIC_CLOUD_NAME: "civsa",
// NEXT_PUBLIC_CLOUD_API_KEY: "815767783294158",
// NEXT_PUBLIC_CLOUD_API_SECRET: "nDX0cY3u-boof6cx8hP2E6Nxp74",

// cloud_name: "duibtuerj",
// api_key: "244827682998557",
// api_secret: "smi8CBcmdJ7WNQieyVjSkSdOeAk",
cloudinary.config({
  cloud_name: "civsa",
  api_key: "815767783294158",
  api_secret: "nDX0cY3u-boof6cx8hP2E6Nxp74",
});

module.exports = cloudinary;
