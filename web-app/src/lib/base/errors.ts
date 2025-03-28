import type { ValidationError } from "class-validator";

/**
 * Clear errors on a fieldset
 * @param fieldset
 */
export function clearErrors(fieldset: HTMLFieldSetElement) {
    fieldset.querySelectorAll(".input-error").forEach((input) => {
        input.classList.remove("input-error");
    });
}

/**
 * Display errors on a fieldset
 * @param fieldset 
 * @param errors 
 * @returns 
 */
export function displayErrors(fieldset: HTMLFieldSetElement, errors: ValidationError[]) : void {
    errors.forEach((error) => {
        const input = fieldset.querySelector(
            `[name="${error.property}"]`,
        ) as HTMLInputElement;

        if (input) {
            input.classList.add("input-error");
        }
    });
}