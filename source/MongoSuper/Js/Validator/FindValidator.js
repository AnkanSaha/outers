/* This file is used to find the validator file and import it. */

/**
 * The function checks if the input parameter is an array of objects and returns true if it is,
 * otherwise it returns false and logs an error message.
 * @param Filter - The parameter "Filter" is expected to be an array of objects. The function checks if
 * the input is in the correct format and returns true if it is an array of objects, and false
 * otherwise.
 * @returns a boolean value. If the input parameter `Filter` is undefined, null, a string, a number, or
 * a boolean, the function returns `false`. If `Filter` is an array, the function returns `true`.
 */
export default function findValidator(Filter) {
    if (Filter === undefined) {
        console.log("Filter is undefined");
        return false;
    } else if (Filter === null) {
        console.log("Filter is null");
        return false;
    } else if (Array.isArray(Filter) === false) {
        console.log(
            "Filter is not in correct format, please provide an array of objects"
        );
        return false;
    } else if (typeof Filter === "string") {
        console.log("Filter is a string, please provide an array of objects");
        return false;
    } else if (typeof Filter === "number") {
        console.log("Filter is a number, please provide an array of objects");
        return false;
    } else if (typeof Filter === "boolean") {
        console.log("Filter is a boolean, please provide an array of objects");
        return false;
    } else if (Array.isArray(Filter) === true) {
        return true;
    }
} // Exporting the findValidator function
