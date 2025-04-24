import { functionIds, functions } from '$lib/appwrite';
import { ExecutionMethod } from "appwrite";
import type { Estimate } from './models/estimates';

async function generateEstimatePdf(estimate: Estimate) {
    const execution = await functions.createExecution(
        functionIds.generatePDF,
        undefined,
        false,
        `?id=${estimate.$id}`,
        ExecutionMethod.GET
    );
    const responseData = JSON.parse(execution.responseBody);
    // Convert the object values to a Uint8Array
    const uint8Array = new Uint8Array(Object.values(responseData));
    // Create a Blob from the array
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `devis-${estimate.name}.pdf`; // Name the file as you wish
    link.click();
    // Clean up by revoking the object URL
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

export default {
    generateEstimatePdf
}