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

router.post('/paymentHistoryPdf', (req ,res) => {
  if (!fs.existsSync(conf.uploadDir)) fs.mkdirSync(conf.uploadDir, '0777');
  let fileName = generateName();
  let {Trip} = req.app.locals.settings.models;
  let query = req.body.showAll ? { _user: req.body.user } :
      { paymentDate: { $gte: new Date(req.body.range.from), $lt: new Date(req.body.range.to)}, _user: req.body.user };
  Trip.Trip.find(query).populate('_tollRoad _rate').exec()
    .then(trips => {
      let html = generateHtml(trips);
      return Converter.htmlToPDF(html, `${conf.uploadDir}/${fileName}`);
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
  let dataTemp = data.map(trip => {
    return {
      paymentDate: trip.paymentDate.toLocaleString(),
      transaction: trip._transaction || 'transaction id', // look in transaction schema which field "transaction ID"
      tollRoad: trip._tollRoad ? trip._tollRoad.name : 'name',
      amount: trip._rate ? trip._rate.cost : 'cost'
    }
  });
  let transform = {
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
  };
  let html = json2html.transform(dataTemp, transform);
  html = '<table border="1" cellpadding="5" cellspacing="0" style="font-size: 12px"><tbody><tr><td>Billing Date</td><td>Transaction ID</td><td>' +
      'Toll Road</td><td>Amount</td></tr>' + html + '</tbody></table>';
  return html;
}