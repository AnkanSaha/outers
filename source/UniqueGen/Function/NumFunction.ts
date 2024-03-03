// global typescript types
type num = number; // Type for number
type bool = boolean; // Type for boolean

// import Gen functions
import GenerateNumber from '../gen/NumGen'; // function for generating a random word

// function for generating a random number

/**
 * This TypeScript function generates a random number ID of a specified length, with the option to
 * exclude zero and use a custom set of numbers.
 * @param {num} [length=1] - The length parameter is a number that specifies the length of the
 * generated number ID.
 * @param {bool} [WithZero=true] - A boolean value that determines whether or not the generated number
 * can include the digit 0. If set to true, the digit 0 will be included in the possible numbers to
 * generate. If set to false, the digit 0 will be removed from the possible numbers to generate.
 * @param {num[] | undefined} CustomNumbers - An optional parameter that allows the user to provide a
 * custom array of numbers to generate the random number ID from. If not provided, the function will
 * use the default array of numbers from 0 to 9.
 * @returns a Promise that resolves to a number (num).
 */
export default function GenerateNumberID(length: num = 1, WithZero: bool = true, CustomNumbers?: num[]): num {
    /* Creating an array of numbers from 0 to 9 that will be used to generate the random 10-digit number
    ID. */
    const NumbersArray: num[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // All Possible Numbers to generate

    // Filtered Array
    const FilteredArray: num[] = CustomNumbers !== undefined ? CustomNumbers : NumbersArray;

    if (WithZero === false) {
        const ZeroIndexNum: num = FilteredArray.indexOf(0); // Get the index of Zero
        FilteredArray.splice(ZeroIndexNum, 1); // Remove Zero from the Array
        const GenerationResult: num = GenerateNumber(length, FilteredArray); // Generate the Random Number
        return GenerationResult; // Return the Result
    } else {
        const GenerationResult: num = GenerateNumber(length, FilteredArray); // Generate the Random Number
        return GenerationResult; // Return the Result
    }
}
