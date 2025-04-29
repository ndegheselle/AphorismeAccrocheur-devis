import { Client } from 'node-appwrite';
import html from './html.js';
import pdf from "./pdf.js";
import repository from './repository.js';

type Context = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

export default async ({ res, req, log, error }: Context) => {

  if (!process.env.APPWRITE_FUNCTION_PROJECT_ID)
    throw new Error("Invalid environement variables.");

  const client = new Client().setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);

  if (req.headers['x-appwrite-user-jwt']) {
    client.setJWT(req.headers['x-appwrite-user-jwt'])
  } else {
    return res.json({"error": "Access denied: This function requires authentication. Please sign in to continue."}, 401);
  }

  const params = req.query;
  if (!params.id)
    throw new Error("Missing 'id' query parameter.");

  repository.init(client);
  pdf.init(log);

  const business = await repository.getBusiness();
  const estimate = await repository.getEstimateById(params.id);
  let estimateClient;
  if (estimate.clientId)
    estimateClient = await repository.getClientById(estimate.clientId);

  const htmlContent = await html.generateEstimate(business, estimateClient, estimate);
  const pdfBuffer = await pdf.htmlToPdfBuffer(htmlContent);

  return res.binary(pdfBuffer);
};
