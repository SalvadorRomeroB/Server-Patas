const mongoose = require("mongoose");

const Hospital = mongoose.model(
  "Hospital",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Hospital;
