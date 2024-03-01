/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */

import { red } from "../Logs/Console.log"; // Importing from outers for coloring the output
import { verify } from "jsonwebtoken"; // Importing jsonwebtoken for generating the token
import { todayDate, cipherList } from "../Config/Constant/JWT.Constant"; // Importing todayDate from JWT.Constant

// Import Functions
import GenerateJWT from "./Functions/Generate"; // Importing GenerateJWT from Functions
import DestroyJWT from "./Functions/Destroy"; // Importing DestroyJWT from  functions
import verifyCipher from "./Functions/verifyCipher"; // Importing verifyCipher from  functions

// Class for all features
/* The Jwt class is used to generate a token with a payload and optional expiry time. */
export default class Jwt {
  // Token
  #signatureKey: string; // Signature Key for the token
  #cipherList: string[]; // List of ciphers used to destroy the token

  /**
   * The constructor function initializes the signatureKey property with the provided value or a default
   * value of 'secret'.
   * @param {string} signatureKey - The `signatureKey` parameter is a string that represents the key used
   * for signing or verifying signatures. It is an optional parameter, meaning it can be provided or
   * omitted when creating an instance of the class. If no value is provided, the default value is set to
   * `'secret'`.
   */
  constructor(signatureKey: string) {
    this.#signatureKey = signatureKey ?? "secret";
    this.#cipherList = cipherList; // List of ciphers used to destroy the token
  }

  // Generate the token
  /**
   * The function generates a token using a payload and an optional expiry time, and returns a record
   * containing information about the generated token.
   * @param {any} Payload - The `Payload` parameter is of type `unknown`, which means it can accept
   * any type of data. It represents the data that you want to include in the token.
   * @param [expiry=1h] - The `expiry` parameter is an optional parameter that specifies the expiration
   * time for the generated token. It is set to a default value of '1h', which means the token will
   * expire after 1 hour.
   * @returns a Promise that resolves to a Record<string, unknown> object.
   */

  public generate(Payload: any, expiry = "1h"): Record<string, any> {
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
      // Generate the token
      const signedData = GenerateJWT(Payload, this.#signatureKey, expiry); // Generate the token

      // Check if the token is valid
      if (signedData == null) {
        return {
          status: "error",
          message: "Something went wrong when generating the token",
          algoRithm: "HS256 (Default)",
          currentTimeStamp: todayDate,
        };
      }

      return {
        status: "Success",
        message: "Token generated successfully",
        toKen: signedData,
        algoRithm: "HS256 (Default)",
        expiry,
        currentTimeStamp: todayDate,
      }; // Create a result object
    } catch {
      red("Error generating token"); // Log the error
      return {
        status: "error",
        message: "Error generating token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create an error object
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

  public generateLoginToken(Payload: any, Rounds = 5, expiry = "1h") {
    try {
      let daTa = Payload; // Set the data to the payload
      let tiMes = Rounds; // Set the times to the rounds

      do {
        const result = this.generate(daTa, expiry); // Destroy the token

        daTa = result.toKen; // Set the data to the token
        tiMes--; // Reduce the times
      } while (tiMes > 0);

      return {
        status: true,
        message: "Token generated successfully",
        toKen: daTa,
        algoRithm: "HS256 (Default)",
        expiry,
        currentTimeStamp: todayDate,
      }; // Return the result
    } catch {
      red("Error generating token"); // Log the error
      return {
        status: false,
        message: "Error generating login token",
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Return the error
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
      const modifiedToken: string = DestroyJWT(token, this.#cipherList); // Destroy the token
      return {
        status: "Successfully destroyed",
        message: "Token destroyed successfully",
        token: modifiedToken,
        currentTimeStamp: todayDate,
        algoRithm: "HS256 (Default)",
      }; // Create a result object; // Return the result
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

      const cipherResult = verifyCipher(token, this.#cipherList); // Verify the cipher

      if (cipherResult.status === "Already Destroyed") {
        return cipherResult;
      }

      // Check if the token is destroyed by manually checking the token
      const resultData = verify(token, this.#signatureKey); // Decode the token
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
   * Sets or updates the cipher list.
   *
   * This method updates the internal cipher list used for cryptographic operations.
   * It validates the input to ensure that it is a non-empty array of strings. If the
   * input does not meet these criteria, an error is thrown.
   *
   * @param {string[]} cipherList - An array of strings representing the new cipher list.
   * @throws {Error} Throws an error if `cipherList` is not provided or is not an array.
   */
  public setCipherList(cipherList: string[]) {
    if (!cipherList) {
      new Error("Cipher list is required to update the cipher list"); // Return the error
    }

    if (!Array.isArray(cipherList)) {
      new Error("Cipher list should be an array"); // Return the error
    }

    // Update the cipher list
    this.#cipherList = cipherList; // Update the cipher list
  }

  /**
   * Sets the signature key used for signing or verifying.
   * This method updates the instance's signature key with the provided value.
   *
   * @param {string} signatureKey - The new signature key to be set. Must be a non-empty string.
   * @throws Will throw an error if `signatureKey` is not provided or if it is not a string.
   */
  public setSignatureKey(signatureKey: string) {
    // Check if the signature key is provided
    if (!signatureKey) {
      new Error("Signature key is required to update the signature key"); // Return the error
    }

    // Check if the signature key is a string
    if (typeof signatureKey !== "string") {
      new Error("Signature key should be a string"); // Return the error
    }

    // Update the signature key
    this.#signatureKey = signatureKey; // Update the signature key
  }
}
