import { databases, databaseId, collections } from '$lib/appwrite';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Role, Query } from "appwrite";
import { IsEmail, IsOptional, IsNotEmpty, IsPhoneNumber, validate, ValidationError } from "class-validator";

export class Client {
    $id?: string;
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    adress: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    zipCode: string;

    @IsOptional()
    @IsEmail()
    email?: string = undefined;
    @IsOptional()
    @IsPhoneNumber()
    phone?: string = undefined;

    async checkErrors() : Promise<ValidationError[]> {
        return await validate(this);
    }
}

async function create(client: Client) {
    if (auth.currentUser == null)
        throw new Error("User is not connected.");

    return await databases.createDocument(databaseId, collections.clients, ID.unique(), client,
        [
            Permission.read(Role.user(auth.currentUser.$id)),
            Permission.update(Role.user(auth.currentUser.$id)),
            Permission.delete(Role.user(auth.currentUser.$id))
        ]);
}

async function getAll(limit: number, offset: number): Promise<Client[]>
{
    let result = await databases.listDocuments(databaseId, collections.clients, [
        Query.limit(limit),
        Query.offset(offset)
    ]);
    let clients: Client[] = result.documents.map(doc => Object.assign(new Client(), doc));
    return clients;
}

async function getById(id: string): Promise<Client>
{
    let result = await databases.getDocument(databaseId, collections.clients, id);
    return Object.assign(new Client(), result);
}

export const repository = {
    create,
    getAll,
    getById
};