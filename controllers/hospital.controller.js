const db = require("../models");
const Hospital = db.hospital;


exports.getHospitalById =(req, res)=> {
  Hospital.findById(req.params.id).exec((err,data)=>{
    if(err){
      return res.status(400).json({
        error: "Id not found"
      })
    }
    res.json(data)
  })
}

exports.getHospitals = (req, res)=> {
  Hospital.find().exec((err, data)=> {
    if(err){
      return res.status(400).json({
        error: "No hospitals found"
      })
    }
    res.json(data)
  })
}

exports.addHospital = (req, res) => {
    const hospital = new Hospital({
      name: req.body.name,
    });
  
    hospital.save((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send(data);

    });
  };

  exports.deleteHospital = async(req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id)
    
        if (!hospital){
            res.status(404).send("No hospital found")
        }else{
            res.status(200).send({message: "Hospital deleted Successfully"})
        } 
      } catch (err) {
        res.status(500).send(err)
      }
    };

    exports.updateHospital = (req, res) => {
          Hospital.findByIdAndUpdate(req.params.id, {name: req.body.name},{ new: true } ,(err, hospital) => {
            if (err){
              res.send(err)
            }else{
              res.send(hospital)
            }

        });
        };
    

       
  

  