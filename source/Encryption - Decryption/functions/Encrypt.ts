/* eslint-disable @typescript-eslint/no-explicit-any */

// Encrypt and Decrypt Imports
import CryptoJS from "crypto-js";

// Data Types
type str = string;

/**
 * The function reActEncrypt takes a string of data and encrypts it using the AES algorithm with a
 * specified key.
 * @param {str} Data - The `Data` parameter is the string that you want to encrypt. It is the data that
 * you want to keep secure and confidential.
 * @param [Key=YourKey] - The "Key" parameter is an optional parameter that represents the encryption
 * key used to encrypt the data. If no key is provided, the default value is set to 'YourKey'.
 * @returns the encrypted data as a string.
 */
/**
Encrypt function encrypts a string of data using the provided key.
// It uses the CryptoJS library to perform the AES encryption.
//
// @param {string} data - The `data` parameter is the string that you want to encrypt. It is the data that
// you want to keep secure and confidential.
//
// @param {string} [Key] - The `key` parameter is an optional parameter that represents the encryption
// key used to encrypt the data. If no key is provided.
//
// @returns the encrypted data as a string.
*/
export async function Encrypt(data: str, Key: str): Promise<string> {
  if (!Key) {
    throw new Error("Missing key");
  }
  // Encrypt data using CryptoJS
  const encryptedData = CryptoJS.AES.encrypt(data, Key).toString();
  return encryptedData;
}

/** 
EncryptSync function encrypts a string of data using the provided key.
It uses the CryptoJS library to perform the AES encryption.
This function operates synchronously, which can impact performance in some scenarios.

@param {string} Data - The `data` parameter is the string that you want to encrypt. It is the data that
you want to keep secure and confidential.

@param {string} [Key] - The `key` parameter is an optional parameter that represents the encryption
key used to encrypt the data. If no key is provided, the default value is set to 'YourKey'.

*@returns the encrypted data as a string.
*/
export function EncryptSync(Data: str, Key: str): string {
  if (!Key) {
    throw new Error("Missing key");
  }
  // Encrypt data
  const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString(); // Encrypt data
  return encryptedData; // Return encrypted data
}
