var router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let User =  req.app.locals.settings.models.user;
  if (!req.headers['Authorization']) return res.status(400).json({err: 'Not found auth header'});
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in url'});
  User.read(req.params)
  .then(result => {
    if (!result) return res.status(404).json({err: 'User not found'});
    return res.status(200).json(result)
  })
  .catch(err => res.status(500).json({err}));
});

// Sign up (email strategy)
router.post('/', (req, res) => {
  let User =  req.app.locals.settings.models.user;
  let {name, email, password} = req.body;
  if (!email || !password) return res.status(400).json({err: 'Bad request'});
  let user = {name, email, password};
  User.create(user)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({err}));
});




module.exports = router;