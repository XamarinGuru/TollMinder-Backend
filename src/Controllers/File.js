const router = require('express').Router();
const fs = require('fs');
const conf = require('./../conf');
const Converter = require('./../Classes/Converter');
const crypto = require('crypto');

router.post('/', (req ,res) => {
  let {file} = req.files;
  console.log(file);

  if (!fs.existsSync(conf.uploadDir)) fs.mkdirSync(conf.uploadDir, '0777');
  let filename = `${Date.now()}-${file.name}`.replace(/ /igm, '_');
  file.mv(`${conf.uploadDir}/${filename}`, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({link : `${conf.host}/uploads/${filename}`});
  });
});

router.post('/convertHtmlToPdf', (req ,res) => {
  if (!fs.existsSync(conf.uploadDir)) fs.mkdirSync(conf.uploadDir, '0777');
  let {Trip} = req.app.locals.settings.models;

  let fileName = generateName();
  console.log(req.body.html);
  Converter.htmlToPDF(req.body.html.trim(), `${conf.uploadDir}/${fileName}`)
  .then(() => res.status(200).json({link : `${conf.host}/uploads/${fileName}`}))
  .catch((err) => res.status(500).json(err));
});

router.delete('/:filename?', (req, res) => {
  let {filename} = req.params;
  if (!filename) return res.status(400).json({err: 'Bad request'});
  if (!fs.existsSync(`${conf.uploadDir}/${filename}`)) return res.status(404).json({err: 'File not found'});
  fs.unlinkSync(`${conf.uploadDir}/${filename}`);
  res.status(200).json({msg: 'Success'});
});

module.exports = router;

// functions

function generateName() {
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.pdf`;
}
