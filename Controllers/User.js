const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.user;
  if (!req.headers['authorization']) return res.status(403).json({err: 'Not found auth header'});
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in url'});
  User.read(req.params._id, req.headers['authorization'])
  .then(result => {
    if (!result) return res.status(404).json({err: 'User not found'});
    return res.status(200).json(result)
  })
  .catch((err, code) => res.status(code || 500).json({err}));
});

// Sign up (phone strategy)
router.post('/signup', (req, res) => {
  let User = req.app.locals.settings.models.user;
  let {name, phone, email, password, source, photo} = req.body;
  if (!source && !phone) return res.status(400).json({err: 'Bad oauth'});
  else if (!phone || !password) return res.status(400).json({err: 'Missed phone or password'});
  let user = {name, phone, password, email, source, photo};
  User.create(user)
  .then(result => res.status(200).json(result))
  .catch((err, code) => res.status(code || 500).json({err}));
});

router.post('/signin', (req, res) => {
  let User = req.app.locals.settings.models.user;
  let {phone, password} = req.body;
  if (!phone || !password) return res.status(400).json({err: 'Missed phone or password'});
  User.auth(phone, password)
  .then(result => res.status(200).json(result))
  .catch((err, code) => res.status(code || 500).json({err}));
});

router.delete('/signout/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.user;
  let {_id} = req.params;
  if (!req.headers['authorization']) return res.status(400).json({err: 'Not found auth header'});
  if (!_id) return res.status(400).json({err: 'Not found `_id` in path'});
  User.out(_id, req.headers['authorization'])
  .then(result => res.status(200).json(result))
  .catch((err, code) => res.status(code || 500).json({err}));
 });

router.put('/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.user;
  if (!req.headers['authorization']) return res.status(400).json({err: 'Not found auth header'});
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let {name, email, photo, phone} = req.body;
  let changes = {name, email, photo, phone};
  User.update(req.params._id, req.headers['authorization'], changes)
  .then(result => res.status(200).json(result))
  .catch((err, code) => res.status(code || 500).json({err}));
});

router.post('/forgotPassword', (req, res) => {

});

module.exports = router;