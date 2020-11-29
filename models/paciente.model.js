const mongoose = require("mongoose");

const Paciente = mongoose.model(
  "Paciente",
  new mongoose.Schema({
    nombre: String,
    telefono: String,
    foto: String,
    codigo: String,
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
  })
);

module.exports = Paciente;
