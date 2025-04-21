import { functionIds, functions } from '$lib/appwrite';
import {  ExecutionMethod } from "appwrite";

async function generateEstimatePdf(estimateId: string)
{
    const execution = await functions.createExecution(
        functionIds.generatePDF,
        undefined,
        false,
        `?id=${estimateId}`,
        ExecutionMethod.GET
    );
    console.log(execution);
    
    if (execution.status === 'completed' && execution.responseBody) {
        // Appwrite may be returning the binary data as base64 or another format
        // Try parsing it differently
        const responseData = new Uint8Array(execution.responseBody);
        const blob = new Blob([responseData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    } else {
        throw new Error("Can't load PDF: " + execution.stderr);
    }
}

export default {
    generateEstimatePdf
}