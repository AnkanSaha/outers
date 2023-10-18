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
export async function Encrypt(Data: str, Key = "YourKey"): Promise<str> {
  // Encrypt data
  const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString(); // Encrypt data
  return encryptedData; // Return encrypted data
}

// Sync Functions
export function EncryptSync(Data: str, Key = "YourKey"): str {
  // Encrypt data
  const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString(); // Encrypt data
  return encryptedData; // Return encrypted data
}
