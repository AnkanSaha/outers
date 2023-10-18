/* eslint-disable @typescript-eslint/no-explicit-any */

// Encrypt and Decrypt Imports
import CryptoJS from 'crypto-js';

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
export async function Encrypt(Data: str, Key = 'YourKey'): Promise<str> {
	// Encrypt data
	const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString(); // Encrypt data
	return encryptedData; // Return encrypted data
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
export async function Decrypt(Data: str, Key = 'YourKey'): Promise<str> {
	// Decrypt data
	const bytes = CryptoJS.AES.decrypt(Data, Key);
	const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
	// Return decrypted data
	return decryptedText; // Return decrypted data
}


// Sync Functions
export function EncryptSync(Data: str, Key = 'YourKey'): str {
	// Encrypt data
	const encryptedData = CryptoJS.AES.encrypt(Data, Key).toString(); // Encrypt data
	return encryptedData; // Return encrypted data
}

export function DecryptSync(Data: str, Key = 'YourKey'): str {
	// Decrypt data
	const bytes = CryptoJS.AES.decrypt(Data, Key);
	const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
	// Return decrypted data
	return decryptedText; // Return decrypted data
}



// Node Encryption Class
export class nodeDecryption {
	private Key: string
	constructor (Key: string) {
	this.Key = Key
	}
  
	public async Decrypt (Data: string) {
 // Encrypt data
	const decryptedData = await Decrypt(Data, this.Key)
	return decryptedData
	}
  
	public async Encrypt (Data: any): Promise<string> {
	// Convert data to string
	const ReadyData = JSON.stringify(Data)
	// Encrypt data
	const encryptedData = await Encrypt(ReadyData, this.Key)
	return encryptedData
	}
  
	public DecryptSync (Data: string) {
	// Encrypt data
	const decryptedData = DecryptSync(Data, this.Key)
	return decryptedData
	}
  
	public EncryptSync (Data: any): string {
	// Convert data to string
const ReadyData = JSON.stringify(Data)
	// Encrypt data
 const encryptedData = EncryptSync(ReadyData, this.Key)
	return encryptedData
	}
  }