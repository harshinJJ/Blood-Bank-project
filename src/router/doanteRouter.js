const express = require("express");
const multer = require("multer");

const Donerdetail = require("../model/donerdata");
const donerview = require("../controller/donatecontrol");
const donateRouter = express.Router();

donateRouter.use("/view", donerview);

donateRouter.post("/tbdata", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      blood: req.body.btype,
      password: req.body.password,
      place: req.body.place,
    };
    const specificdetail = await Donerdetail.findOne({
      email: req.body.email,
    });
    if (!specificdetail) {
      Donerdetail(data)
        .save()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      const donerdetails = await Donerdetail.find();
      console.log(data);
      res.render("Singledonerview", { data });
    } else {
      console.log("User already exists");
    }
  } catch (error) {}
});

donateRouter.get("/edited/:userId", async (req, res) => {
  try {
    const editdata = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      blood: req.query.btype,
      password: req.query.password,
      place: req.query.place,
    };
    const editid = req.params.userId;
    const data = Donerdetail.updateOne({ _id: editid }, { $set: editdata });
    res.render("Singledonerview", { data });
  } catch (error) {}
});

donateRouter.get("/login", (req, res) => {
  res.render("Signin");
});

donateRouter.get("/signup", (req, res) => {
  res.render("Signup");
});

donateRouter.get("/logindetail", (req, res) => {
  res.render("Logindetail");
});
donateRouter.get("/edit/:userId", async (req, res) => {
  try {
    const editid = req.params.userId;
    const editdoner = await Donerdetail.findOne({ _id: editid });
    res.render("Editdoner", { editdoner });
  } catch (error) {}
});
donateRouter.get("/district/:place", async (req, res) => {
  try {
    const placeid = req.params.place;
    const specificdistrict = await Donerdetail.find({ place: placeid });
    res.render("Specificdis", { specificdistrict });
  } catch (error) {}
});

donateRouter.get("/getdata", async (req, res) => {
  try {
    const data1 = {
      email: req.query.email,
      password: req.query.password,
    };
    const sdetails = await Donerdetail.findOne({ email: data1.email });
    if (!sdetails) {
      console.log("User not found");
    }
    if (sdetails.password !== data1.password) {
      console.log("password not find");
    }
    if (sdetails.password === data1.password) {
      res.render("Logindetail", { sdetails });
    }
  } catch (error) {}
});

donateRouter.get("/delete/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const deleting = await Donerdetail.deleteOne({ _id: id });
    console.log(deleting);
    res.redirect("/donate/view");
  } catch (error) {}
});

module.exports = donateRouter;
