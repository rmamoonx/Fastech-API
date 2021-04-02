require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const signupRoutes = require("./api/routes/signup");
const userRoutes = require("./api/routes/user");

const port = process.env.PORT || 3000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.raw());

const myurl = process.env.DB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("useFindAndModify", false);
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

app.use("/signup", signupRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
