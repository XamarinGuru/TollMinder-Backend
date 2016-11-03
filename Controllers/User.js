const router = require('express').Router();

router.get('/:_id', (req, res) => {
  let {_id} = req.params
  if (_id) return res.status(400).json({err: 'Not found `_id` in request URL'});
});

// Sign up
router.post((req,res) => {
  // some code...
});



module.exports = router;