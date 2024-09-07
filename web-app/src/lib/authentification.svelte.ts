import { account } from '$lib/appwrite';
import type { Models } from 'appwrite';

type User = Models.User<Models.Preferences>;
interface AuthState {
    isConnected: boolean;
    user: User | null;
}

let auth = $state<AuthState>({
    isConnected: false,
    user: null
});

await getUserSession();

async function getUserSession() {
    try {
        auth.user = await account.get();
        auth.isConnected = true;
    } catch (error) {
        auth.user = null;
        auth.isConnected = false;
    }
}

async function login(email: string, password: string) {
    try {
        await account.createEmailPasswordSession(email, password);
        auth.user = await account.get();
    }
    catch (error) {
        return false;
    }
    auth.isConnected = true;
    return true;
}

async function logout() {
    await account.deleteSession('current');
    auth.user = null;
    auth.isConnected = false;
}

export default {
    get auth() {
        return auth;
    },
    login,
    logout
};