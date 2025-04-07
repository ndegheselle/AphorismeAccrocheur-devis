import { Client, Databases, Account } from 'appwrite';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('67dd2fe50025a388a4ea');

export const account = new Account(client);
export const databases = new Databases(client);

export const databaseId: string = "67dda6ca000771a6a0f1";
export const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};