const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

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
    useFindAndModify: true,
  },
  () => console.log("DB connected")
);

app.get("/", (req, res) => res.send("Home Page!"));
app.use("/upload", imageRoutes);
app.use((req, res) => res.send("Page not found!"));

app.listen(8000);
