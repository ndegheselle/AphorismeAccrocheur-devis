import { generateFakeOrder } from './faker.js';

export default async ({ res, log }) => {
  const fakeOrder = generateFakeOrder();
  log(`Generated fake order: ${JSON.stringify(fakeOrder, null, 2)}`);
  const content = 'Some content!';
  fs.writeFileSync('file.txt', content);
  log("Writting ...")
  const bytes = await fs.readFile('file.txt');
  log("Sending ...")
  return res.binary(bytes);
};
