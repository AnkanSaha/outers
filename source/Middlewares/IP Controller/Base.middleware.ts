import { Request, Response, NextFunction } from "express"; // Import Express Module
import { XPoweredBy, ServerName } from "../../Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import Interfaces
import { Serve, StatusCodes } from "../../Config/outer"; // Import red from outers

// Main Function
/**
 * Middleware function to restrict access based on IP address or URL.
 *
 * @param AllowedIP - An array of allowed IP addresses. must be in string format
 * @param StatusCode - Optional. The status code to be sent in the response if access is denied. Defaults to 406 (Not Acceptable).
 * @param ErrorMessage - Optional. The error message to be sent in the response if access is denied. Defaults to "You are not allowed to access this server from this IP/URL."
 * @param Reverse - Optional. If true, the middleware will allow access only if the requester IP/URL is not in the allowed list. Defaults to false.
 *
 * @returns The middleware function.
 */
export default function (
  AllowedIP: string[],
  StatusCode?: number,
  ErrorMessage?: string,
  Reverse?: false,
) {
  return (Request: Request, Response: Response, Next: NextFunction) => {
    // Change Response X-Powered-By Header & Server Header
    Response.setHeader("X-Powered-By", XPoweredBy); // Set X-Powered-By Header
    Response.setHeader("Server", ServerName); // Set Server Header

    const ReverseParams = Reverse ?? false; // Set Reverse to false if it is undefined
    const RequesterIPaddress = String(
      Request.headers["x-forwarded-for"] ||
        Request.connection.remoteAddress ||
        Request.socket.remoteAddress ||
        Request.socket.remoteAddress ||
        Request.headers["x-real-ip"] ||
        Request.ip, // Get Requester IP Address
    ); // Get Requester IP Address

    let isAllowed = false; // Set isAllowed to false

    try {
      // Check if Request Hostname is available in Array or not
      isAllowed = AllowedIP.some((IP: string) => {
        const IPRegex = new RegExp(IP, "i"); // Create a Regular Expression for IP Address to match
        return IP == "*"
          ? true
          : IP.includes("127")
            ? true
            : IPRegex.test(RequesterIPaddress); // Check if Requester IP is Allowed or not
      }); // Check if Requester IP is Allowed or not

      if (ReverseParams === false) {
        if (isAllowed === true) {
          Next(); // Next Middleware
        } else {
          // Handle the case when no match is found
          Serve.JSON({
            response: Response,
            status: false,
            Title: "IP Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this IP.",
            data: {
              ClientIP: RequesterIPaddress,
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
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this URL.",
            data: {
              ClientIP: RequesterIPaddress,
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
        message:
          "Unable to Proceed your Request further, there is some error in configuration in Server",
      }); // Send Error Response
    }
  };
}
