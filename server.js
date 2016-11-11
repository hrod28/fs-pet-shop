"use strict";
// get express
var express = require('express');
var app = express();
var pets = require('./pets.json');

// dependencies
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

// GET All pets
app.get('/pets', function (req, res, next) {
  res.status(200).send(pets);
});
// GET a Single Pet
app.get('/pets/:index', function (req, res, next) {
  if (pets[req.params.index]) {
    res.status(200).send(pets[req.params.index]);
  } else {
  res.contentType('text/plain'),
  res.send(404).send('Not Found');
  }
});
// GET anything other than "/pets" will not be found
app.get('/*', function (req, res, next) {
  (res.status(404).send('Not Found'));
});
// POST the pet if all fields are valid
app.post('/pets',function (req, res, next) {
  let body = req.body;
  if(!body.name || !body.kind || !body.age) {
    res.contentType('text/plain');
    res.status(400).send('Bad Request');
  } else {
    pets.push(body);
    res.status(201).send(pets);
  }
});

// PUT a pet at a index that already exists (replace)
app.put('/pets/:index', function (req, res) {
  let index = Number.parseInt(req.params.index);
  let pet = req.body;
  // validate the inputted index exist
  if (typeof Number(index) || index < 0 || index >= pets.length) {
    return res.status(404).send({
      message: 'Index of pets not found',
      data: index
    });
  }
  if (!pet) {
    return res.sendStatus(404);
  }
  res.send(pet[index]);
});
// DELETE a pet at the specified index
app.delete('/pets/:index', function (req, res) {
  let index = Number.parseInt(req.params.index);
  let pet = pets.splice(index, 1)[0];
  // validate the index inputted exists
  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }
  res.send(pet);
});
// establish Port 3000
app.listen(8000, function(){
  console.log('listening on 8000');
});
