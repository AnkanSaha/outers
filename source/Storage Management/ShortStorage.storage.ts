/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  writeFile,
  readFile,
  stat,
  access,
  mkdir,
  rmdir,
  unlink,
  constants,
} from "node:fs/promises"; // Import Node.js Dependencies

// Import Encryption and Decryption Functions
import { methods } from "../outer"; // Import Encryption and Decryption Functions

// Interfaces for ShortStorage Response
import { ShortStorage } from "./Interface/ShortStorage.interface"; // Import ShortStorage Interface

// Main Function Sto Store Data in Short Storage
/**
 * Represents a short storage for saving and retrieving data.
 */
export default class CreateNewShortStorage {
  // Properties
  private readonly StorageName: string; // Storage Name
  private readonly StoragePath: string; // Storage Path
  private readonly MaxStorageSize: number; // Max Storage Size
  private readonly EncryptionKey?: string; // Encryption Key

  /**
   * Creates a new instance of the ShortStorage class.
   * @param {string} StorageName - The name of the storage.
   * @param {number} [MaxStorageSize] - The maximum size of the storage in kilobytes. Defaults to 10 kilobytes if not provided.
   * @param {string} [EncryptionKey] - The encryption key to use for encrypting and decrypting data. Defaults to undefined if not provided.
   * @param {string} [StoragePath] - The path to the storage file. Defaults to "source/.temp/" if not provided.
   */
  constructor(
    StorageName?: string,
    MaxStorageSize?: number,
    EncryptionKey?: string,
    StoragePath?: string,
  ) {
    this.StorageName = StorageName?.toLowerCase() ?? "outers"; // Set Storage Name
    this.StoragePath = StoragePath ?? "Cache/"; // Set Storage Path
    this.MaxStorageSize = MaxStorageSize ?? 100; // Set Max Storage Size to 100 Kilobyte
    this.createShortStorage(); // Create Short Storage
    this.EncryptionKey = EncryptionKey ?? `${this.StorageName}-${this.StoragePath}-${this.MaxStorageSize}`; // Set Encryption Key
  }

  /**
   * Saves the provided data with the given title to the storage.
   * @param {string} Title - The title of the data.
   * @param {any} Data - The data to be saved.
   * @returns {Promise<ShortStorage>} - A promise that resolves when the data is successfully saved.
   */
  public async Save(Title: string, Data: any): Promise<ShortStorage> {
    await this.UnlockFile(); // Unlock File
    // Check if File size is bigger than Max Storage Size
    const FileStats = await stat(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
    ); // Get File Stats

    // Convert File Size to Megabytes and Check if it's bigger than Max Storage Size
    const fileSizeInBytes = FileStats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    // const fileSizeInMegabytes = fileSizeInKilobytes / 1024;

    if (fileSizeInKilobytes > this.MaxStorageSize) {
      await this.LockFile(); // Lock File
      return {
        status: 400,
        message: "Storage Size is Bigger Than Max Storage Size",
        Data: [],
        TotalData: 0,
      };
    }

    // Check if Data is Already Exists in Short Storage
    const FindData = await this.Get(Title); // Get Data

    if (FindData.Data.length !== 0) {
      await this.LockFile(); // Lock File
      return {
        status: 403,
        message: "Data Already Exists",
        Data: FindData.Data,
        TotalData: FindData.TotalData,
      };
    }

    await this.UnlockFile(); // Unlock File
    const RawData = await readFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      "utf-8",
    ); // Get Raw Data
    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Encrypt Data if Encryption Key is Provided
    const UserProvidedData = await new methods.CryptoGraphy(
      String(this.EncryptionKey),
    ).Encrypt(Data); // Set User Provided Data
    const UserProvidedTitle = await new methods.CryptoGraphy(
      String(this.EncryptionKey),
    ).Encrypt(Title); // Set User Provided Title

    // Push The New Data In The Array
    ParsedData.push({
      Title: UserProvidedTitle,
      Data: UserProvidedData,
    });

    // Write The New Data in File
    await writeFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify(ParsedData),
      "utf-8",
    );

    // Lock File After Write Data
    await this.LockFile(); // Lock File

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
    // Unlock File
    await this.UnlockFile(); // Unlock File
    const RawData = await readFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      "utf-8",
    ); // Get Raw Data

    // Lock File
    await this.LockFile(); // Lock File

    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Find The Data with Decryption if Encryption Key is Provided
    const EncryptedData = await Promise.all(
      ParsedData.map(async (Data) => {
        const DecryptedTitle = JSON.parse(
          await new methods.CryptoGraphy(String(this.EncryptionKey)).Decrypt(
            Data.Title,
          ),
        ); // Decrypt Title if Encryption Key is Provided
        const DecryptedData = JSON.parse(
          await new methods.CryptoGraphy(String(this.EncryptionKey)).Decrypt(
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
    const FindData = await this.Get(Title); // Get Data

    // Check if Data is Already Exists in Short Storage
    if (FindData.Data.length === 0) {
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
    await this.UnlockFile(); // Unlock File

    // Write The New Data in File
    await writeFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify(EncryptedBuiltData),
      "utf-8",
    );

    // Lock File After Write Data
    await this.LockFile(); // Lock File
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
    await this.UnlockFile(); // Unlock File

    // Write The New Data in File
    await writeFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify(EncryptedBuiltData),
      "utf-8",
    );

    // Lock File After Write Data
    await this.LockFile(); // Lock File

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
      await access(this.StoragePath); // Check if Directory Exists

      // Get All Data in Storage File Before Delete
      const AllDataInStorage = await this.Get(); // Get All Data in Storage File

      // Unlock File Before Delete Data
      await this.UnlockFile(); // Unlock File

      // Delete All Data in Storage File
      await unlink(`${this.StoragePath}.${this.StorageName}.storage.json`); // Delete File
      await rmdir(`${this.StoragePath}`); // Delete Storage Directory

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
      await access(`${this.StoragePath}.${this.StorageName}.storage.json`); // Check if Directory Exists
    } catch (error) {
      // Directory does not exist, create it
      await mkdir(`${this.StoragePath}`, { recursive: true }); // Create Directory

      // Write Empty Data in this File
      await writeFile(
        `${this.StoragePath}.${this.StorageName}.storage.json`,
        JSON.stringify([]),
        "utf-8",
      ); // Create Storage File
      await this.LockFile(); // Lock File
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
        const EncryptedTitle = await new methods.CryptoGraphy(
          String(this.EncryptionKey),
        ).Encrypt(Data.Title);
        // Encrypt Title if Encryption Key is Provided
        const EncryptedData = await new methods.CryptoGraphy(
          String(this.EncryptionKey),
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

  private async LockFile() {
    // Change File Permission
    try {
      await access(
        `${this.StoragePath}.${this.StorageName}.storage.json`,
        constants.R_OK | constants.W_OK | constants.X_OK,
      ); // Check if File is readable, writable, and executable for the current user.
      return {
        status: 403,
        message:
          "File is readable, writable, and executable for the current user.",
      };
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return {
          status: 404,
          message: "File Not Found",
        }; // File does not exist
      } else {
        // if it is, then change the permission to 0o000
        await methods.Command.Execute(
          `chmod 000 ${this.StoragePath}.${this.StorageName}.storage.json`,
        ); // Change File Permission
        return {
          status: 200,
          message:
            "File is not readable, writable, and executable for the current user.",
        }; // File exists
      }
    }
  }

  private async UnlockFile() {
    // Change File Permission to 0o777 if it is 0o000
    try {
      await access(
        `${this.StoragePath}.${this.StorageName}.storage.json`,
        constants.R_OK | constants.W_OK | constants.X_OK,
      ); // Check if File is readable, writable, and executable for the current user.

      return {
        status: 403,
        message:
          "File is not readable, writable, and executable for the current user.",
      }; // File exists
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return {
          status: 404,
          message: "File Not Found",
        }; // File does not exist
      } else {
        await methods.Command.Execute(
          `chmod 666 ${this.StoragePath}.${this.StorageName}.storage.json`,
        ); // Change File Permission
        return {
          status: 200,
          message:
            "File is readable, writable, and executable for the current user.",
        };
      }
    }
  }
}
