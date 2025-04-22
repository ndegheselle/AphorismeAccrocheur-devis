import { generateFakeOrder } from './faker.js';
import { createPdf } from './pdf.js';

export default async ({ res, log }) => {
  const fakeOrder = generateFakeOrder();
  log(`Generated fake order: ${JSON.stringify(fakeOrder, null, 2)}`);

  const pdfBuffer = await createPdf(fakeOrder);
  log('PDF created.');

  return res.binary(pdfBuffer);
};
