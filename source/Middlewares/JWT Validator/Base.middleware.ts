import { Request, NextFunction, Response } from "express"; // Import Request from express
import {
  XPoweredBy,
  ServerName,
} from "../../Config/Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import JWT Method for Token Validation
import JWT from "../../JWT/JWT.method"; // Import JWT Method

// Import Console from Utilities
import { red } from "../../Logs/Console.log"; // import Red Console

// Import Serve Function
import JSON_Responser from "../../Response/Class/JSON-Response.class"; // Import JSON Response

// Import Status Codes
import { StatusCode } from "../../StatusCode/Code"; // Import Status Codes

// Main Function
/**
 * Middleware function that validates a JWT token.
 * @param TokenFieldName - The name of the token field in the request headers, body, query, or params.
 * @param SecretToken - The secret token used to verify the JWT.
 * @returns The middleware function.
 */
export default (TokenFieldName: string, SecretToken: string) => {
  // Check if User Provided Token Field Name & Secret Token
  if (!TokenFieldName) {
    throw new Error("Token Field Name is Required"); // Throw Error if Token Field Name is not Provided
  }

  if (!SecretToken) {
    throw new Error("Secret Token is Required"); // Throw Error if Secret Token is not Provided
  }

  // Create A new JWT Instance
  const JWT_Manager = new JWT(SecretToken); // Create New JWT Instance

  return async (Request: Request, Response: Response, Next: NextFunction) => {
    // Change Response X-Powered-By Header & Server Header
    Response.setHeader("X-Powered-By", XPoweredBy()); // Set X-Powered-By Header
    Response.setHeader("Server", ServerName()); // Set Server Header

    // Create Response Instances
    const EmptyToken = new JSON_Responser(
      Response,
      StatusCode.UNAUTHORIZED,
      "json",
      `${TokenFieldName} is Required`,
      `${TokenFieldName} is Required to access this route`,
    ); // Create New JSON Response Instance for Empty Token
    const BAD_REQUEST = new JSON_Responser(
      Response,
      StatusCode.BAD_REQUEST,
      "json",
      "Bad Request",
      "No headers provided",
    ); // Create New JSON Response Instance
    const INTERNAL_SERVER_ERROR = new JSON_Responser(
      Response,
      StatusCode.INTERNAL_SERVER_ERROR,
      "json",
      "Internal Server Error",
      "Internal Server Error, Please Try Again",
    ); // Create New JSON Response Instance for Internal Server Error

    const InvalidToken = new JSON_Responser(
      Response,
      StatusCode.UNAUTHORIZED,
      "json",
      "Invalid Token",
      "Invalid Token Provided to access this route",
    ); // Create New JSON Response Instance for Invalid Token

    // Common Data Set to send in Response
    const CommonResponseData: object = {
      requestedUrl: Request.url,
      requestedMethod: Request.method,
      requestedBody: Request.body,
      requestedHeaders: Request.headers,
    }; // Common Data Set to send in Response

    // Check if Request has Headers
    if (!Request.headers) {
      return BAD_REQUEST.Send(undefined); // Send Response if Headers are not available
    }

    try {
      if (!Request.headers[TokenFieldName]) {
        if (!Request.body[TokenFieldName]) {
          if (!Request.query[TokenFieldName]) {
            if (!Request.params[TokenFieldName]) {
              return EmptyToken.Send(CommonResponseData); // Send Response if Token is not available
            } else {
              const toKenValidation = await JWT_Manager.decode(
                String(Request.params[TokenFieldName]),
              ); // Verify Token
              if (toKenValidation.status === "Success") {
                Next(); // Next Middleware
              } else if (toKenValidation.status === "Invalid") {
                return InvalidToken.Send(CommonResponseData); // Send Response if Token is Invalid
              }
            }
          } else {
            const toKenValidation = await JWT_Manager.decode(
              String(Request.query[TokenFieldName]),
            ); // Verify Token
            if (toKenValidation.status === "Success") {
              Next(); // Next Middleware
            } else if (toKenValidation.status === "Invalid") {
              return InvalidToken.Send(CommonResponseData); // Send Response if Token is Invalid
            }
          }
        } else {
          const toKenValidation = await JWT_Manager.decode(
            String(Request.body[TokenFieldName]),
          ); // Verify Token
          if (toKenValidation.status === "Success") {
            Next(); // Next Middleware
          } else if (toKenValidation.status === "Invalid") {
            return InvalidToken.Send(CommonResponseData); // Send Response if Token is Invalid
          }
        }
      } else {
        const toKenValidation = await JWT_Manager.decode(
          String(Request.headers[TokenFieldName]),
        ); // Verify Token
        if (toKenValidation.status === "Success") {
          Next(); // Next Middleware
        } else if (toKenValidation.status === "Invalid") {
          return InvalidToken.Send(CommonResponseData); // Send Response if Token is Invalid
        }
      }
    } catch (error) {
      red(error); // Log Error
      return INTERNAL_SERVER_ERROR.Send(undefined); // Send Response if Internal Server Error
    }
  };
};
