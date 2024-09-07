import { Client, Account } from 'appwrite';

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('66db024a00365da1c373');

export const account = new Account(client);
export { ID } from 'appwrite';