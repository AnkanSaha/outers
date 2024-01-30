import { Request, Response, NextFunction } from "express"; // <--- import express Request type

// Import Storage Manager
import ShortStorage from "../../Storage Management/ShortStorage.storage"; // <--- import ShortStorage
import { Serve, StatusCodes } from "../../outer";

// Main Code
/**
 * Middleware function for logging HTTP requests.
 *
 * @param ArrayOFmethods - Optional array of HTTP methods to log. Defaults to ["GET", "POST", "PUT", "DELETE", "PATCH"].
 * @param FileName - Optional name of the log file. Defaults to "HTTP-Logger".
 * @param FilePATH - Optional path to the log file. Defaults to "Logs/".
 * @param EncryptionKey - Optional encryption key for the log file. Defaults to a combination of the FileName and FilePATH.
 *
 * @returns Middleware function that logs HTTP requests.
 */
export default (
  ArrayOFmethods?: string[],
  FileName?: string,
  FilePATH?: string,
  EncryptionKey?: string,
) => {
  // Check if FileName is undefined
  const LocalFilename = FileName === undefined ? "HTTP-Logger" : FileName; // Default FileName

  // Check if FilePATH is undefined
  const LocalFilePATH = FilePATH === undefined ? "Logs/" : FilePATH; // Default FilePATH

  // Configure MaxFileSize in KB
  let MaxFileSize = 10; // Default MaxFileSize to 10MB

  // Check if ArrayOFmethods is undefined
  const Arrays = ArrayOFmethods === undefined ? [] : ArrayOFmethods; // Default ArrayOFmethods to empty array

  // Check if EncryptionKey is undefined
  if (EncryptionKey === undefined)
    EncryptionKey = `${LocalFilename}-${LocalFilePATH}`; // Set Encryption Key; // Default EncryptionKey

  return async (Request: Request, Response: Response, Next: NextFunction) => {
    // Create Storage Manager Instance
    const Storage = new ShortStorage(
      LocalFilename,
      MaxFileSize,
      LocalFilePATH,
      EncryptionKey,
    ); // Create Storage Manager Instance
    // Find if Request Method is in ArrayOFmethods
    const isAllowed = Arrays.some((method) => method === Request.method);

    // If Request Method is not in ArrayOFmethods, then return Next Middleware
    if (isAllowed === false) Next(); // Next Middleware
    else {
      const RequesterIPaddress = String(
        Request.headers["x-forwarded-for"] ||
          Request.connection.remoteAddress ||
          Request.socket.remoteAddress ||
          Request.socket.remoteAddress,
      ); // Get Requester IP Address
      try {
        const StorageResult = await Storage.Save(
          `${Request.method} - ${Request.url} - ${
            Request.headers["user-agent"]
          } - ${new Date().toLocaleString()}`,
          {
            FullURL: `${Request.protocol}${Request.hostname}`,
            Method: Request.method,
            PATH: Request.url,
            UserAgent: Request.headers["user-agent"],
            IP: RequesterIPaddress,
            Body: Request.method === "GET" ? undefined : Request.body,
            Query: Request.query,
            Params: Request.params,
            Cookies: Request.cookies,
            Time: new Date().toLocaleString(),
          },
        ); // Save Request Data

        // Check Errors in StorageResult
        if (StorageResult.status === 4000) {
          MaxFileSize = MaxFileSize * 2; // Double MaxFileSize when it is exceeded
          Next(); // Next Middleware after saving Request Data
        } else if (StorageResult.status === 403) {
          Next(); // Next Middleware after saving Request Data
        }

        Next(); // Next Middleware after saving Request Data
      } catch (error) {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: "Failed To Proceed",
          data: error,
          message:
            "Unable to Proceed your Request further, there is some error in configuration in Server",
        }); // Send Error Response
      }
    }
  };
};
