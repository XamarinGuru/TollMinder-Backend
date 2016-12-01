'use strict';

var router = require('express').Router();
var fs = require('fs');
var conf = require('./../conf');

router.post('/', function (req, res) {
  var file = req.files.file;

  console.log(file);

  if (!fs.existsSync(conf.uploadDir)) fs.mkdirSync(conf.uploadDir, 777);
  var filename = (Date.now() + '-' + file.name).replace(/ /igm, '_');
  file.mv(conf.uploadDir + '/' + filename, function (err) {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ link: conf.host + '/Uploads/' + filename });
  });
});

module.exports = router;