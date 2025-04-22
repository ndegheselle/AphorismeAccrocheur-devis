import { functionIds, functions } from '$lib/appwrite';
import { ExecutionMethod } from "appwrite";

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
}

export default {
    generateEstimatePdf
}