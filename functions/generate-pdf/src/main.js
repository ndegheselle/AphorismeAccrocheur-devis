
import Generation from './lib/generation.js';

Generation();
/*
export default async ({ req, res, log }) => {
  // Initialize the Databases service
  const databases = new Databases(client);
  // Get the user data from the event payload
  const user = req.bodyJson;

  const fakeOrder = generateFakeOrder();
  log(`Generated fake order: ${JSON.stringify(fakeOrder, null, 2)}`);

  const pdfBuffer = await createPdf(fakeOrder);
  log('PDF created.');

  return res.binary(pdfBuffer, 200, { 'Content-Type': 'application/pdf' });
};
*/