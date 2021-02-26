const Image = require("../models/images");
const fs = require("fs");

const postImage = (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    image: `http://localhost:8000/${req.file.filename}`,
  });
  newImage
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

const getAllImages = (req, res) => {
  Image.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

const getImage = (req, res) => {
  const { id } = req.params;
  Image.findById(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

const deleteImage = (req, res) => {
  const { id } = req.params;
  Image.findById(id)
    .then((result) => fs.unlinkSync(`./uploads/${result.image.split("/")[3]}`))
    .catch((err) => res.json(err));
  Image.deleteOne({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

module.exports = { postImage, getAllImages, getImage, deleteImage };
