const mongoose = require("mongoose");

const HistorialBasura = mongoose.model(
  "HistorialBasura",
  new mongoose.Schema({
    foto: String,
    fecha: String,
    resultado: Number
  }),
);

module.exports = HistorialBasura;
