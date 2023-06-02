const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const {
  uploadImage,
  getImage,
  upload,
  getAllImages
} = require("../controllers/imageController");

// const {protect} = require("../middleware/authMiddleware")

function initialize_gfs (conn) {
  let gfs1 = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
  });

  return gfs1
}

router.post("/upload", upload.single("imagefile"), (req, res) => {
  // console.log(first)
  return res.json({ id: req.file.filename });
});
router.get("/image/:filename", (req, res) => {
    getImage(req,res);
//   console.log("In Router", req.gfs);
});

router.get("/", (req, res) => {
  const files = getAllImages(req, res)
  console.log(files)
  return files
})

module.exports = {
    initialize_gfs, 
    imageRouter: router
};