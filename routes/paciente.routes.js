const { verifySignUp } = require("../middleware");
const paciente = require("../controllers/paciente.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/paciente/signup",
    paciente.signup
  );

  app.post("/api/paciente/signin", paciente.signin);

  app.get("/api/pacientes", paciente.getPacientesDeDoctor);

  app.get("/api/paciente/esp", paciente.getParcienteEspecifico);

  app.put("/api/paciente/esp", paciente.updatePaciente);

  app.delete("/api/paciente/esp", paciente.deletePaciente);

};
