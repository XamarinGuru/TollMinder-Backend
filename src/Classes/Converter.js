const conf = require('./../conf');
const htmlToPdf = require('html-pdf');

class Converter {

  static htmlToPDF(html, pdfDist){
    let options = {
      format: 'A4',
      orientation: "portrait" ,
      border: {
        top: "1in",
        right: "1in",
        bottom: "0.5in",
        left: "0.5in"
      },
    };
    return new Promise((resolve, reject) => {
      htmlToPdf.create(html, options)
      .toFile(pdfDist, (err, success) => {
        if (err) return reject(err);
        return resolve(success);
      })
    })
  }
}

module.exports = Converter;
