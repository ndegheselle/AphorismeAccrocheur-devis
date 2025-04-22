import { Account, Client, Databases, Functions, Storage } from 'appwrite';

export const projectId = "67dd2fe50025a388a4ea";
export const endpoint = "https://cloud.appwrite.io/v1";

const client = new Client();
client
.setEndpoint(endpoint)
.setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export const databaseId: string = "67dda6ca000771a6a0f1";
export const bucketId: string = "67f4d5c000293a2abc0f";
export const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};
export const functionIds = {
    generatePDF: "680775eb002749cc755b"
}