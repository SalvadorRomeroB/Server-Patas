const { verifySignUp,authJwt } = require("../middleware");
const auth = require("../controllers/doctor.controller");

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
    verifySignUp.checkDuplicateUsernameOrEmailDoc, authJwt.verifyToken, authJwt.isAdmin
    ],
    auth.signup
  );

  app.get("/api/doctors/get", [authJwt.verifyToken], auth.getDoctors)
  app.get("/api/doctors/get/:id", [authJwt.verifyToken], auth.getDoctorById)
  app.put("/api/doctor/update/:id", authJwt.verifyToken, auth.updateDoctor)
  app.put("/api/doctor/update/password/:id", authJwt.verifyToken, auth.updatePassword)
  
  app.post("/api/doctor/signin", auth.signin);
};
