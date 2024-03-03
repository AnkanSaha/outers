// global typescript types
type bool = boolean; // Type for boolean

// import Gen functions
import GenerateBoolean from '../gen/BooleanGen';

// Main Function to Generate Random Boolean
/**
 * Generates a random boolean value.
 * @returns The generated boolean value.
 */
export default function GenerateBooleanID(): bool {
    const ArrayOFboolean: bool[] = [true, false]; // All Possible Booleans to generate
    const GenerationResult: bool = GenerateBoolean(ArrayOFboolean); // Generate the Random Boolean
    return GenerationResult; // Return the Result
}
