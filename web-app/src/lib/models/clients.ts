import { databases, databaseId, collections } from '$lib/appwrite';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Role } from "appwrite";
export class Client {
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    city: string = "";
    zipCode: string = "";
    email: string | null = null;
    phone: string | null = null;
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

export default {
    create
};