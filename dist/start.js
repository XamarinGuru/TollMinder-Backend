'use strict';

var app = require('./Application');
var conf = require('./conf');

app.listen(conf.port, function () {
  return console.log('REST API listen on ' + conf.port + ' port');
});