const { verifySignUp } = require("../middleware");
const auth = require("../controllers/doctor.controller");
const { authJwt } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/admin/signup",
    [
    authJwt.verifyToken, authJwt.isAdmin

    ],
    auth.signup
  );

  app.post("/api/doctor/signin", auth.signin);
};
