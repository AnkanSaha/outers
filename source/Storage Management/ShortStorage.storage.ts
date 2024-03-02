/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  writeFile,
  readFile,
  stat,
  access,
  mkdir,
  rmdir,
  unlink,
} from "node:fs/promises"; // Import Node.js Dependencies

// Import Encryption and Decryption Functions
import { ClassBased } from "../Config/outer"; // Import Encryption and Decryption Functions

// Interfaces for ShortStorage Response
import { ShortStorage } from "../Config/Interfaces/Storage Management/ShortStorage.interface"; // Import ShortStorage Interface

// Main Function Sto Store Data in Short Storage
/**
 * Represents a short storage for saving and retrieving data.
 */
export default class CreateNewShortStorage {
  // Properties
  readonly #StorageName: string; // Storage Name (Private)
  readonly #StoragePath: string; // Storage Path (Private)
  readonly #MaxStorageSize: number; // Max Storage Size (Private)
  readonly #EncryptionKey?: string; // Encryption Key (Private)
  readonly #StorageFullPATH: string; // Storage Full PATH (Public)

  /**
   * Constructs a new instance of the ShortStorage class.
   * @param {string} [StorageName] - The name of the storage. Defaults to "outers" if not provided.
   * @param {number} [MaxStorageSize] - The maximum size of the storage in Megabytes. Defaults to 1MB if not provided.
   * @param {string} [EncryptionKey] - The encryption key for the storage. If not provided, a default encryption key will be generated based on the storage name, storage path, and the current version of Node.js.
   * @param {string} [StoragePath] - The path where the storage is located. Defaults to "Cache/" if not provided.
   */
  constructor(
    StorageName?: string,
    MaxStorageSize?: number,
    EncryptionKey?: string,
    StoragePath?: string,
  ) {
    this.#StorageName = StorageName?.toLowerCase() ?? "outers"; // Set Storage Name
    this.#StoragePath = StoragePath ?? "Cache/"; // Set Storage Path
    this.#MaxStorageSize = MaxStorageSize ?? 1; // Set Max Storage Size to 1MB
    this.#StorageFullPATH = `${this.#StoragePath}.${this.#StorageName}.storage.json`; // Set Storage Full PATH
    this.createShortStorage(); // Create Short Storage
    this.#EncryptionKey =
      EncryptionKey ??
      `${this.#StorageName
        .split("")
        .reverse()
        .join("")
        .toUpperCase()}-${this.#StoragePath
        .split("")
        .reverse()
        .join("")
        .toUpperCase()}-${process.versions.v8
        .trim()
        .split("")
        .reverse()
        .join("")}`; // Create Encryption Key if it is not Provided or Use Provided Encryption Key
  }

  /**
   * Saves the provided data with the given title to the storage.
   * @param {string} Title - The title of the data.
   * @param {any} Data - The data to be saved.
   * @returns {Promise<ShortStorage>} - A promise that resolves when the data is successfully saved.
   */
  public async Save(Title: string, Data: any): Promise<ShortStorage> {
    // Check if File size is bigger than Max Storage Size
    const FileStats = await stat(this.#StorageFullPATH); // Get File Stats

    // Convert File Size to Megabytes and Check if it's bigger than Max Storage Size
    const fileSizeInMegabytes = FileStats.size / (1024 * 1024); // Convert File Size to Megabytes from bytes

    if (fileSizeInMegabytes >= this.#MaxStorageSize) {
      // Check if File Size is Reached to Max Storage Size
      return {
        status: 400,
        message:
          "Storage is full, please use another instance or increase the storage size.",
        Data: [],
        TotalData: 0,
      };
    }

    // Check if Data is Already Exists in Short Storage
    const FindData = await this.Get(Title); // Get Data

    if (FindData.Data.length !== 0) {
      return {
        status: 403,
        message: "Data Already Exists",
        Data: FindData.Data,
        TotalData: FindData.TotalData,
      };
    }

    const RawData = await readFile(this.#StorageFullPATH, "utf-8"); // Get Raw Data
    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Encrypt Data if Encryption Key is Provided
    const UserProvidedData = await new ClassBased.CryptoGraphy(
      String(this.#EncryptionKey),
    ).Encrypt(Data); // Set User Provided Data
    const UserProvidedTitle = await new ClassBased.CryptoGraphy(
      String(this.#EncryptionKey),
    ).Encrypt(Title); // Set User Provided Title

    // Push The New Data In The Array
    ParsedData.push({
      Title: UserProvidedTitle,
      Data: UserProvidedData,
    });

    // Write The New Data in File
    await writeFile(this.#StorageFullPATH, JSON.stringify(ParsedData), "utf-8"); // Write Data in File

    // Lock File After Write Data

    return {
      status: 200,
      message: "Data Saved Successfully",
      Data: [
        {
          Title,
          Data,
        },
      ],
      TotalData: 1,
    };
  }

  /**
   * Retrieves data from the storage based on the provided title.
   * @param Title - The title of the data to retrieve.
   * @returns A promise that resolves to an object containing the status, message, and retrieved data.
   */
  public async Get(Title?: string): Promise<ShortStorage> {
    const RawData = await readFile(this.#StorageFullPATH, "utf-8"); // Get Raw Data

    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Find The Data with Decryption if Encryption Key is Provided
    const EncryptedData = await Promise.all(
      ParsedData.map(async (Data) => {
        const DecryptedTitle = JSON.parse(
          await new ClassBased.CryptoGraphy(String(this.#EncryptionKey)).Decrypt(
            Data.Title,
          ),
        ); // Decrypt Title if Encryption Key is Provided
        const DecryptedData = JSON.parse(
          await new ClassBased.CryptoGraphy(String(this.#EncryptionKey)).Decrypt(
            Data.Data,
          ),
        ); // Decrypt Data if Encryption Key is Provided

        // Check if Title is Provided and Match with Decrypted Title
        if (Title === undefined || DecryptedTitle === Title) {
          return {
            Title: DecryptedTitle,
            Data: DecryptedData,
          };
        } else {
          return null; // Do not include in the final result
        }
      }),
    );

    // Filter out null values (where Title did not match)
    const EncryptedFilteredData = EncryptedData.filter(Boolean); // Filter out null values (where Title did not match)

    if (EncryptedFilteredData.length === 0) {
      const PreparedDataForError = {
        status: 404,
        message: "Data Not Found",
        Data: [],
        TotalData: 0,
      };
      return PreparedDataForError;
    }

    return {
      status: 200,
      message: "Data Found Successfully",
      Data: EncryptedFilteredData,
      TotalData: EncryptedFilteredData.length,
    }; // Return Data;
  }

  // Update Data in Short Storage
  /**
   * Updates the data in the Short Storage with the specified title.
   * If the data is not found, returns a 404 status with a "Data Not Found" message.
   * Otherwise, deletes the old data, adds the new data, and writes the updated data to the storage file.
   * Returns a 200 status with a "Data Updated Successfully" message and the updated data.
   * @param {string} Title - The title of the data to be updated.
   * @param {any} NewData - The new data to be added.
   * @returns {Promise<{ status: number, message: string, Data?: { Title: string, Data: any } }>} - The status, message, and updated data (if successful).
   */

  public async Update(Title: string, NewData: any): Promise<ShortStorage> {
    // Check if Data is Already Exists in Short Storage
    if ((await this.Get(Title)).Data.length === 0) {
      return {
        status: 404,
        message: "Data Not Found",
        Data: [],
        TotalData: 0,
      };
    }

    // Delete The Old Data
    const AllFindData = await this.Get(); // Get All Data in Storage File

    // Delete The Data
    const RemovedData = AllFindData.Data.filter(
      (Data: { Title: string }) => Data.Title !== Title,
    );

    // Push The New Data In The Array
    RemovedData.push({
      Title: Title,
      Data: NewData,
    }); // Push The New Data In The Array

    // Filter out null values (where Title did not match)
    const EncryptedBuiltData = await this.CreateEncryptedData(RemovedData); // Filter out null values (where Title did not match)

    // Unlock File Before Write Data

    // Write The New Data in File
    await writeFile(
      this.#StorageFullPATH,
      JSON.stringify(EncryptedBuiltData),
      "utf-8",
    ); // Write Data in File

    // Lock File After Write Data

    return {
      status: 200,
      message: "Data Updated Successfully",
      Data: [
        {
          Title,
          Data: NewData,
        },
      ],
      TotalData: 1,
    };
  }

  // Delete Data From Short Storage
  /**
   * Deletes a data entry from the storage based on the provided title.
   * @param {string} Title - The title of the data entry to be deleted.
   * @returns {Promise<ShortStorage>} A promise that resolves to the deleted data entry or an error object.
   */
  public async Delete(Title: string): Promise<ShortStorage> {
    // Get All Data in Storage File Before Delete
    const ParsedData = (await this.Get()).Data; // Parsed The Data

    // Find The Data
    const Data = ParsedData.filter((Data) => Data.Title === Title);

    if (!Data) {
      return {
        status: 404,
        message: "Data Not Found",
        Data: [],
        TotalData: 0,
      };
    }

    // Delete The Data
    const NewData = ParsedData.filter((Data) => Data.Title !== Title);

    // Filter out null values (where Title did not match)
    const EncryptedBuiltData = await this.CreateEncryptedData(NewData); // Filter out null values (where Title did not match)

    // Unlock File Before Write Data

    // Write The New Data in File
    await writeFile(
      this.#StorageFullPATH,
      JSON.stringify(EncryptedBuiltData),
      "utf-8",
    ); // Write Data in File

    // Lock File After Write Data

    return {
      status: 200,
      message: "Data Deleted Successfully",
      Data,
      TotalData: Data.length,
    };
  }

  // A Public Method to Delete Data Storage File
  /**
   * Deletes the storage directory and file.
   *
   * @returns A promise that resolves to a ShortStorage object with the status and message.
   *          If the storage is deleted successfully, the object will also contain the data and total data count.
   *          If the storage is not found, the object will have a status of 404 and a corresponding error message.
   */
  public async DeleteStorage(): Promise<ShortStorage> {
    // Check if the directory exists, and create it if not
    try {
      await access(this.#StoragePath); // Check if Directory Exists

      // Get All Data in Storage File Before Delete
      const AllDataInStorage = await this.Get(); // Get All Data in Storage File

      // Unlock File Before Delete Data

      // Delete All Data in Storage File
      await unlink(this.#StorageFullPATH); // Delete File
      await rmdir(`${this.#StoragePath}`); // Delete Storage Directory

      return {
        status: 200,
        message: "Storage Deleted Successfully",
        Data: AllDataInStorage.Data,
        TotalData: AllDataInStorage.TotalData,
      };
    } catch (error) {
      return {
        status: 404,
        message: "Storage Not Found in Management PATH",
        Data: [],
        TotalData: 0,
      };
    }
  }

  // A Private Method for Create Short Storage Folder
  /**
   * Creates a short storage by checking if the directory exists and creating it if not.
   * Then, it creates a short storage file with an empty JSON object.
   */
  private async createShortStorage() {
    // Check if the directory exists, and create it if not
    try {
      await access(this.#StorageFullPATH); // Check if Directory Exists
    } catch (error) {
      // Directory does not exist, create it
      await mkdir(`${this.#StoragePath}`, { recursive: true }); // Create Directory

      // Write Empty Data in this File
      await writeFile(this.#StorageFullPATH, JSON.stringify([]), "utf-8"); // Create Storage File
    }
  }

  /**
   * Encrypts the provided data using the encryption key.
   * @param UnEncryptedData - The data to be encrypted.
   * @returns The encrypted data.
   */
  private async CreateEncryptedData(UnEncryptedData: any) {
    // Encrypt Data if Encryption Key is Provided
    const EncryptedData = await Promise.all(
      UnEncryptedData.map(async (Data: { Title: any; Data: any }) => {
        const EncryptedTitle = await new ClassBased.CryptoGraphy(
          String(this.#EncryptionKey),
        ).Encrypt(Data.Title);
        // Encrypt Title if Encryption Key is Provided
        const EncryptedData = await new ClassBased.CryptoGraphy(
          String(this.#EncryptionKey),
        ).Encrypt(Data.Data); // Encrypt Data if Encryption Key is Provided

        // Check if Title is Provided and Match with Decrypted Title
        return {
          Title: EncryptedTitle,
          Data: EncryptedData,
        };
      }),
    );

    // Filter out null values (where Title did not match)
    return EncryptedData.filter(Boolean); // Filter out null values (where Title did not match)
  }
}
