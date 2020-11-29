const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const mongoose = require("mongoose");

const dbConfig = require("./config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// require routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/paciente.routes")(app);
require("./routes/hospital.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/predict.routes")(app);

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Mongoose Connection

const Role = db.role;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(
    `mongodb+srv://${dbConfig.USER}:${dbConfig.PASSWORD}@cluster0.6g7w7.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`,
    connectionParams
  )
  .then(() => {
    initial();
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
