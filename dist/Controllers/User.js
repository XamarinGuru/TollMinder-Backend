'use strict';

var router = require('express').Router();

router.get('/:_id?', function (req, res) {
  var User = req.app.locals.settings.models.User;
  if (!req.headers['authorization']) return res.status(403).json({ err: 'Not found auth header' });
  if (!req.params._id) return res.status(400).json({ err: 'Not found `user id` in url' });
  User.read(req.params._id, req.headers['authorization']).then(function (result) {
    if (!result) return res.status(404).json({ err: 'User not found' });
    return res.status(200).json(result);
  }).catch(function (err, code) {
    return res.status(code || 500).json({ err: err });
  });
});

// Sign up (phone strategy)
router.post('/signup', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body = req.body,
      name = _req$body.name,
      phone = _req$body.phone,
      email = _req$body.email,
      password = _req$body.password,
      source = _req$body.source,
      photo = _req$body.photo;

  if (!source && !phone && !email) return res.status(400).json({ err: 'Bad oauth' });else if (!phone || !password) return res.status(400).json({ err: 'Missed phone or password' });
  var user = { name: name, phone: phone, password: password, email: email, source: source, photo: photo };
  User.create(user).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    console.log(err);
    res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/signin', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body2 = req.body,
      phone = _req$body2.phone,
      password = _req$body2.password;

  if (!phone || !password) return res.status(400).json({ err: 'Missed phone or password' });
  User.auth(phone, password).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.delete('/signout/:_id?', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _id = req.params._id;

  if (!req.headers['authorization']) return res.status(401).json({ err: 'Not found auth header' });
  if (!_id) return res.status(400).json({ err: 'Not found `_id` in path' });
  User.out(_id, req.headers['authorization']).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.put('/:_id?', function (req, res) {
  var User = req.app.locals.settings.models.User;
  if (!req.headers['authorization']) return res.status(401).json({ err: 'Not found auth header' });
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var _req$body3 = req.body,
      name = _req$body3.name,
      email = _req$body3.email,
      photo = _req$body3.photo,
      phone = _req$body3.phone;

  var changes = { name: name, email: email, photo: photo, phone: phone };
  User.update(req.params._id, req.headers['authorization'], changes).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/forgotPassword', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body4 = req.body,
      phone = _req$body4.phone,
      email = _req$body4.email;

  if (phone || email) {
    User.forgotPassword({ phone: phone, email: email }).then(function (result) {
      return res.status(200).json(result);
    }).catch(function (err) {
      return res.status(err.code || 500).json({ err: err.message });
    });
  } else {
    return res.status(400).json({ err: 'Not found `email` or `phone` in request body' });
  }
});

router.post('/adminAuth', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body5 = req.body,
      name = _req$body5.name,
      password = _req$body5.password;

  if (!name || !password) return res.status(400).json({ err: 'Bad request' });
  User.authInAdminPanel(name, password).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/oauth', function (req, res) {
  var User = req.app.locals.settings.models.User;
  var _req$body6 = req.body,
      email = _req$body6.email,
      source = _req$body6.source;

  User.oauth(email, source).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;