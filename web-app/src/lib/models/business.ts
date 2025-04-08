import { databases, databaseId, collections } from '$lib/appwrite';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Role, Query } from "appwrite";
import { copyFrom } from '$lib/base/class';

export class Business {
    $id?: string;
    businessName: string;
    lastName: string;
    adress: string;
    city: string;
    zipCode: string;

    email?: string = undefined;
    phone?: string = undefined;
    logoId?: string = undefined;

    get fullAddress() : string {
        return `${this.adress}, ${this.city}, ${this.zipCode}`;
    }
}

async function getFirstOrDefault(): Promise<Business | null>
{
    let result = await databases.listDocuments(databaseId, collections.business);
    if (result.documents.length == 0)
        return null;
    return copyFrom(Business, result.documents[0]);
}

async function create(business: Business) : Promise<Business>{
    if (auth.currentUser == null)
        throw new Error("User is not connected.");

    let result =  await databases.createDocument(databaseId, collections.business, ID.unique(), business,
        [
            Permission.read(Role.user(auth.currentUser.$id)),
            Permission.update(Role.user(auth.currentUser.$id)),
            Permission.delete(Role.user(auth.currentUser.$id))
        ]);
    return copyFrom(Business, result);
}

async function update(business: Business): Promise<Business>
{
    if (business.$id == null)
        throw new Error("Client ID is null.");
    
    let result = await databases.updateDocument(databaseId, collections.clients, business.$id, business);
    return copyFrom(Business, result);
}

export const repository = {
    getFirstOrDefault,
    create,
    update
};