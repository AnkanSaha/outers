/* eslint-disable @typescript-eslint/no-explicit-any */
// Import  Encrypt and Decrypt
import { Encrypt, EncryptSync } from "./functions/Encrypt"; // Import Encrypt Module
import { Decrypt, DecryptSync } from "./functions/Decrypt"; // Import Decrypt Module

// Node Encryption Class
export default class Encryption {
  private Key: string;
  constructor(Key: string) {
    this.Key = Key;
  }

  /**
   * The function Decrypt takes a string of data and decrypts it using a specified key.
   * @param {string} Data - The "Data" parameter is a string that represents the data that needs to be
   * decrypted.
   * @returns The decryptedData is being returned.
   */
  public async Decrypt(Data: string) {
    // Encrypt data
    const decryptedData = await Decrypt(Data, this.Key);
    return decryptedData;
  }

  /**
   * The function takes in data, converts it to a string, encrypts it using a key, and returns the
   * encrypted data as a string.
   * @param {any} Data - The "Data" parameter is of type "any", which means it can accept any data type.
   * It is the data that you want to encrypt.
   * @returns a promise that resolves to a string.
   */
  public async Encrypt(Data: any): Promise<string> {
    // Convert data to string
    const ReadyData = JSON.stringify(Data);
    // Encrypt data
    const encryptedData = await Encrypt(ReadyData, this.Key);
    return encryptedData;
  }

  /**
   * The function DecryptSync takes a string of data and decrypts it using a specified key.
   * @param {string} Data - The "Data" parameter is a string that represents the data that needs to be
   * decrypted.
   * @returns The decrypted data is being returned.
   */
  public DecryptSync(Data: string) {
    // Encrypt data
    const decryptedData = DecryptSync(Data, this.Key);
    return decryptedData;
  }

  /**
   * The function takes in data, converts it to a string, encrypts it using a specified key, and returns
   * the encrypted data as a string.
   * @param {any} Data - The "Data" parameter is of type "any", which means it can accept any data type.
   * It is the data that you want to encrypt.
   * @returns the encrypted data as a string.
   */
  public EncryptSync(Data: any): string {
    // Convert data to string
    const ReadyData = JSON.stringify(Data);
    // Encrypt data
    const encryptedData = EncryptSync(ReadyData, this.Key);
    return encryptedData;
  }
}
