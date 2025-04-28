import { collections, databaseId, databases } from '$lib/appwrite';
import { copyFrom } from '$lib/base/class';
import { PaginatedResults } from '$lib/base/results';
import { round } from '$lib/base/utils';
import auth from '$lib/stores/auth.svelte';
import { ID, Permission, Query, Role } from "appwrite";

export class EstimateLine
{
    name: string;
    unitPrice: number = 1;
    quantity: number = 1;
    tax: number = 20;
    discount: number = 0;

    get totalWithoutTax(): number {
        return (this.unitPrice * this.quantity) * (1 - this.discount / 100);
    }
    get totalTax(): number {
        return this.totalWithoutTax * this.tax / 100;
    }
    get total(): number {
        return (this.totalWithoutTax + this.totalTax);
    }
}

export class Estimate {
    $id?: string;
    name: string;
    reference: string = "REF-0001";
    issueDate: Date| undefined = undefined;
    validityDate: Date| undefined = undefined;
    clientId: string | undefined;
    lines: EstimateLine[] = [];

    
    get totalWithoutTax(): number {
        return round(this.lines.reduce((acc, line) => acc + line.totalWithoutTax, 0));
    }
    get totalTax(): number {
        return round(this.lines.reduce((acc, line) => acc + line.totalTax, 0));
    }
    get total(): number {
        return round(this.totalWithoutTax + this.totalTax);
    }
}

async function create(estimate: Estimate) : Promise<Estimate> {
    if (auth.currentUser == null)
        throw new Error("User is not connected.");

    // Can't send client directly, because it is a reference to another document.
    let result = await databases.createDocument(databaseId, collections.estimates, ID.unique(), estimate,
        [
            Permission.read(Role.user(auth.currentUser.$id)),
            Permission.update(Role.user(auth.currentUser.$id)),
            Permission.delete(Role.user(auth.currentUser.$id))
        ]);
    return copyFrom(Estimate, result);
}

async function search(search: string, page: number, capacity: number): Promise<PaginatedResults<Estimate>>
{
    let result = await databases.listDocuments(databaseId, collections.estimates, [
        Query.limit(capacity),
        Query.offset((page - 1) * capacity),
        Query.or([
            Query.contains('reference', search),
            Query.contains('name', search)
        ])
    ]);
    let estimates: Estimate[] = result.documents.map(doc => copyFromResult(doc));
    return new PaginatedResults<Estimate>(estimates, result.total, page, capacity);
}

async function getAll(page: number, capacity: number): Promise<PaginatedResults<Estimate>>
{
    let result = await databases.listDocuments(databaseId, collections.estimates, [
        Query.limit(capacity),
        Query.offset((page - 1) * capacity)
    ]);

    let estimates: Estimate[] = result.documents.map(doc => copyFromResult(doc));
    return new PaginatedResults<Estimate>(estimates, result.total, page, capacity);
}

async function getByClient(clientId: string): Promise<Estimate[]>
{
    let result = await databases.listDocuments(databaseId, collections.estimates, [
        Query.equal('clientId', clientId)
    ]);
    let estimates: Estimate[] = result.documents.map(doc => copyFromResult(doc));
    return estimates;
}

async function getById(id: string): Promise<Estimate>
{
    let result = await databases.getDocument(databaseId, collections.estimates, id);
    return copyFromResult(result);
}

function copyFromResult(estimate: any): Estimate
{
    estimate.issueDate = estimate.issueDate ? new Date(estimate.issueDate) : null;
    estimate.validityDate = estimate.validityDate ? new Date(estimate.validityDate) : null;
    estimate = copyFrom(Estimate, estimate);
    estimate.lines = estimate.lines.map((line: any) => {
        return copyFrom(EstimateLine, line);
    });
    return estimate;
}

async function remove(id: string): Promise<void>
{
    await databases.deleteDocument(databaseId, collections.estimates, id);
}

export const repository = {
    create,
    search,
    getAll,
    getByClient,
    getById,
    remove
};