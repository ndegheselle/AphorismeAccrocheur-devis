import { Client, Databases } from 'node-appwrite';

let database: Databases;
let databaseId = "67dda6ca000771a6a0f1";
const bucketId = "67f4d5c000293a2abc0f";
const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};

async function getById(id: string)
{
    return await database.getDocument(databaseId, collections.estimates, id);
}

async function init(client: Client)
{
    database = new Databases(client); 
}

export default {
    init,
    getById
};