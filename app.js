/**
 * @name Tollminder backend
 * @author Kreshchenko Nickolay
 * @created 03.11.2016
 * @version 0.0.1
 */

// Require dependencies
const app = require('express')();
const conf = require('./conf');
const dummyData = require('./dummyData');
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

// Attach controllers
app.use((req, res, next) => {
  req.app = app;
  next();
});
app.use('/user', user);

dummyData()
.then(app.listen(conf.port, () => console.log(`REST API listen on ${conf.port} port`)));