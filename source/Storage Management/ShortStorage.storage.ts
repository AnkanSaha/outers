/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile, readFile, stat } from "node:fs/promises"; // Import Node.js Dependencies
import { writeFileSync, mkdirSync, accessSync } from "node:fs"; // Import Node.js Dependencies

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

  /**
   * Creates a new instance of the ShortStorage class.
   * @param {string} StorageName - The name of the storage.
   * @param {number} [MaxStorageSize] - The maximum size of the storage in kilobytes. Defaults to 10 kilobytes if not provided.
   */
  constructor(StorageName: string, MaxStorageSize?: number) {
    this.StorageName = StorageName ?? 'OutersManagement'; // Set Storage Name
    this.StoragePath = `source/Storage Management/`; // Set Storage Path
    this.MaxStorageSize = MaxStorageSize ?? 10; // Set Max Storage Size to 10 Kilobyte
  }

  /**
   * Saves the provided data with the given title to the storage.
   * @param {string} Title - The title of the data.
   * @param {any} Data - The data to be saved.
   * @returns {Promise<ShortStorage>} - A promise that resolves when the data is successfully saved.
   */
  public async Save(Title: string, Data: any): Promise<ShortStorage> {
    // Check if File size is bigger than Max Storage Size
    const FileStats = await stat(
      `${this.StoragePath}.${this.StorageName}.storage.json`
    ); // Get File Stats

    // Convert File Size to Megabytes and Check if it's bigger than Max Storage Size
    const fileSizeInBytes = FileStats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    // const fileSizeInMegabytes = fileSizeInKilobytes / 1024;

    if (fileSizeInKilobytes > this.MaxStorageSize) {
      return {
        status: 400,
        message: "Storage Size is Bigger Than Max Storage Size",
        Data: undefined,
        TotalData: 0,
      };
    }

    // Check if Data is Already Exists in Short Storage
    const FindData = await this.Get(Title); // Get Data

    if (FindData.Data.length !== 0) {
      return {
        status: 400,
        message: "Data Already Exists",
        Data: undefined,
        TotalData: 0,
      };
    }

    const RawData = await readFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      "utf-8"
    ); // Get Raw Data
    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Push The New Data In The Array
    ParsedData.push({
      Title: Title,
      Data: Data,
    });

    // Write The New Data in File
    await writeFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify(ParsedData),
      "utf-8"
    );

    return {
      status: 200,
      message: "Data Saved Successfully",
      Data: {
        Title: Title,
        Data: Data,
      },
      TotalData: ParsedData.length,
    };
  }

  /**
   * Retrieves data from the storage based on the provided title.
   * @param Title - The title of the data to retrieve.
   * @returns A promise that resolves to an object containing the status, message, and retrieved data.
   */
  public async Get(Title: string): Promise<ShortStorage> {
    const RawData = await readFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      "utf-8"
    ); // Get Raw Data
    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Find The Data
    const Data = ParsedData.filter((Data) => Data.Title === Title);

    if (!Data) {
      return {
        status: 404,
        message: "Data Not Found",
        Data: undefined,
        TotalData: ParsedData.length,
      };
    }

    return {
      status: 200,
      message: "Data Found Successfully",
      Data: Data,
      TotalData: ParsedData.length,
    };
  }

  // Delete Data From Short Storage
  public async Delete(Title: string): Promise<ShortStorage> {
    const RawData = await readFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      "utf-8"
    ); // Get Raw Data
    const ParsedData: any[] = JSON.parse(RawData); // Parsed The Data

    // Find The Data
    const Data = ParsedData.filter((Data) => Data.Title === Title);

    if (!Data) {
      return {
        status: 404,
        message: "Data Not Found",
        Data: undefined,
        TotalData: ParsedData.length,
      };
    }

    // Delete The Data
    const NewData = ParsedData.filter((Data) => Data.Title !== Title);

    // Write The New Data in File
    await writeFile(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify(NewData),
      "utf-8"
    );

    return {
      status: 200,
      message: "Data Deleted Successfully",
      Data: Data,
      TotalData: NewData.length,
    };
  }

  // A Private Method for Create Short Storage Folder
  /**
   * Creates a short storage by checking if the directory exists and creating it if not.
   * Then, it creates a short storage file with an empty JSON object.
   */
  public createShortStorage() {
    // Check if the directory exists, and create it if not
    try {
      accessSync(this.StoragePath);
    } catch (error) {
      // Directory does not exist, create it
      mkdirSync(this.StoragePath, { recursive: true });
    }

    // Create Short Storage File
    writeFileSync(
      `${this.StoragePath}.${this.StorageName}.storage.json`,
      JSON.stringify([
        {
          Title: "Outers",
          Data: "Data Manager",
        },
      ]),
      "utf-8"
    );
  }
}
