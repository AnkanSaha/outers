/**
 * Middleware function that injects the requester's IP address into the request body.
 * Only allows PUT, POST, PATCH, and DELETE methods by default.
 *
 * @param Methods - Optional array of allowed HTTP methods. Defaults to PUT, POST, PATCH, and DELETE.
 * @returns Express middleware function.
 */
import { Request, NextFunction, Response } from "express"; // Import Request from express
import {
  XPoweredBy,
  ServerName,
  IPAllowedMethods,
} from "../../Config/Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import Console from Utilities
import { red } from "../../Logs/Console.log"; // import Red Console
import IPChecker from "../../Functions/IP Type Checker.function"; // Import IP Type Checker

// Import Serve Function
import { JSONSendResponse } from "../../Response/JSON-Response"; // Import JSON Response

// Import Status Codes
import { StatusCode } from "../../StatusCode/Code"; // Import Status Codes

// main function

export default (Methods?: string[]) => {
  // Allow only PUT, POST, PATCH, DELETE methods
  const AllowedMethods = Methods ?? IPAllowedMethods; // Allowed Methods

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

      // Check if Request Method is Allowed
      if (AllowedMethods.includes(Request.method)) {
        const RequesterIPaddress =
          Request.headers["x-forwarded-for"] ||
          Request.connection.remoteAddress ||
          Request.socket.remoteAddress ||
          Request.socket.remoteAddress ||
          Request.headers["x-real-ip"] ||
          Request.ip; // Get Requester IP Address

          // Check if Requester IP is IPv4 or IPv6
          const IPType = IPChecker(String(RequesterIPaddress)); // Get IP Type

        // Inject Requester IP Address
        Request.body.RequesterIPaddress = RequesterIPaddress; // Inject Requester IP Address
        Request.body.IPType = IPType; // Inject IP Type
        
        Next(); // Next Middleware
      } else {
        Next(); // Proceed Without Injecting IP Address
      }
    } catch (Error) {
      red(Error); // Log Error
      JSONSendResponse({
        response: Response,
        status: false,
        Title: "Cannot Process Request",
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        message:
          "Something went wrong while processing your request. Please try again later.",
        data: undefined,
        cookieData: undefined,
        contentType: "application/json",
      });
    }
  }; // Export main function
};
