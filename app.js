/**
 * @name Tollminder backend
 * @author Kreshchenko Nickolay
 * @created 03.11.2016
 * @version 0.0.1
 */

// Require dependencies
const app = require('express')();
const conf = require('./conf');
const mongoose = require('mongoose');
const swagger = require('swagger-express');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(conf.mongoURI);

// Configure application
app.use(require('body-parser')());

// Init controllers (routes)
const user = require('./Controllers/User');

// Attach controllers
app.use('/user', user);

// Start http listening
app.listen(conf.port, () => console.log(`REST API listen on ${conf.port} port`))