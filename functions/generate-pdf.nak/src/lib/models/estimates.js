import { collections, database } from "../../appwrite.js";

async function getById(id)
{
    return await database.db.getDocument(database.id, collections.estimates, id);
}

export const repository = {
    getById
};