import { Client, Databases } from 'appwrite';

const client = new Client();
client
.setEndpoint(process.env.APPWRITE_ENDPOINT)
.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
.setKey(process.env.APPWRITE_API_KEY);

export const databases = new Databases(client);

export const bucketId = "67f4d5c000293a2abc0f";
export const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};