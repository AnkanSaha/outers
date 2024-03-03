// This File is used as a middleware to generate Random Words

// global typescript types
type num = number; // Type for number
type str = string; // Type for string

/**
 * This TypeScript function generates a random string of specified length using letters from a to z.
 * @param {num} length - The length parameter is a number that determines the length of the generated
 * word. It is used to specify the number of rounds in the while loop that generates the random word.
 * @returns a randomly generated string of characters with a length specified by the input parameter
 * `length`.
 */
export default function GenerateWord(length: num, Words: str[]): str {
    /* The code is initializing an empty array called `FinalID` with a type of `str[]`, which means it is
an array of strings. This array will be used to store the randomly generated characters to create
the final ID string. */
    // Final ID Array
    const FinalID: str[] = []; // Final ID

    /* This code block is a while loop that generates a random string of characters. The loop runs for the
number of rounds specified by the input parameter `length`. In each round, a random number between 0
and 25 is generated using the `Math.random()` function. This number is then rounded to the nearest
integer using the `Math.round()` function. The rounded number is used as an index to select a
character from the `Words` array, which contains all possible letters from 'a' to 'z'. The selected
character is then pushed to the `FinalID` array. Finally, the number of rounds is decreased by 1,
and the loop continues until all rounds have been completed. */

    // Looping through the rounds
    while (length > 0) {
        const FinalRandomNumForText: num = GenerateNumberIndex(Words); // Generate Random Number Index Between 0 and Array Length - 1
        // Push the Number to Final ID Array
        FinalID.push(Words[FinalRandomNumForText]); // Push the Number to Final ID
        length--; // Decrease the Number of Rounds
    }
    /* This code block is converting the `FinalID` array, which contains the randomly generated
 characters, into a string by joining all the elements of the array together with no separator
 between them. The resulting string is stored in the constant variable `FinalIDString`, which has a
 type of `str`, meaning it is a string. Finally, the function returns the `FinalIDString` variable,
 which contains the randomly generated string of characters. */
    const FinalTextIDString: str = FinalID.join(''); // Join the Array to String

    return FinalTextIDString; // Return the Final ID
}

// Generate Random Number Index
function GenerateNumberIndex(ArrayWords: str[]): num {
    const TempRandomNumBer: num = Math.random() * (ArrayWords.length - 1 - 0) + 0; // Generate Random Number Between 0 and Array Length - 1
    const FinalRandomNumber: num = Math.round(TempRandomNumBer); // Round the Number
    return FinalRandomNumber; // Return the Final Random Number
}
