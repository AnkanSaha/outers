/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
import { sign } from "jsonwebtoken"; // Importing jsonwebtoken for generating the token
import { red } from "../../Logs/Console.log"; // Importing from outers for coloring the output

// Main Function

export default function GenerateJWT(
  Payload: any,
  signatureKey: string,
  expiry: string
): string | null {
  try {
    const signedData: string = sign({ data: Payload }, signatureKey, {
      expiresIn: expiry,
    }); // Generate the token
    return signedData; // Return the token
  } catch (error) {
    red(error); // Log the error
    return null;
  }
}
