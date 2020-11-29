const { verifySignUp } = require("../middleware");
const historial = require("../controllers/historial.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/historial", historial.getHistorialDePaciente);

  app.get("/api/historial/codigo", historial.getHistorialDePacienteCodigo);

  app.put("/api/historial/comentario", historial.agregarComentario);
};
