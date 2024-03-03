// This File is used as a middleware to generate Random Numbers

// global typescript types
type num = number; // Type for number
type str = string; // Type for string

/**
 * The function generates a random ID of a specified length using an array of numbers and the
 * Math.random() method.
 * @param {num} length - The length parameter is a number that determines the length of the generated
 * ID. It is used to specify the number of rounds the while loop should run to generate the random ID.
 * The value of this parameter is passed as an argument to the GenerateID function when it is called.
 * @returns a randomly generated 10-digit number ID as a number data type.
 */
export default function GenerateNumber(length: num, Numbers: num[]): num {
  // Final ID Array
  const FinalID: num[] = []; // Final ID Array
  while (length > 0) {
    const FinalRandomNumber: num = GenerateNumberIndex(Numbers); // Generate Random Number Index Between 0 and Array Length - 1
    FinalID.push(Numbers[FinalRandomNumber]); // Push the Number to Final ID
    length--; // Decrease the Number of Rounds
  }

  /* This code block is converting the `FinalID` array, which contains the randomly generated 10-digit
  number ID, into a string by joining all the elements of the array together with an empty string
  separator. Then, the string is converted back into a number data type using the `Number()` method
  and assigned to the `FinalIDNumber` variable. Finally, the `FinalIDNumber` variable is returned as
  the final ID. */
  // Make the Final ID From Array to String
  const FinalIDString: str = FinalID.join(""); // Join the Array to String
  const FinalIDNumber: num = Number(FinalIDString); // Convert the String to Number

  return FinalIDNumber; // Return the Final ID
}

// Generate Random Number Index
function GenerateNumberIndex(ArrayNumbers: num[]): num {
  const TempRandomNumBer: num =
    Math.random() * (ArrayNumbers.length - 1 - 0) + 0; // Generate Random Number Between 0 and Array Length - 1
  const FinalRandomNumber: num = Math.round(TempRandomNumBer); // Round the Number
  return FinalRandomNumber; // Return the Final Random Number
}
