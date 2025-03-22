import { Client, Account } from 'appwrite';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('67dd2fe50025a388a4ea');

export const account = new Account(client);
export { ID } from 'appwrite';