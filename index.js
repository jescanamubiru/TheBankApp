var express = require("express");
var app = express();
var cors = require("cors");
var repository = require("./repository.js");
const e = require("express");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  repository.findOne(req.params.email).then((users) => {
    // if user exists, return error message
    if (users) {
      console.log("User already in exists");
      res.send("User already exists");
    } else {
      // else create user
      repository
        .create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
          console.log("User created!");
          console.log(user);
          res.send(user);
        });
    }
  });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  repository.findOne(req.params.email).then((user) => {
    // if user exists, check password
    if (user) {
      if (user.password === req.params.password) {
        res.send(user);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  repository.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  repository.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", function (req, res) {
  repository.all().then((docs) => {
    console.log("from index page:" + docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
