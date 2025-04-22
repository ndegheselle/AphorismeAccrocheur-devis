import * as fs from 'fs';
import { generateFakeOrder } from './faker.js';

type Context = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

export default async ({ res, req, log, error }: Context) => {
  const fakeOrder = generateFakeOrder();
  log(`Generated fake order: ${JSON.stringify(fakeOrder, null, 2)}`);
  const content = 'Some content!';
  fs.writeFileSync('file.txt', content);
  log("Writting ...")
  const bytes = fs.readFileSync('file.txt');
  log("Sending ...")
  return res.binary(bytes);
};
