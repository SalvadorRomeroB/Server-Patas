const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Doctor = db.doctor

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Username is already in use! Baka" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Email is already in use! Baka" });
        return;
      }

      next();
    });
  });
};

checkDuplicateUsernameOrEmailDoc = (req, res, next) => {
  // Username
  Doctor.findOne({
    username: req.body.username,
  }).exec((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (doctor) {
      res.status(400).send({ message: "Username is already in use! Baka" });
      return;
    }

    // Email
    Doctor.findOne({
      email: req.body.email,
    }).exec((err, doctor) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (doctor) {
        res.status(400).send({ message: "Email is already in use! Baka" });
        return;
      }

      next();
    });
  });
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: ` Role ${req.body.roles[i]} does not exist! Baka`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkDuplicateUsernameOrEmailDoc
};

module.exports = verifySignUp;
