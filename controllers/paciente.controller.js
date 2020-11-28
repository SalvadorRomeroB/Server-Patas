const config = require("../config/auth.config");
const db = require("../models");
const Paciente = db.paciente;

exports.signup = (req, res) => {
    const paciente = new Paciente({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      doctor: req.body.doctor
    });

    if(req.body.foto) {
        paciente.foto = req.body.foto
    }

    paciente.codigo = makeid(6)
  
    paciente.save((err, paciente) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    
      res.send({ message: "Paciente was registered successfully! uwu!" });
    });
};

exports.signin = (req, res) => {
    Paciente.findOne({
      codigo: req.body.codigo,
    })
      .exec((err, paciente) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!paciente) {
          return res.status(404).send({ message: "Paciente Not found! baka" });
        }
  
        res.status(200).send({
          id: paciente._id,
          nombre: paciente.nombre,
          telefono: paciente.telefono,
          foto: paciente.foto
        });
      });
};

exports.getPacientesDeDoctor = (req, res) => {
    Paciente.find({
      doctor: req.query.id,
    })
      .exec((err, pacientes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        pacientesRes = []

        pacientes.forEach(paciente => {
            pacientesRes.push({
                id: paciente._id,
                nombre: paciente.nombre,
                telefono: paciente.telefono,
                foto: paciente.foto
              })
        });
  
        res.status(200).send(pacientesRes);
      });
};

exports.getParcienteEspecifico = (req, res) => {
    Paciente.findById(
      req.query.id,
    )
      .exec((err, paciente) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!paciente) {
          return res.status(404).send({ message: "Paciente Not found! baka" });
        }
  
        res.status(200).send({
          id: paciente._id,
          nombre: paciente.nombre,
          telefono: paciente.telefono,
          foto: paciente.foto,
          codigo: paciente.codigo
        });
      });
};

exports.updatePaciente = (req, res) => {
    Paciente.findById(
        req.query.id,
      )
        .exec((err, paciente) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!paciente) {
            return res.status(404).send({ message: "Paciente Not found! baka" });
          }

          paciente.nombre = req.body.nombre
          paciente.telefono = req.body.telefono

          if(req.body.foto) {
            paciente.foto = req.body.foto
          }
    
          paciente.save((err, paciente) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          
            res.send({ message: "Paciente was updated successfully! uwu!" });
          });
    });
};


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 