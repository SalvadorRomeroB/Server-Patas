const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided! Baka" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized! Baka" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  try{
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if(Role){
        Role.find(
          {
            _id: { $in: user.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "admin") {
                next();
                return;
              }
            }
    
            res.status(403).send({ message: "Require Admin Role! Baka" });
            return;
          }
        );
      }else{
        res.status(403).send({message: "Require Admin Role! Baka"})
      }
    });
  }catch(err){
    console.log(err)
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
