const config = require("../config/auth.config");
const db = require("../models");
const Paciente = db.paciente;
const Historial = db.historial;

exports.getHistorialDePaciente = (req, res) => {
    Historial.find({
      paciente: req.query.id,
    })
      .exec((err, historiales) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        res.status(200).send(historiales);
      });
};

exports.getHistorialDePacienteCodigo = (req, res) => {
    Paciente.findOne({
        codigo: req.query.codigo,
      })
        .exec((err, paciente) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if(!paciente){
            return res.status(404).send({ message: "Paciente Not found! baka" });
          }
          
          Historial.find({
            paciente: paciente._id,
          })
            .exec((err, historiales) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
        
              res.status(200).send(historiales);
        });
    })    
};

exports.agregarComentario = (req, res) => {
    Historial.findById(req.query.id)
        .exec((err, historial) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          console.log(historial)
          

          if(!historial){
            return res.status(404).send({ message: "Entrado Not found! baka" });
          }

          historial.comentario = req.body.comentario
          
          historial.save((err, historial) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          
            res.status(200).send(historial);
          });
    })    
};