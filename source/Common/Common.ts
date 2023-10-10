/* eslint-disable @typescript-eslint/restrict-plus-operands */
// Encrypt and Decrypt Imports
import CryptoJS from 'crypto-js'

// Data Types
type str = string

/**
 * The function reActUpdateDocumentTitle updates the title of the document.
 * @param {str} title - The `title` parameter is a string that represents the new title for the
 * document.
 */
export function reActUpdateDocumentTitle (title: str): void {
  document.title = title // Update the document title
} // Import CryptoJS

/**
 * The function reActEncrypt takes a string of data and encrypts it using the AES algorithm with a
 * specified key.
 * @param {str} Data - The `Data` parameter is the string that you want to encrypt. It is the data that
 * you want to keep secure and confidential.
 * @param [Key=YourKey] - The "Key" parameter is an optional parameter that represents the encryption
 * key used to encrypt the data. If no key is provided, the default value is set to 'YourKey'.
 * @returns the encrypted data as a string.
 */
export async function Encrypt (Data: any, Key = 'YourKey'): Promise<str> {
  // Encrypt data
  const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString() // Encrypt data
  return encryptedData // Return encrypted data
}

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
export async function Decrypt (Data: str, Key = 'YourKey'): Promise<str> {
  // Decrypt data
  const bytes = CryptoJS.AES.decrypt(Data, Key)
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8)
  // Return decrypted data
  return decryptedText // Return decrypted data
}