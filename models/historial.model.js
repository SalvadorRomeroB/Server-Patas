const mongoose = require("mongoose");

const Historial = mongoose.model(
  "Historial",
  new mongoose.Schema({
    foto: String,
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
    },
    fecha: String,
    comentario: String,
    resultado: Number
  }),
);

module.exports = Historial;
