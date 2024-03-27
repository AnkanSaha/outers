/* eslint-disable @typescript-eslint/no-explicit-any */
import Storage from "../Storage Management/ShortStorage.storage"; // Importing ShortStorage
import { RequestLoggerCredentials } from "../Config/Constant/Middleware.Constant"; // Importing Today's Date
// Interface for Read Request Count
interface ReturnData {
  status: number;
  message: string;
  Data: any[];
  TotalData: number;
}

// Main Function
/**
 * Retrieves the request count from the storage.
 * If a RequestDate is provided, retrieves the request count for that specific date.
 * If no RequestDate is provided, retrieves the overall request count.
 * @param {string} RequestDate - The date for which to retrieve the request count. If not provided, retrieves the overall request count.
 * @param {string} RequestDate - The Date Must Be M/D/YYYY format. like : 3/8/2024
 * @returns {Promise<number>} - A promise that resolves to the request count.
 * @throws {Error} - If unable to read the request count from the storage.
 */
export default async function (RequestDate?: string): Promise<ReturnData> {
  try {
    const StorageInstance = new Storage(
      RequestLoggerCredentials.RequestLoggerStorageName,
      RequestLoggerCredentials.RequestLoggerStorageDefaultSize,
      RequestLoggerCredentials.RequestLoggerStorageEncryptionKey,
    ); // Create new ShortStorage instance
    if (
      RequestDate === undefined ||
      RequestDate === null ||
      RequestDate === ""
    ) {
      return await StorageInstance.Get(); // Get All Data in Storage File
    } else {
      return await StorageInstance.Get(RequestDate);
    }
  } catch (error) {
    throw new Error("Unable to read the request count from the storage.");
  }
}
