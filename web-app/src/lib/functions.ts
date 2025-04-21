import { functionIds, functions } from '$lib/appwrite';
import {  ExecutionMethod } from "appwrite";

async function generateEstimatePdf(estimateId: string)
{
    const execution = await functions.createExecution(
        functionIds.generatePDF,
        JSON.stringify({id: estimateId}),
        false,
        undefined,
        ExecutionMethod.GET
    );
    console.log(execution);
    if (execution.status === 'completed') {
        const blob = new Blob([execution.responseBody], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    } else {
        throw new Error("Can't load PDF.");
    }  
}

export default {
    generateEstimatePdf
}