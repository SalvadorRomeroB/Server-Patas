const mongoose = require("mongoose");

const Paciente = mongoose.model(
  "Paciente",
  new mongoose.Schema({
    nombre: String,
    telefono: String,
    foto: {data: Buffer, contentType: String},
    codigo: String,
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
  })
);

module.exports = Paciente;
