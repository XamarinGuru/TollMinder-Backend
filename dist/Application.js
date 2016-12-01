'use strict';

/**
 * @name Tollminder backend
 * @author Kreshchenko Nickolay
 * @created 03.11.2016
 * @version 0.0.1
 */

// Require dependencies
var express = require('express');
var app = express();
var path = require('path');
var conf = require('./conf');
var mongoose = require('mongoose');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(conf.mongoURI);

// Init models
var models = require("./Models/All");

// Configure application
app.use(require('body-parser')());
app.use(require('express-fileupload')());

app.set('models', models);
// Init controllers (routes)
var user = require('./Controllers/User');
var validator = require('./Controllers/Validator');
var file = require('./Controllers/File');
var tollRoad = require('./Controllers/TollRoad');
var wayPoint = require('./Controllers/WayPoint');
var tollPoint = require('./Controllers/TollPoint');
var sync = require('./Controllers/SyncData');

// Attach controllers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  req.app = app;
  next();
});

// Set public dirs
app.use('/api/doc', express.static(path.join(__dirname, 'Documentation')));
app.use('/api/uploads', express.static(path.join(__dirname, 'Uploads')));

// Set routes
app.use('/api/user', user);
app.use('/api/sync', sync);
app.use('/api/file', file);
app.use('/api/validator', validator);

// Routes for admin panel
app.use('/api/tollRoad', tollRoad);
app.use('/api/wayPoint', wayPoint);
app.use('/api/tollPoint', tollPoint);

module.exports = app;