const router = require('express').Router();
const fs = require('fs');
const conf = require('./../conf');

router.post('/', (req ,res) => {
  let {file} = req.files;
  console.log(file);

  if (!fs.existsSync(conf.uploadDir)) fs.mkdirSync(conf.uploadDir, 777);
  let filename = `${Date.now()}-${file.name}`.replace(/ /igm, '_');
  file.mv(`${conf.uploadDir}/${filename}`, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({link : `${conf.host}/Uploads/${filename}`});
  });
});

module.exports = router;