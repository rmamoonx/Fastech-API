const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3000
const User = require('./models/User');

app.use(bodyParser.json());


const uri = "mongodb+srv://fastech:<password>@fastech.okn4v.mongodb.net/Fastech?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("Database is connected");
  client.close();
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post("/signup", async (req, res) => {
    var newUser = new User({
      firstName: req.body.fname,
      lasttName: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      role : req.body.role
    });
    await newUser
      .save()
      .then(() => {
        res.status(200).send(newUser);
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
  });




app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
