const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", user.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], user.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.adminBoard
  );
};
