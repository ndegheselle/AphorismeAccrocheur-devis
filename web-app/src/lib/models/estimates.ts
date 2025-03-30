import { databases, databaseId, collections } from '$lib/appwrite';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Role, Query } from "appwrite";
import { IsNotEmpty, validate, ValidationError } from "class-validator";

import { Client } from './clients';

export class EstimateLine
{
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    unitPrice: number;
    quantity: number = 1;
    tax: number = 20;
    discount: number = 0;

    get totalWithoutTax(): number {
        return this.unitPrice * this.quantity ;
    }
    get totalTax(): number {
        return this.totalWithoutTax * this.tax / 100;
    }
    get total(): number {
        return (this.totalWithoutTax + this.totalTax) * (1 - this.discount / 100);
    }
}

export class Estimate {
    $id?: string;
    @IsNotEmpty()
    issueDate: Date = new Date(Date.now());
    @IsNotEmpty()
    validityDate: string;
    reference: string = "REF-0001";

    client: Client;
    lines: EstimateLine[] = [];

    async checkErrors(): Promise<ValidationError[]> {
        return await validate(this);
    }
}

async function create(estimate: Estimate) {
    if (auth.currentUser == null)
        throw new Error("User is not connected.");

    return await databases.createDocument(databaseId, collections.clients, ID.unique(), estimate,
        [
            Permission.read(Role.user(auth.currentUser.$id)),
            Permission.update(Role.user(auth.currentUser.$id)),
            Permission.delete(Role.user(auth.currentUser.$id))
        ]);
}

export const repository = {
    create,
};