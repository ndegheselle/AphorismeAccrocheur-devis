import pdf from 'html-pdf';
import fs from 'fs';

function generate(htmlContent) {
  const options = {
    format: 'A4',
    border: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    },
    footer: {
      height: '10mm',
      contents: {
        default: '<span style="color: #444; font-size: 10px; text-align: center; width: 100%; display: block;">Page {{page}} of {{pages}}</span>'
      }
    }
  };

  return new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(buffer);
    });
  });
}

export default {
  generate
}