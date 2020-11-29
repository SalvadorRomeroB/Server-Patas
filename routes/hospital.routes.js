const hospital = require("../controllers/hospital.controller");

module.exports = (app) => {

  app.get("/api/test/hospital", hospital.getHospitals);
  app.post("/api/test/hospital", hospital.addHospital);
  app.delete("/api/test/hospital/:id", hospital.deleteHospital)
  app.put("/api/test/hospital/:id", hospital.updateHospital)

};
