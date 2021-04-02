const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
var saltRounds = 10;

router.post("/", async (req, res) => {
  var newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
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
                res.status(200).json({ newUser });
              })
              .catch((err) => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.status(200).json({ message: "User already exists..." });
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});
module.exports = router;
