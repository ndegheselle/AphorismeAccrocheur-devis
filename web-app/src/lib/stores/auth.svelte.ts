import { account } from '$lib/appwrite';
import { ID } from "appwrite";
import type { Models } from 'appwrite';

type User = Models.User<Models.Preferences>;
let currentUser = $state<User | null>(null);
let isConnected = $derived<boolean>(currentUser != null);

await getCurrentUser();

async function getCurrentUser() {
    try {
        currentUser = await account.get();
    } catch (error) {
        currentUser = null;
    }
}

async function login(email: string, password: string) {
    try {
        await account.createEmailPasswordSession(email, password);
        currentUser = await account.get();
    }
    catch (error) {
        currentUser = null;
        return false;
    }
    return true;
}

async function logout() {
    await account.deleteSession('current');
    currentUser = null;
}

async function register(email: string, password: string, name: string)
{
    await account.create(ID.unique(), email, password, name);
    return await login(email, password);
}

export default {
    currentUser,
    isConnected,
    login,
    logout,
    register
};