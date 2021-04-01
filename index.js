var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var User = require("./models/User");

var port = process.env.PORT || 3000;
var saltRouds = 10;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());

const myurl =
  "mongodb+srv://fastech:Fastech2020@fastech.okn4v.mongodb.net/Fastech?retryWrites=true&w=majority";
const secret = "mysecretkey"; //going to be used later on for key token

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
  console.log(req.body);

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
        await newUser
          .save()
          .then(() => {
            res.status(200).send(newUser);
          })
          .catch((err) => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("Email already exists...");
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
        res.send("Email not exist");
      } else {
        if (profile.password == newUser.password) {
          res.send("User authenticated");
        } else {
          res.send("User Unauthorized Access");
        }
      }
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
