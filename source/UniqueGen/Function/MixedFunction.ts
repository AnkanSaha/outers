// global typescript types
type num = number; // Type for number
type str = string; // Type for string
type bool = boolean; // Type for boolean

import GenerateMixed from '../gen/MixedGen'; // function for generating a random word

// function for generating a random mixed ID

/**
 * This TypeScript function generates a random mixed ID of a specified length, with the option to
 * include custom characters and make the ID all capital letters.
 * @param {num} [length=1] - The length parameter is a number that determines the length of the
 * generated mixed ID.
 * @param {bool} [isCAPITAL=false] - A boolean parameter that determines whether the generated mixed ID
 * should be in all capital letters or not. If set to true, the function will return the generated ID
 * in all capital letters. If set to false or not provided, the function will return the generated ID
 * in lowercase letters.
 * @param {str[]} [CustomMixeds] - CustomMixeds is an optional parameter that allows the user to
 * provide their own array of characters to be used in generating the mixed ID. If this parameter is
 * not provided, the function will use the default array of characters defined in the code.
 * @returns a Promise that resolves to a string. The string is a randomly generated mixed ID of the
 * specified length, with the option to include custom characters and to make the ID all uppercase.
 */
export default function GenerateMixedID(length: num = 1, isCAPITAL: bool = false, CustomMixeds?: str[]): str {
    /* This line of code is creating an array of all possible letters from 'a' to 'z' that will be used to*/
    const Mixed: str[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '-',
        '_',
        '=',
        '+',
        '[',
        ']',
        '{',
        '}',
        ';',
        ':',
        '<',
        '.',
        '>',
        '/',
        '?',
        '|',
        '\\',
        '~',
    ]; // All Possible Words to generate

    let Result: str = GenerateMixed(length, CustomMixeds !== undefined ? CustomMixeds : Mixed); // Generate the Random Number

    // Checking if the Word should be Capital
    if (isCAPITAL === true) {
        return (Result = Result.toUpperCase()); // Return the Result in Capital
    } else {
        return Result; // Return the Result
    }
}
