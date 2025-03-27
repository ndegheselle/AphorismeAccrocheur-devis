import type { ValidationError } from "class-validator";

export function clearErrors(fieldset: HTMLFieldSetElement) {
    fieldset.querySelectorAll(".input-error").forEach((input) => {
        input.classList.remove("input-error");
    });
}

export function displayErrors(fieldset: HTMLFieldSetElement, errors: ValidationError[])
{
        // Display input field with errors
        errors.forEach((error) => {
            const input = fieldset.querySelector(
                `[name="${error.property}"]`,
            ) as HTMLInputElement;

            if (input) {
                input.classList.add("input-error");
            }
        });
        return;
}