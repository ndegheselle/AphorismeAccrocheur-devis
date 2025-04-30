import { account } from '$lib/appwrite';
import { ID } from "appwrite";
import type { Models } from 'appwrite';
import { goto } from "$app/navigation";

type User = Models.User<Models.Preferences>;
class Authentification {
    currentUser = $state<User | null>(null);
    isConnected = $derived<boolean>(this.currentUser != null);

    async getCurrentUser() {
        try {
            this.currentUser = await account.get();
        } catch (error) {
            this.currentUser = null;
        }
        return this.currentUser;
    }

    async login(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password);
            this.currentUser = await account.get();
        }
        catch (error) {
            this.currentUser = null;
            return false;
        }
        return true;
    }

    async logout() {
        await account.deleteSession('current');
        this.currentUser = null;
        goto("/user/login");
    }

    async register(email: string, password: string, name: string) : Promise<string> {
        const id = ID.unique();
        await account.create(id, email, password, name);
        await this.login(email, password);
        return id;
    }
}

const auth = new Authentification();
export default auth;