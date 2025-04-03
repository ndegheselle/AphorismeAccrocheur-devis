import { Client } from "./clients";

export let errors = $state<any>({
    lastName: "",
    adress: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
});

export function hasErrors(client: Client): boolean {
    // Clear errors
    Object.keys(errors).forEach(key => {
        errors[key] = "";
    });

    // Check required fields
    if (!client.lastName || client.lastName.trim() === '') {
        errors.lastName = 'Le nom est obligatoire';
    }

    if (!client.adress || client.adress.trim() === '') {
        errors.adress = 'L\'adresse est obligatoire';
    }

    if (!client.city || client.city.trim() === '') {
        errors.city = 'La ville est obligatoire';
    }

    if (!client.zipCode || client.zipCode.trim() === '') {
        errors.zipCode = 'Le code postal est obligatoire';
    } else if (!/^\d{5}$/.test(client.zipCode)) {
        errors.zipCode= 'Le code postal doit contenir 5 chiffres';
    }

    // Email validation if provided
    if (client.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
        errors.email = 'L\'adresse email n\'est pas valide';
    }

    // French phone number validation if provided
    if (client.phone) {
        // Accepts formats: 0612345678, 06 12 34 56 78, +33612345678, +33 6 12 34 56 78
        const frenchPhoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!frenchPhoneRegex.test(client.phone)) {
            errors['phone'] = 'Le numéro de téléphone n\'est pas valide';
        }
    }

    return Object.values(errors).some(value => value !== "");
}