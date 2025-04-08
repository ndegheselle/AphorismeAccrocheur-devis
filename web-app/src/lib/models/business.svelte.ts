import { Business } from "./business";

export let errors = $state<any>({
    lastName: "",
    adress: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
});

export function hasErrors(business: Business): boolean {
    // Clear errors
    Object.keys(errors).forEach(key => {
        errors[key] = "";
    });

    if (!business.adress || business.adress.trim() === '') {
        errors.adress = 'L\'adresse est obligatoire';
    }

    if (!business.city || business.city.trim() === '') {
        errors.city = 'La ville est obligatoire';
    }

    if (!business.zipCode || business.zipCode.trim() === '') {
        errors.zipCode = 'Le code postal est obligatoire';
    } else if (!/^\d{5}$/.test(business.zipCode)) {
        errors.zipCode= 'Le code postal doit contenir 5 chiffres';
    }

    // Email validation if provided
    if (business.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email)) {
        errors.email = 'L\'adresse email n\'est pas valide';
    }

    // French phone number validation if provided
    if (business.phone) {
        // Accepts formats: 0612345678, 06 12 34 56 78, +33612345678, +33 6 12 34 56 78
        const frenchPhoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!frenchPhoneRegex.test(business.phone)) {
            errors['phone'] = 'Le numéro de téléphone n\'est pas valide';
        }
    }

    return Object.values(errors).some(value => value !== "");
}