const config = require("../config/auth.config");
const db = require("../models");
const Doctor = db.doctor;
const Hospital = db.hospital

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.getDoctors = (req, res)=> {
  Doctor.find().select('').exec((err, data)=> {
    if(err){
      return res.status(400).json({
        error: "No doctors found"
      })
    }
    res.json(data)
  })
}

exports.getDoctorById =(req, res)=> {
  Doctor.findById(req.params.id).exec((err,data)=>{
    if(err){
      return res.status(400).json({
        error: "Doctor not found"
      })
    }
    res.json(data)
  })
}

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

exports.updateDoctor = (req, res, next) => {
  Doctor.findByIdAndUpdate(req.params.id, {
      $set: req.body
  },{ new: true }, (err, doctor) => {
      if (err) return next(err);
      res.status(200).send({
        id: doctor._id,
        username: doctor.username,
        email: doctor.email,
        hospital: doctor.hospital,
      });
  });
};

exports.updatePassword = (req, res, next) => {

  const newPassword = bcrypt.hashSync(req.body.newPassword, 8)

  Doctor.findById(req.params.id)
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
      }else{
        Doctor.findByIdAndUpdate(req.params.id, {
          password: newPassword
      }, (err, doctor) => {
          if (err) return next(err);
          res.send('Password updated successfully!');
      });
      }    
    });
 
};


