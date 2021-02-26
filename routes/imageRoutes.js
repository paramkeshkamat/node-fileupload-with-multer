const express = require("express");
const upload = require("../multerSetup/multer");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.post("/", upload.single("image"), imageController.postImage);
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;
