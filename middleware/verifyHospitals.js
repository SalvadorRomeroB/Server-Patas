const db = require("../models");
const Hospital = db.hospital


checkDuplicateHospital = (req, res, next) => {

    Hospital.findOne({
      name: req.body.name,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "That hospital is already added! Baka" });
        return;
      }

      next();
    });

};


const verifyHospitals = {
    checkDuplicateHospital
  };
  
  module.exports = verifyHospitals;
  