const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const imageRoutes = require("./routes/imageRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("DB connected")
);

app.get("/", (req, res) => res.send("Home Page!"));
app.get("/hello", (req, res) => res.send("hello user!"));
app.use("/upload", imageRoutes);
app.use((req, res) => res.status(404).send("Page not found!"));

app.listen(port);
