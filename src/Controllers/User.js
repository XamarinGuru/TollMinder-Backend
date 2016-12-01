const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.User;
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
  let User = req.app.locals.settings.models.User;
  let {name, phone, email, password, source, photo} = req.body;
  if (!source && !phone && !email) return res.status(400).json({err: 'Bad oauth'});
  else if (!phone || !password) return res.status(400).json({err: 'Missed phone or password'});
  let user = {name, phone, password, email, source, photo};
  User.create(user)
  .then(result => res.status(200).json(result))
  .catch((err) => {
    console.log(err);
    res.status(err.code || 500).json({err: err.message})
  });
});

router.post('/signin', (req, res) => {
  let User = req.app.locals.settings.models.User;
  let {phone, password} = req.body;
  if (!phone || !password) return res.status(400).json({err: 'Missed phone or password'});
  User.auth(phone, password)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.delete('/signout/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.User;
  let {_id} = req.params;
  if (!req.headers['authorization']) return res.status(401).json({err: 'Not found auth header'});
  if (!_id) return res.status(400).json({err: 'Not found `_id` in path'});
  User.out(_id, req.headers['authorization'])
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
 });

router.put('/:_id?', (req, res) => {
  let User = req.app.locals.settings.models.User;
  if (!req.headers['authorization']) return res.status(401).json({err: 'Not found auth header'});
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let {name, email, photo, phone} = req.body;
  let changes = {name, email, photo, phone};
  User.update(req.params._id, req.headers['authorization'], changes)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.post('/forgotPassword', (req, res) => {
  let User = req.app.locals.settings.models.User;
  let {phone, email} = req.body;
  if (phone || email) {
    User.forgotPassword({phone, email})
    .then(result => res.status(200).json(result))
    .catch((err) => res.status(err.code || 500).json({err: err.message}));
  } else {
    return res.status(400).json({err: 'Not found `email` or `phone` in request body'});
  }
});

router.post('/adminAuth', (req, res) => {
  let User = req.app.locals.settings.models.User;
  let {name, password} = req.body;
  if (!name || !password) return res.status(400).json({err: 'Bad request'});
  User.authInAdminPanel(name, password)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.post('/oauth', (req, res) => {
  let User = req.app.locals.settings.models.User;
  let {email, source} = req.body;
  User.oauth(email, source)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;