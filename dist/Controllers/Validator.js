'use strict';

var router = require('express').Router();

router.post('/phone', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body = req.body,
      phone = _req$body.phone,
      code = _req$body.code;

  if (!phone || !code) return res.status(400).json({ err: 'Bad request' });
  User.validatePhone(phone, code).then(function (_) {
    return res.status(200).send({ msg: 'Validate success!' });
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.get('/email/:_id?', function (req, res) {
  var User = req.app.locals.settings.models.User;

  if (!req.params._id || !req.query.hash) return res.status(400).json({ err: 'Bad request' });
  User.validateEmail(req.params._id, req.query.hash).then(function (_) {
    return res.status(200).send({ msg: 'Validate success!' });
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;