/**
 * Round to 2 decimal places
 * @param num number to round
 * @returns {number} Rounded number
 */
export function round(num: number): number {
    return Math.round(num * 100) / 100;
}

/**
 * Create a random string of a given length using the specified characters
 * @param length given length of the string
 * @param chars characters to use for the string
 * @returns {string} Random string
 */
export function createRandomString(length: number, chars: string): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Create a random reference string in the format "ABC-123456"
 * @returns {string} Random reference string
 */
export function createRandomRef() {
    return `${createRandomString(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")}-${createRandomString(6, "0123456789")}`;
}