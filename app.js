'use strict';

const express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

//mongoose
mongoose.connect('mongodb://mongodb:27017/tybadb',
  {
    useNewUrlParser: true
  }
);
var { userModel } = require('./models/user');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR: '));
db.once('open', () => {
  console.log('CONNECTION SUCCESS: Connected successfully');
});


// App
const app = express();
app.use(helmet());
app.disable('x-powered-by');

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

//Main
app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});

//Register
app.post('/api/register', async (req, res, next) => {
  try {
    const userCollection = db.collection('users');
    const auditCollection = db.collection('audit');
    const user = req.body;
    const result = await userCollection.insertOne(user);
    if (result.insertedId)
    {
      result.time = Date.now(); 
      await auditCollection.insertOne(result);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result);
    }
    else{
      console.log('ERROR: An error appeared error when trying to insert the user');
      res.status(400).send('ERROR: An error appeared error when trying to insert the user');
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).send(`ERROR: ${error}`);
  }
});

//Login
app.get('/api/login', async (req, res) => {
  try {
    const userCollection = db.collection('users');
    const auditCollection = db.collection('audit');
    const user = req.body;
    const result = await userCollection.findOne(user);
    if(result)
    { 
      user.time = Date.now(); 
      await auditCollection.insertOne(user);
      console.log(`Login succesfully: ${JSON.stringify(result)}`);
      res.send(result);
    }
    else{

      console.log('ERROR: User or password are incorrectly');
            res.status(401).send('User or password are incorrectly');
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).send(`ERROR: ${error}`);
  }
});

//Logout
app.get('/api/logout', (req, res) => {
  res.send('Logout');
});

//Endpoint user with authorization cities and restaurants
app.get('/api/restaurants', (req, res) => {
  //Axios for call google maps api
  res.send('Restaurants');
});

//Audit
app.get('/api/audit',async (req, res) => {
  try {
    const auditCollection = db.collection('audit');
    const result = await auditCollection.find().toArray();
    if(result)
    { 
      console.log(`Audit found succesfully: ${JSON.stringify(result)}`);
      res.send(result);
    }
    else{

      console.log('ERROR: An error appeared error when trying to get info');
            res.status(404).send('An error appeared error when trying to get info');
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).send(`ERROR: ${error}`);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
