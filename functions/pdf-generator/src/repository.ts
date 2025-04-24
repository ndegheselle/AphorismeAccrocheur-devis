import { Client, Databases } from 'node-appwrite';

let databases: Databases;
let databaseId = "67dda6ca000771a6a0f1";
const bucketId = "67f4d5c000293a2abc0f";
const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};

async function getEstimateById(id: string)
{
    return await databases.getDocument(databaseId, collections.estimates, id);
}

async function getBusiness()
{
    let result = await databases.listDocuments(databaseId, collections.business);
    if (result.documents.length == 0)
        return null;
    return result.documents[0];
}

async function init(client: Client)
{
    databases = new Databases(client); 
}

export default {
    init,
    getEstimateById,
    getBusiness
};