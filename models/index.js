const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.doctor = require("./doctor.model")
db.hospital = require("./hospital.model")

db.ROLES = ["admin"];

module.exports = db;
