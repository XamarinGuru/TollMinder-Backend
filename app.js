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

// Init models
const models = require("./Models/All");

// Configure application
app.use(require('body-parser')());

app.set('models', models);
// Init controllers (routes)
const user = require('./Controllers/User');
const validator = require('./Controllers/Validator');
const file = require('./Controllers/File');
const tollRoad = require('./Controllers/TollRoad');
const wayPoint = require('./Controllers/WayPoint');
const tollPoint = require('./Controllers/TollPoint');

// Attach controllers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  req.app = app;
  next();
});
app.use('/doc', express.static(path.join(__dirname, 'public')));
app.use('/user', user);

app.use('/tollRoad', tollRoad);
app.use('/wayPoint', wayPoint);
app.use('/tollPoint', tollPoint);

app.use('/validator', validator);
app.use('/file', file);


app.listen(conf.port, () => console.log(`REST API listen on ${conf.port} port`));