const config = require("../config/auth.config");
const db = require("../models");
const Paciente = db.paciente;
const Historial = db.historial;
const HistorialBasura = db.historialBasura


var request = require('request'); 
const { response } = require("express");

exports.predict = (req, res) => {
    foto = req.body.foto;
    //foto = "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"
    codigoReq = req.body.codigo;
    id = '';

    console.log(codigoReq)

    if(codigoReq){
        pacienteRes = null;
        Paciente.findOne({
            codigo: codigoReq,
          })
            .exec((err, paciente) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              if(!paciente){
                return res.status(404).send({ message: "Paciente Not found! baka" });
              }
              
              id = paciente._id
              postImage(foto, id, res);

        }) 
    } else {
        postImage(foto, '', res);
    }
};

function postImage(foto, pacienteId, res) {
    request.post({
        headers: {'content-type' : 'application/json'}, 
        url: "https://colab-model.herokuapp.com/prediction", 
        body: {data : foto},
        json: true
    }, function(err, response, body){
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        today = dd + '/' + mm + '/' + yyyy + ' - ' + hh + ':' + min;

        if(pacienteId != ''){ 
            const historial = new Historial({
                foto: foto,
                paciente: pacienteId,
                fecha: today,
                resultado: body
            });
            historial.save();
        }else {
            const historialBasura = new HistorialBasura({
                foto: foto,
                fecha: today,
                resultado: body
            });
            historialBasura.save();
        }
        
        res.send({categoria: body , fecha: today});
    });
}