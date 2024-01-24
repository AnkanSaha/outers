/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
import { red } from "../Logs/Console.log"; // Importing from outers for coloring the output
import { sign, verify } from "jsonwebtoken"; // Importing jsonwebtoken for generating the token

// Current Time
const todayDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

// Class for all features
/* The Jwt class is used to generate a token with a payload and optional expiry time. */
export default class Jwt {
  // Token

  private readonly signatureKey: string;
  private readonly cipherList: string[];

  /**
   * The constructor function initializes the signatureKey property with the provided value or a default
   * value of 'secret'.
   * @param {string} signatureKey - The `signatureKey` parameter is a string that represents the key used
   * for signing or verifying signatures. It is an optional parameter, meaning it can be provided or
   * omitted when creating an instance of the class. If no value is provided, the default value is set to
   * `'secret'`.
   */
  constructor(signatureKey: string) {
    this.signatureKey = signatureKey ?? "secret";
    this.cipherList = [
      "SIDF524",
      "LHypk41",
      "@thusngvgvergh",
      "egfr##.gokro",
      "frevnjnr@872@erge",
    ]; // List of supported algorithms keys
  }

  // Generate the token
  /**
   * The function generates a token using a payload and an optional expiry time, and returns a record
   * containing information about the generated token.
   * @param {unknown} Payload - The `Payload` parameter is of type `unknown`, which means it can accept
   * any type of data. It represents the data that you want to include in the token.
   * @param [expiry=1h] - The `expiry` parameter is an optional parameter that specifies the expiration
   * time for the generated token. It is set to a default value of '1h', which means the token will
   * expire after 1 hour.
   * @returns a Promise that resolves to a Record<string, unknown> object.
   */

  public generate(Payload: unknown, expiry = "1h"): Record<string, any> {

    try {
      if (!Payload) {
        red("Payload is required"); // Log the error
        return {
          status: "Empty",
          message: "Payload is required",
          algoRithm: "HS256 (Default)",
          currentTimeStamp: todayDate,
        }; // Return the error
      }

      const signedData: string = sign({ data: Payload }, this.signatureKey, {
        expiresIn: expiry,
      }); // Generate the token
      const fullResult: Record<string, any> = {
        status: "Success",
        message: "Token generated successfully",
        toKen: signedData,
        algoRithm: "HS256 (Default)",
        expiry,
        currentTimeStamp: todayDate,
      }; // Create a result object
      return fullResult; // Return the result
    } catch {
      const errorResult: Record<string, any> = {
        status: "error",
        message: "Error generating token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
      red("Error generating token"); // Log the error
      return errorResult; // Return the error
    }
  }

  /**
   * The function generates a login token by repeatedly calling a token generation function for a
   * specified number of rounds.
   * @param {unknown} Payload - The `Payload` parameter is of type `unknown` and represents the data that
   * will be used to generate the login token. It can be any type of data, such as an object or a string.
   * @param [Rounds=5] - The "Rounds" parameter determines the number of times the token generation
   * process will be repeated. Each round generates a new token based on the previous token. The default
   * value is 5 rounds.
   * @param [expiry=1h] - The `expiry` parameter is a string that represents the expiration time of the
   * generated token. It is set to a default value of '1h', which means the token will expire after 1
   * hour.
   * @returns an object with the following properties:
   * - status: a boolean indicating whether the token was generated successfully or not.
   * - message: a string message indicating the result of the token generation.
   * - toKen: the generated token.
   * - algoRithm: a string indicating the algorithm used for token generation (HS256 in this case).
   * - expiry: a string indicating the expiration time of
   */

  public generateLoginToken(Payload: unknown, Rounds = 5, expiry = "1h") {

    try {
      let daTa: unknown = Payload; // Set the data to the payload
      let tiMes = Rounds; // Set the times to the rounds

      while (tiMes > 0) {

        const result = this.generate(daTa, expiry); // Destroy the token

        daTa = result.toKen; // Set the data to the token
        tiMes--; // Reduce the times
      }

      return {
        status: true,
        message: "Token generated successfully",
        toKen: daTa,
        algoRithm: "HS256 (Default)",
        expiry,
        currentTimeStamp: todayDate,
      }; // Return the result
    } catch {
      const errorResult: Record<string, any> = {
        status: false,
        message: "Error generating login token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
      red("Error generating token"); // Log the error
      return errorResult; // Return the error
    }
  }

  // Destroy the token
  /**
   * The `destroy` function takes a token, adds ciphers to specific positions, reverses the token, and
   * returns a result object with the modified token and other information.
   * @param {string} token - The `token` parameter is a string that represents a token.
   * @returns The `destroy` function returns a Promise that resolves to a `Record<string, unknown>`
   * object.
   */

  public destroy(token: string): Record<string, any> {

    try {
      const positions: number[] = [5, 3, 9, 4, 7]; // List of positions
      let tokenArray: string[] = token.split(""); // Split the token

      this.cipherList.forEach((cipher: string, index: number) => {
        tokenArray.splice(positions[index], 0, cipher); // Add the cipher to the token
      }); // Loop through the list of supported algorithms

      tokenArray = tokenArray.reverse(); // Reverse the token
      const modifiedToken: string = tokenArray.join(""); // Join the token

      const result: Record<string, any> = {
        status: "Successfully destroyed",
        message: "Token destroyed successfully",
        token: modifiedToken,
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create a result object

      return result; // Return the result
    } catch {
      return {
        status: "error",
        message: "Error destroying token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
    }
  }

  /**
   * The function decodes a token by verifying its cipher and checking if it is valid, returning an error
   * object if it is empty, destroyed, or invalid.
   * @param {string} token - The `token` parameter is a string that represents a token that needs to be
   * decoded.
   * @returns The function `decode` returns a Promise that resolves to an unknown value. The value being
   * returned depends on the conditions inside the function.
   */

  public decode(token: string): any {

    try {
      if (!token) {
        return {
          status: "empty",
          message: "Token is required",
          currentTimeStamp: todayDate,
          algoRithm: "HS256 (Default)",
        }; // Create an error object
      }


      const cipherResult = this.verifyCipher(token);

      if (cipherResult.status === "Already Destroyed") {
        return cipherResult;
      }

      // Check if the token is destroyed by manually checking the token
      const resultData = verify(token, this.signatureKey); // Decode the token
      return {
        status: "Success",
        message: "Token decoded successfully",
        data: resultData,
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Return the result
    } catch {
      return {
        status: "Invalid",
        message:
          "Invalid Token Provided, token might have been tampered, not match the signature key or expired",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
    }
  }

  /**
   * The function `verifyCipher` checks if a given token has been manually destroyed by checking if it
   * contains any ciphers from a list.
   * @param {string} token - The `token` parameter is a string that represents a token.
   * @returns an object with the following properties:
   */

  private verifyCipher(token: string) {

    try {
      // Checking if the token is destroyed by manually checking the token

      let cipherResult = false; // Cipher result
      this.cipherList.forEach((cipher: string) => {
        if (token.includes(cipher)) {
          cipherResult = true;
        } else {
          cipherResult = false;
        }
      }); // Check if the token contains the cipher

      if (!cipherResult) {
        return {
          status: "Not Destroyed",
          message: "Token is not Destroyed Manually",
          currentTimeStamp: todayDate,
          algoRithm: "HS256 (Default)",
        }; // Create an error object
      }

      return {
        status: "Already Destroyed",
        message: "Token is Destroyed Manually with the destroy() method",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
    } catch {
      return {
        status: "error",
        message: "Error verifying token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
    }
  }
}
