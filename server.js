const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const donateRouter = require("./src/router/doanteRouter");
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("error:", error);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.set("view engine", "ejs");

app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("Home");
});

app.use("/donate", donateRouter);

app.get("/whydonate", (req, res) => {
  res.render("Whydonate");
});

app.get("/contact", (req, res) => {
  res.render("Contact");
});

app.get("*", (req, res) => {
  res.send("not found");
});

app.listen(8060, () => {
  console.log("server started");
});
