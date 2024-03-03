// global typescript types
type num = number; // Type for number
type str = string; // Type for string
type bool = boolean; // Type for boolean

// import Gen functions
import GenerateWord from '../gen/WordGen'; // function for generating a random word
// function for generating a random number

/**
 * This TypeScript function generates a random string of characters with a specified length and the
 * option to make it all uppercase, using an array of possible letters.
 * @param {num} [length=1] - The length parameter is a number that determines the length of the
 * generated random string of characters. By default, it is set to 1.
 * @param {bool} [isCAPITAL=false] - A boolean parameter that determines whether the generated word
 * should be in all capital letters or not. If set to true, the generated word will be returned in all
 * capital letters. If set to false or not provided, the generated word will be returned in lowercase
 * letters.
 * @param {str[] | undefined} CustomWords - CustomWords is an optional parameter that allows the user
 * to provide their own array of words to be used in generating the random string. If this parameter
 * is not provided, the function will use the default array of all possible letters from 'a' to 'z'.
 * @returns a string (type `str`) that is a randomly generated sequence of characters of a specified
 * length, with the option to make it all uppercase if desired. The string is generated using an array
 * of possible characters (`Words`) that includes all lowercase letters of the English alphabet by
 * default, but can be customized by passing in a different array of characters as an argument
 * (`CustomWords`). The
 */
export default function GenerateWordID(length: num = 1, isCAPITAL: bool = false, CustomWords?: str[]): str {
    /* This line of code is creating an array of all possible letters from 'a' to 'z' that will be used to
generate a random string of characters. The array is stored in the constant variable `Words` and has
a type of `str[]`, which means it is an array of strings. */
    const Words: str[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ]; // All Possible Words to generate
    const Result: str = GenerateWord(length, CustomWords !== undefined ? CustomWords : Words); // Generate the Random Number
    // Checking if the Word should be Capital
    if (isCAPITAL === true) {
        return Result.toUpperCase(); // Return the Result in Capital
    } else {
        return Result; // Return the Result
    }
}
