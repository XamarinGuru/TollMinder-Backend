/**
 * @name Tollminder backend
 * @author Kreshchenko Nickolay
 * @created 03.11.2016
 * @version 0.0.1
 */

// Require dependencies
const express = require('express');
const app = express();
const path = require('path');
const conf = require('./conf');
const mongoose = require('mongoose');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(conf.mongoURI);

// Configure application
app.use(require('body-parser')());
// Init models
const models = require("./Models/All");

app.set('models', models);
// Init controllers (routes)
const user = require('./Controllers/User');

const validator = require('./Controllers/Validator');

// Attach controllers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  req.app = app;
  next();
});
app.use('/doc', express.static(path.join(__dirname, 'public')));
app.use('/user', user);
app.use('/validator', validator)

app.listen(conf.port, () => console.log(`REST API listen on ${conf.port} port`));