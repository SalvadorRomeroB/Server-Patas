const db = require("../models");
const Hospital = db.hospital;


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
  
    hospital.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Hospital saved" });

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

    exports.updateHospital = async(req, res) => {
        try {
            await Hospital.findByIdAndUpdate(req.params.id, {name: req.body.name})
            await Hospital.save()
            res.send("Hospital updated successfully")
          } catch (err) {
            res.status(500).send(err)
          }
        };
    
  

  