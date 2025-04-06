import { Estimate } from "./estimates";

export let errors = $state<any>({
    reference: "",
    issueDate: "",
    validityDate: "",
    client: "",
    lines: "",
});

export function hasErrors(estimate: Estimate): boolean {
    // Clear errors
    Object.keys(errors).forEach(key => {
        errors[key] = "";
    });

    // Validate reference
    if (!estimate.reference) {
        errors.reference = 'La référence est obligatoire';
    }

    // Validate issueDate
    if (!estimate.issueDate) {
        errors.issueDate = 'La date d\'émission est obligatoire';
    }

    // Validate validityDate
    if (!estimate.validityDate) {
        errors.validityDate = 'La date de validité est obligatoire';
    }

    // Validate client
    if (!estimate.clientId) {
        errors.client = 'Le client est obligatoire';
    }

    // Validate lines
    if (estimate.lines.length === 0) {
        errors.lines = 'Il doit y avoir au moins une ligne dans le devis';
    }

    // Validate validityDate is superior to issueDate
    if (estimate.issueDate && estimate.validityDate && estimate.validityDate <= estimate.issueDate) {
        errors.validityDate = 'La date de validité doit être postérieure à la date d\'émission';
    }

    // Check if there are any errors
    return Object.values(errors).some(value => value !== "");
}