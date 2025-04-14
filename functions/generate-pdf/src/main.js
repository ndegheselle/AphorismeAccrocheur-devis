import { Client, Databases } from 'node-appwrite';
import { database } from './appwrite.js';
import html from './lib/html.js';
import { repository } from './lib/models/estimates.js';
import pdf from './lib/pdf.js';

export default async ({ req, res, log }) => {

  const client = new Client()
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);

  if (req.headers['x-appwrite-user-jwt']) {
    client.setJWT(req.headers['x-appwrite-user-jwt'])
  } else {
    return res.text("Access denied: This function requires authentication. Please sign in to continue.");
  }

  database.db = new Databases(client);

  const params = req.bodyJson;
  const estimate = await repository.getById(params.id);
  const htmlContent = await html.generate("estimate", estimate);
  const pdfBuffer = await pdf.generate(htmlContent);
  return res.binary(pdfBuffer, 200, { 'Content-Type': 'application/pdf' });
};