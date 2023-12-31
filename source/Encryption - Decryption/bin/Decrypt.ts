/* eslint-disable @typescript-eslint/no-explicit-any */

// Encrypt and Decrypt Imports
import CryptoJS from "crypto-js";

// Data Types
type str = string;

/**
 * The `nodeDecrypt` function takes in an encrypted data string and a key, decrypts the data using
 * AES-CBC encryption, and returns the decrypted data as a UTF-8 string.
 * @param {str} Data - The `Data` parameter is a string that represents the encrypted data that you
 * want to decrypt.
 * @param [Key=YourKey] - The `Key` parameter is the encryption key used to decrypt the data. It is a
 * string value that represents the secret key used in the AES-CBC encryption algorithm. By default,
 * the value is set to 'YourKey', but you can provide your own key as an argument when calling the `
 * @returns the decrypted data as a UTF-8 string.
 */
export async function Decrypt(Data: str, Key: str): Promise<str> {
  if (!Key) {
    throw new Error("Missing key");
  }
  // Decrypt data
  const bytes = CryptoJS.AES.decrypt(Data, Key);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  // Return decrypted data
  return decryptedText; // Return decrypted data
}

export function DecryptSync(Data: str, Key: str): str {
  if (!Key) {
    throw new Error("Missing key");
  }

  // Decrypt data
  const bytes = CryptoJS.AES.decrypt(Data, Key);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  // Return decrypted data
  return decryptedText; // Return decrypted data
}
