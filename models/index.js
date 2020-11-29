const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.paciente = require("./paciente.model");
db.doctor = require("./doctor.model")
db.hospital = require("./hospital.model")
db.historial = require("./historial.model")
db.historialBasura = require("./historialBasura.model")

db.ROLES = ["admin"];

module.exports = db;
