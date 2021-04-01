const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3000
const User = require('./models/User');
var db = require("./db/db").myurl;

app.use(bodyParser.json());


const uri = "mongodb+srv://fastech:<password>@fastech.okn4v.mongodb.net/Fastech?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
