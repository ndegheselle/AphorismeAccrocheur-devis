import { Client, Databases } from 'node-appwrite';
import { copyFrom } from './base/class.js';
import { round } from './base/utils.js';

let databases: Databases;
let databaseId = "67dda6ca000771a6a0f1";
const bucketId = "67f4d5c000293a2abc0f";
const collections = {
    clients: "67e15117000204564f9d",
    estimates: "67e4353d00074cb2008c",
    business: "67f3997b0019b415c683",
};
const endpoint = "https://cloud.appwrite.io/v1";

class EstimateLine
{
    name: string = "";
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

class Estimate {
    $id?: string;
    name: string = "";
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


async function getEstimateById(id: string)
{
    let result = await databases.getDocument(databaseId, collections.estimates, id);
    return copyFromResult(result);
}

async function getClientById(id: string)
{
    return await databases.getDocument(databaseId, collections.clients, id);
}

async function getBusiness()
{
    let result = await databases.listDocuments(databaseId, collections.business);
    if (result.documents.length == 0)
        return null;
    return result.documents[0];
}

async function init(client: Client)
{
    databases = new Databases(client); 
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

export default {
    init,
    getEstimateById,
    getClientById,
    getBusiness
};