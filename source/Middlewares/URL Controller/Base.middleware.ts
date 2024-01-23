import { Request, Response, NextFunction } from "express"; // Import Express Module

// Import Interfaces
import { Serve, StatusCodes } from "../../outer"; // Import red from outers

// Main Function
/**
 * Middleware function to check if the request URL is allowed.
 * 
 * @param AllowedURLs - An array of allowed URLs.
 * @param StatusCode - Optional. The status code to be sent if the URL is not allowed. Defaults to 406 (Not Acceptable).
 * @param ErrorMessage - Optional. The error message to be sent if the URL is not allowed.
 * @param Reverse - Optional. If true, the middleware will allow access to URLs not present in the AllowedURLs array. Defaults to false.
 * 
 * @returns A middleware function that checks if the request URL is allowed and handles the response accordingly.
 */
export default async function (
  AllowedURLs: string[],
  StatusCode?: number,
  ErrorMessage?: string,
  Reverse?: boolean
) {
  return (Request: Request, Response: Response, Next: NextFunction) => {
    try {
      const ReverseParams = Reverse ?? false; // Set Reverse to false if it is undefined
      if (ReverseParams === false) {
        // Check if Request URL is Allowed
        if (AllowedURLs.includes(Request.url)) {
          Next(); // Next Middleware
        } else {
          Serve.JSON({
            response: Response,
            status: false,
            Title: "URL Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this URL.",
            data: undefined,
            cookieData: undefined,
          }); // Serve JSON
        }
      } else {
        if (!AllowedURLs.includes(Request.url)) {
          Next(); // Next Middleware
        } else {
          Serve.JSON({
            response: Response,
            status: false,
            Title: "URL Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this URL.",
            data: undefined,
            cookieData: undefined,
          }); // Serve JSON
        }
      }
    } catch (Error) {
      Serve.JSON({
        response: Response,
        status: false,
        Title: "URL Not Allowed to Access",
        statusCode: StatusCodes.NOT_ACCEPTABLE,
        message:
          ErrorMessage ??
          "You are not allowed to access this server from this URL.",
        data: undefined,
        cookieData: undefined,
      }); // Serve JSON
    }
  };
}
