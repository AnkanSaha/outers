import { Request, Response, NextFunction } from "express"; // Import Express Module
import {
  XPoweredBy,
  ServerName,
} from "../../Config/Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import Interfaces
import { Serve, StatusCodes } from "../../Config/outer"; // Import red from outers

// Main Function
/**
 * Middleware function to check if the request URL is allowed or not.
 *
 * @param AllowedURLs - An array of allowed URLs.
 * @param StatusCode - Optional. The status code to be sent if the URL is not allowed. Defaults to 406 (Not Acceptable).
 * @param ErrorMessage - Optional. The error message to be sent if the URL is not allowed.
 * @param Reverse - Optional. If true, the middleware will allow access to URLs not present in the AllowedURLs array. Defaults to false.
 *
 * @returns A middleware function that checks if the request URL is allowed and handles the response accordingly.
 */
export default function (
  AllowedURLs: string[],
  StatusCode?: number,
  ErrorMessage?: string,
  Reverse?: boolean,
) {
  if (AllowedURLs.length === 0)
    throw new Error("AllowedURLs array cannot be empty"); // Throw Error if AllowedURLs array is empty

  return (Request: Request, Response: Response, Next: NextFunction) => {
    const ReverseParams = Reverse ?? false; // Set Reverse to false if it is undefined
    let isAllowed = false; // Set isAllowed to false

    // Change Response X-Powered-By Header & Server Header
    Response.setHeader("X-Powered-By", XPoweredBy()); // Set X-Powered-By Header
    Response.setHeader("Server", ServerName()); // Set Server Header

    // Check if Request has Headers
    if (!Request.headers) {
      return Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        Title: "Bad Request",
        message: "No headers provided",
        data: null,
        cookieData: undefined,
        contentType: "application/json",
      });
    }

    // Check if Request Hostname is available in Array or not
    isAllowed = AllowedURLs.some((url) => {
      const URLRegex = new RegExp(url, "i"); // Create a Regular Expression for URL to match
      return url == "*"
        ? true
        : url.includes("localhost")
          ? true
          : URLRegex.test(Request.hostname); // Check if Requester URL is Allowed or not
    });
    try {
      if (ReverseParams === false) {
        if (isAllowed === true) {
          Next(); // Next Middleware
        } else {
          // Handle the case when no match is found
          Serve.JSON({
            response: Response,
            status: false,
            Title: "URL Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            contentType: "application/json",
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this URL.",
            data: {
              ClientURL: `${Request.protocol}://${Request.headers.host}${Request.url}`,
            },
            cookieData: undefined,
          }); // Serve JSON
          // You may choose to send an error response or redirect the user to an error page
        }
      } else {
        if (isAllowed === false) {
          Next(); // Next Middleware
        } else {
          Serve.JSON({
            response: Response,
            status: false,
            Title: "URL Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            contentType: "application/json",
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this URL.",
            data: {
              ClientURL: `${Request.protocol}://${Request.headers.host}${Request.url}`,
            },
            cookieData: undefined,
          }); // Serve JSON
        }
      }
    } catch (error) {
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.EXPECTATION_FAILED,
        Title: "Failed To Proceed",
        data: error,
        contentType: "application/json",
        message:
          "Unable to Proceed your Request further, there is some error in configuration in Server",
      }); // Send Error Response
    }
  };
}
