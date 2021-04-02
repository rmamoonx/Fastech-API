const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
var saltRounds = 10;

router.post("/", async (req, res) => {
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
              const token = jwt.sign(
                {
                  email: profile.email,
                  id: profile._id,
                },
                process.env.secret,
                {
                  expiresIn: "1h",
                }
              );
              res
                .status(200)
                .json({ message: "User authenticated", token: token });
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
module.exports = router;
