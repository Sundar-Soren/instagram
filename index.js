const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());

app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");

const DATABASE_URL = process.env.DATABASE;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", userRoutes);
app.use("/api", postsRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(8000, () => console.log("Server is running on 8000 port"));
