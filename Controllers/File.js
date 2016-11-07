const router = require('express').Router();

router.post('/', (req ,res) => {
  res.status(200).json({msg: 'in developing...'});
});

module.exports = router;