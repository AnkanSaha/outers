import { Request, Response, NextFunction } from "express"; // Importing express types
import Storage from "../../Storage Management/ShortStorage.storage"; // Importing ShortStorage
import {
  TodayDate,
  RequestLoggerCredentials,
} from "../../Config/Constant/Middleware.Constant"; // Importing Today's Date
import { StatusCode } from "../../StatusCode/Code"; // Importing Status Code
import { Serve } from "../../Config/outer"; // Importing Serve

// Main middleware function
export default function (
  SaveIP: boolean = true,
  SaveUserAgent: boolean = true,
  SaveRequestTime: boolean = true,
  SaveContentType: boolean = true,
  SaveMethod: boolean = true
) {
  // Create new ShortStorage instance
  const StorageInstance = new Storage(
    RequestLoggerCredentials.RequestLoggerStorageName,
    RequestLoggerCredentials.RequestLoggerStorageDefaultSize, // Default Storage is 99TB
    RequestLoggerCredentials.RequestLoggerStorageEncryptionKey
  );
  return async (Request: Request, Response: Response, Next: NextFunction) => {
    const GetPreviousData = await StorageInstance.Get(TodayDate); // Get previous data

    // Check if previous data is available or not
    if (GetPreviousData.status === StatusCode.NOT_FOUND) {
      const SaveStatus = await StorageInstance.Save(TodayDate, {
        TotalRequest: 0,
        TotalDetails: [
          {
            RequestDate: TodayDate,
            RequestTime: SaveRequestTime
              ? new Date().toLocaleTimeString()
              : undefined,
            RequestIP: SaveIP ? Request.ip : undefined,
            RequestUserAgent: SaveUserAgent
              ? Request.headers["user-agent"]
              : undefined,
            RequestContentType: SaveContentType
              ? Request.headers["content-type"]
              : undefined,
            RequestMethod: SaveMethod ? Request.method : undefined,
            RequestURL: `${Request.protocol}://${Request.hostname}${Request.originalUrl}`,
            DateTimeFormat: "Coordinated Universal Time",
          },
        ],
      });

      // Check if data is saved or not
      SaveStatus.status === StatusCode.OK
        ? Next()
        : Serve.JSON({
            response: Response,
            status: false,
            message: "Unable to process your request, please try again later",
            Title: "Error",
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            data: undefined,
          });
    } else {
      const UpdateStatus = await StorageInstance.Update(TodayDate, {
        TotalRequest: GetPreviousData.Data[0].Data.TotalRequest + 1,
        TotalDetails: [
          ...GetPreviousData.Data[0].Data.TotalDetails,
          {
            RequestDate: TodayDate,
            RequestTime: SaveRequestTime ? new Date().getTime() : undefined,
            RequestIP: SaveIP ? Request.ip : undefined,
            RequestUserAgent: SaveUserAgent
              ? Request.headers["user-agent"]
              : undefined,
            RequestContentType: SaveContentType
              ? Request.headers["content-type"]
              : undefined,
            RequestMethod: SaveMethod ? Request.method : undefined,
            RequestURL: `${Request.protocol}://${Request.hostname}${Request.originalUrl}`,
            DateTimeFormat: "Coordinated Universal Time",
          },
        ],
      });

      // Check if data is updated or not
      UpdateStatus.status === StatusCode.OK
        ? Next()
        : Serve.JSON({
            response: Response,
            status: false,
            message: "Unable to process your request, please try again later",
            Title: "Error",
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            data: undefined,
          });
    }
  };
}
