import { UmaySDK } from 'umay-render';
import fs from 'fs';

const client = new UmaySDK();
const pdfBuffer = await client.toPDF('<html><body><h1>Hello World</h1></body></html>', {
  format: 'A4',
  landscape: false,
  printBackground: true
});

fs.writeFileSync('document.pdf', pdfBuffer);