// global typescript types
type num = number; // Type for number
type str = string; // Type for string

// import Gen functions
import GenerateSymbol from '../gen/SymbolGen'; // function for generating a random word
// function for generating a random number

/**
 * This is a TypeScript function that generates a random string of symbols with a specified length and
 * custom symbols if provided.
 * @param {num} [length=1] - The length parameter is a number that specifies the length of the
 * generated symbol ID. By default, it is set to 1 if no value is provided.
 * @param {str[] | undefined} CustomSymbols - CustomSymbols is an optional parameter that allows the
 * user to provide their own array of symbols to be used in generating the random string. If this
 * parameter is not provided, the function will use the default array of symbols defined in the code.
 * @returns The function `GenerateSymbolIDsync` is returning a promise that resolves to a string
 * (`Promise<str>`). The string is a randomly generated sequence of symbols of length `length`, using
 * either the default symbol array or a custom symbol array if provided.
 */
export default function GenerateSymbolID(length: num = 1, CustomSymbols?: str[]): str {
    /* Defining an array of symbols that will be used to generate a random string of symbols in the
`GenerateSymbol` function. The array contains various symbols such as exclamation mark, at sign,
hash, dollar sign, etc. */
    // Symbol Array
    const Symbols: str[] = [
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
        '`',
    ]; // Symbol Array
    const Result: str = GenerateSymbol(length, CustomSymbols !== undefined ? CustomSymbols : Symbols); // Generate the Random Number
    return Result; // Return the Result
}
