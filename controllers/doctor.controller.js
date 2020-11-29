const config = require("../config/auth.config");
const db = require("../models");
const Doctor = db.doctor;
const Hospital = db.hospital

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const doctor = new Doctor({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),

  });

  if(req.body.hospital){
      Hospital.findOne({name: req.body.hospital},
        (err, hospital)=> {
            if(err) {
                res.status(500).send({ message: err });
                return;
            }

        doctor.hospital = hospital.name
        doctor.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "Doctor was registered successfully! sugoi!" });
          });
        })
  }
};

exports.signin = (req, res) => {
  Doctor.findOne({
    username: req.body.username,
  })
    .exec((err, doctor) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!doctor) {
        return res.status(404).send({ message: "Doctor Not found! baka" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        doctor.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password! baka",
        });
      }

      var token = jwt.sign({ id: doctor.id }, config.secret, {
        expiresIn: 86400, // Token expira en 24 horas
      });

      res.status(200).send({
        id: doctor._id,
        username: doctor.username,
        email: doctor.email,
        hospital: doctor.hospital,
        accessToken: token,
      });
    });
};
