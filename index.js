require("dotenv").config();
// const config = require("config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

// GO TO BOTTOM OF PAGE AND SET ENVIRONMENT KEY BEFORE SERVER WILL GO UP!!!!!

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Routes
const categories = require("./routes/categories");
const random = require("./routes/random");
const search = require("./routes/search");
const beers = require("./routes/beers");

// Port
// let port;

// Environment Debugger
// if (app.get("env") === "development") {
//   app.use(morgan("dev"));
//   port = 4001;
// } else if (app.get("env") === "production") {
//   port = process.env.PORT;
// }

let port = process.env.PORT;

app.use("/api", function (req, res, next) {
  var allowedOrigins = [
    "https://beer-me-tx.herokuapp.com/",
    "http://localhost:3000",
  ];
  var origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  console.log(origin);

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/categories", categories);
app.use("/api/random", random);
app.use("/api/search", search);
app.use("/api/beers", beers);
// app.use("/users", usersRouter);
// app.use('/auth', authRouter);

app.listen(port, () => console.log(`Server listening on port ${port}...`));

app.get("/", (req, res) => {
  res.send("Welcome to our server!");
});

// Configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Application Key: " + config.get("key"));
// console.log("Application Env: " + app.get("env"));

/*
    Terminal command to set environment
    export NODE_ENV=production
    Terminal command to set key
    export app_key=1234
*/
