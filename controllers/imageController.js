const Image = require("../models/images");
const fs = require("fs");

const postImage = (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    image: `${req.protocol}s://${req.headers.host}/${req.file.filename}`,
  });
  newImage
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json(err));
};

const getAllImages = (req, res) => {
  Image.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
};

const getImage = (req, res) => {
  const { id } = req.params;
  Image.findById(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
};

const deleteImage = (req, res) => {
  const { id } = req.params;
  Image.findById(id)
    .then((result) => fs.unlinkSync(`./uploads/${result.image.split("/")[3]}`))
    .catch((err) => res.status(500).json(err));
  Image.deleteOne({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
};

module.exports = { postImage, getAllImages, getImage, deleteImage };
