const router = require('express').Router();
const fs = require('fs');
const conf = require('./../conf');
const Converter = require('./../Classes/Converter');
const crypto = require('crypto');
const json2html = require('node-json2html');

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
  let query = req.body.showAll ? {} : { paymentDate: { $gte: new Date(req.body.range.from), $lt: new Date(req.body.range.to) }};
  Trip.find(query).populate('_tollRoad _rate').exec()
    .then(trips => {
      let html = generateHtml(trips);
      let fileName = generateName();
      console.log(html);
      Converter.htmlToPDF(html.trim(), `${conf.uploadDir}/${fileName}`);
    })
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


function generateHtml(data) {
  let transform = {"<>":"table","html":[
    {"<>":"tbody","html":[
      {"<>":"tr","html":[
        {"<>":"td","html":"Billing Date"},
        {"<>":"td","html":"Transaction ID"},
        {"<>":"td","html":"Toll Road"},
        {"<>":"td","html":"Amount"}
      ]}
    ]}
  ]};
  let dataTemp = data.map(trip => {
    return {
      paymentDate: trip.paymentDate,
      transaction: trip._transaction, // look in transaction schema which field "transaction ID"
      tollRoad: trip._tollRoad.name,
      amount: trip._rate.cost
    }
  });
  data.map(() => {
    json.html[0].html.push({
      "<>": "tr",
      "html": [{
        "<>": "td",
        "html": "${paymentDate}"
      },{
        "<>": "td",
        "html": "${transaction}"
      },{
        "<>": "td",
        "html": "${tollRoad}"
      }, {
        "<>": "td",
        "html": "${amount}"
      }]
    });
  });
  return json2html.transform(dataTemp, transform);
}
