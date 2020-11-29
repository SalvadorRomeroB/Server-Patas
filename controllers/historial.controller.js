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
