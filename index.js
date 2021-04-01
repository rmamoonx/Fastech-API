require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var User = require("./models/User");

var port = process.env.PORT || 3000;
var saltRounds = 10;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());

const myurl = process.env.DB;
const secret = "mysecretkey";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(myurl, options)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/signup", async (req, res) => {
  var newUser = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch((err) => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("User already exists...");
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});

app.post("/login", async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.send("User not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              res.send("User authenticated");
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
