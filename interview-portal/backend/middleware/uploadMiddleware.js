const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require(
  "multer-storage-cloudinary"
);

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "resumes",
    resource_type: "auto",
    public_id:
      Date.now() +
      "-" +
      file.originalname.replace(
        /\.[^/.]+$/,
        ""
      )
  })
});

module.exports = multer({
  storage
});