// global typescript types
type bool = boolean; // Type for boolean

// Import Random Number Function
import { randomNumber } from '../uniquegen'; // function for generating a random word

// Main Function to Generate Random Boolean
/**
 * Generates a random boolean value from the given array of booleans.
 * @param ArrayOFboolean - The array of booleans to generate from.
 * @returns The randomly generated boolean value.
 */
export default function GenerateBoolean(ArrayOFboolean: bool[]): bool {
    const RandomIndex: number = randomNumber(1, true, [0, 1]); // Generate Random Index Between 0 and Array Length - 1
    const RandomBoolean: bool = ArrayOFboolean[RandomIndex]; // Get the Random Boolean
    return RandomBoolean; // Return the Random Boolean
}
