import { client } from './appwrite.js';
import html from './lib/html.js';
import pdf from './lib/pdf.js';
import { repository } from './lib/models/estimates.js';

export default async ({ req, res, log }) => {
  if (req.headers['x-appwrite-user-jwt']) {
    client.setJWT(req.headers['x-appwrite-user-jwt'])
  } else {
    return res.text("Access denied: This function requires authentication. Please sign in to continue.");
  }

  const params = req.bodyJson;
  const estimate = await repository.getById(params.id);
  const htmlContent = await html.generate("estimate", estimate);
  const pdfBuffer = await pdf.generate(htmlContent);
  return res.binary(pdfBuffer, 200, { 'Content-Type': 'application/pdf' });
};