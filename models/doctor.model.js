const mongoose = require("mongoose");

const Doctor = mongoose.model(
  "Doctor",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    hospital: 
      {
        type: mongoose.Schema.Types.String,
        ref: "Hospital",
      }
  })
);

module.exports = Doctor;
