const verifyHospitals = require("../middleware/verifyHospitals");
const { verifySignUp, authJwt } = require("../middleware");
const hospital = require("../controllers/hospital.controller");

module.exports = (app) => {

  app.get("/api/hospital", authJwt.verifyToken ,hospital.getHospitals);
  app.get("/api/hospital/:id", authJwt.verifyToken ,hospital.getHospitalById);
  app.post("/api/hospital", [verifyHospitals.checkDuplicateHospital, authJwt.verifyToken],hospital.addHospital);
  app.delete("/api/hospital/:id", authJwt.verifyToken ,hospital.deleteHospital)
  app.put("/api/hospital/:id", authJwt.verifyToken ,hospital.updateHospital)

};
