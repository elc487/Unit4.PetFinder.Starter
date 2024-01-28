// import the pets array from data.js
const exp = require('constants');
const pets = require('./data');

// init express app
const express = require('express')
//import path
const path = require("path");

//this happens when you tab too fast before selecting require('express');
//leaving this here for posterity
// const { escape } = require('querystring');

const app = express();


const PORT = 8080;


//adding static path for serving html/react app
// this is a huge lift. not sure i will get to it.
app.use(express.static(path.join(__dirname,"public")))

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + "/public/index.html")
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner= req.query.owner;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner.toLowerCase() === owner.toLowerCase());
    

    // send the pet as a response
    res.send(pet)

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.query.name;
   

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());

    // send the pet as a response
    res.send(pet)

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;