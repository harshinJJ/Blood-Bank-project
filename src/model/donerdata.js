const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donertable = new Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  blood: { type: String, require: true },
  place: { type: String, require: true },
  password: { type: String, require: true },
});

var Donerdetail = mongoose.model("Donertable", donertable);
module.exports = Donerdetail;
