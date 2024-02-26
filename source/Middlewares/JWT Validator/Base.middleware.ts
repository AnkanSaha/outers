import { Request, NextFunction, Response } from "express"; // Import Request from express
import {
  XPoweredBy,
  ServerName,
} from "../../Config/Constant/Middleware.Constant"; // Import X-Powered-By Header

// Import Console from Utilities
import { red } from "../../Logs/Console.log"; // import Red Console

// Import Serve Function
import { JSONSendResponse } from "../../Response/JSON-Response"; // Import JSON Response

// Import Status Codes
import { StatusCode } from "../../StatusCode/Code"; // Import Status Codes


// Main Function
export default (TokenFieldName: string, SecretToken: string) => {
  
}