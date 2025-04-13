import { databases, collections } from "../../appwrite.js";

async function getById(id)
{
    return await databases.getDocument(databaseId, collections.estimates, id);
}

export const repository = {
    getById
};