import { Request, NextFunction, Response } from "express"; // Import Request from express
import {
  XPoweredBy,
  ServerName,
  AllowedMethods as HTTP_Methods,
} from "../../Config/Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import Console from Utilities
import { red } from "../../Logs/Console.log"; // import Red Console

// Import Serve Function
import { JSONSendResponse } from "../../Response/JSON-Response"; // Import JSON Response

// Import Status Codes
import { StatusCode } from "../../StatusCode/Code"; // Import Status Codes

// Main Function
/**
 * Middleware function that validates the request method against a list of allowed methods.
 * If the request method is not allowed, it sends an error response.
 * @param Methods - Optional array of allowed methods. If not provided, all HTTP methods are allowed.
 * @param reverse - Optional flag to reverse the validation. If true, the request method must not be in the allowed methods list.
 * @returns The middleware function.
 */
export default (Methods?: string[], reverse?: boolean) => {
  // Check if the method exists in the allowed methods
  const AllowedMethods = Methods ?? HTTP_Methods; // Allowed Methods
  const Reverse = reverse ?? false; // Reverse the validation

  // Convert to Upper Case in Array if any of the method is in lower case
  AllowedMethods.forEach((Method, Index) => {
    AllowedMethods[Index] = Method.toUpperCase(); // Convert to Upper Case
  });
  return (Request: Request, Response: Response, Next: NextFunction) => {
    try {
      // Change Response X-Powered-By Header & Server Header
      Response.setHeader("X-Powered-By", XPoweredBy()); // Set X-Powered-By Header
      Response.setHeader("Server", ServerName()); // Set Server Header

      // Check if Request has Headers
      if (!Request.headers) {
        return JSONSendResponse({
          response: Response,
          status: false,
          statusCode: StatusCode.BAD_REQUEST,
          Title: "Bad Request",
          message: "No headers provided",
          data: null,
          cookieData: undefined,
          contentType: "application/json",
        });
      }

      // Check if Request Method is Allowed if Reverse is false
      if (Reverse == false) {
        if (AllowedMethods.includes(Request.method.toUpperCase()) === true) {
          Next(); // Request Method is Allowed if Reverse is false
        } else {
          return JSONSendResponse({
            status: false,
            statusCode: StatusCode.METHOD_NOT_ALLOWED,
            Title: "Method Not Allowed",
            message: `The Request Method ${Request.method} is not allowed`,
            response: Response,
            data: Request.method,
            contentType: "application/json",
          });
        }
      } else if (Reverse == true) {
        if (AllowedMethods.includes(Request.method.toUpperCase()) === false) {
          Next(); // Request Method is Allowed if Reverse is true
        } else {
          return JSONSendResponse({
            status: false,
            statusCode: StatusCode.METHOD_NOT_ALLOWED,
            Title: "Method Not Allowed",
            message: `The Request Method ${Request.method} is not allowed`,
            response: Response,
            data: Request.method,
            contentType: "application/json",
          });
        }
      }
    } catch (error) {
      red(error); // Send Error Response
      return JSONSendResponse({
        status: false,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        Title: "Cannot Process Request",
        message:
          "Something went wrong while processing your request. Please try again later.",
        response: Response,
        data: error,
        contentType: "application/json",
      }); // Send Error Response
    }
  }; // Export The main function
};
