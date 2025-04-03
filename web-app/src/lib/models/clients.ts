import { databases, databaseId, collections } from '$lib/appwrite';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Role, Query } from "appwrite";
import { copyFrom } from '$lib/base/class';
import { PaginatedResults} from '$lib/base/results';

export class Client {
    $id?: string;
    firstName: string;
    lastName: string;
    adress: string;
    city: string;
    zipCode: string;

    email?: string = undefined;
    phone?: string = undefined;

    get fullName() : string {
        return `${this.firstName} ${this.lastName}`;
    }
    get fullAddress() : string {
        return `${this.adress}, ${this.city}, ${this.zipCode}`;
    }
}

async function create(client: Client) : Promise<Client>{
    if (auth.currentUser == null)
        throw new Error("User is not connected.");

    let result =  await databases.createDocument(databaseId, collections.clients, ID.unique(), client,
        [
            Permission.read(Role.user(auth.currentUser.$id)),
            Permission.update(Role.user(auth.currentUser.$id)),
            Permission.delete(Role.user(auth.currentUser.$id))
        ]);
    return copyFrom(Client, result);
}

async function getAll(page: number, capacity: number): Promise<PaginatedResults<Client>>
{
    let result = await databases.listDocuments(databaseId, collections.clients, [
        Query.limit(capacity),
        Query.offset((page - 1) * capacity)
    ]);
    let clients: Client[] = result.documents.map(doc => copyFrom(Client, doc));
    return new PaginatedResults<Client>(clients, result.total, page, capacity);
}

async function search(search: string, page: number, capacity: number): Promise<PaginatedResults<Client>>
{
    let result = await databases.listDocuments(databaseId, collections.clients, [
        Query.limit(capacity),
        Query.offset((page - 1) * capacity),
        Query.or([
            Query.contains('firstName', search),
            Query.contains('lastName', search),
            Query.contains('adress', search),
            Query.contains('city', search),
            Query.contains('zipCode', search)
        ])
    ]);
    let clients: Client[] = result.documents.map(doc => copyFrom(Client, doc));
    return new PaginatedResults<Client>(clients, result.total, page, capacity);
}


async function getById(id: string): Promise<Client>
{
    let result = await databases.getDocument(databaseId, collections.clients, id);
    return copyFrom(Client, result);
}

async function update(client: Client): Promise<Client>
{
    if (client.$id == null)
        throw new Error("Client ID is null.");
    
    let result = await databases.updateDocument(databaseId, collections.clients, client.$id, client);
    return copyFrom(Client, result);
}

async function remove(id: string): Promise<void>
{
    await databases.deleteDocument(databaseId, collections.clients, id);
}

export const repository = {
    create,
    getAll,
    getById,
    update,
    remove,
    search
};