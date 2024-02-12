import { Request, Response, NextFunction } from "express"; // Import Express Module

// Import Interfaces
import { Serve, StatusCodes } from "../../Config/outer"; // Import red from outers

// Main Function
export default function (
  BrowserNames: string[],
  BrowserVersions?: string[],
  StatusCode?: number,
  ErrorMessage?: string,
  Reverse?: boolean,
) {
  if (BrowserNames.length === 0)
    throw new Error("BrowserNames array cannot be empty"); // Throw Error if AllowedURLs array is empty

  return (Request: Request, Response: Response, Next: NextFunction) => {
    const ReverseParams: boolean = Reverse ?? false; // Set Reverse to false if it is undefined
    let BrowserIsAllowed: boolean = false; // Set BrowserIsAllowed to false
    let BrowserVersionIsAllowed: boolean = false; // Set BrowserVersionIsAllowed to false

    // Change Response X-Powered-By Header
    Response.setHeader("X-Powered-By", "AutoBlocker"); // Set X-Powered-By Header to AutoBlocker

    // Get User Agent & Browser Name & Version
    const UserAgent: string = Request.get("User-Agent") ?? ""; // Get User Agent
    const BrowserName: string = UserAgent.split(" ")[0]; // Get Browser Name
    const BrowserVersion: string = UserAgent.split(" ")[1]; // Get Browser Version

    // Check if User Agent is available in Array or not
    BrowserIsAllowed = BrowserNames.some((name) => {
      return name.toLowerCase() === BrowserName.toLowerCase();
    });

    // Check if Browser Version is available in Array or not
    if (BrowserVersions) {
      BrowserVersionIsAllowed = BrowserVersions.some((version) => {
        return version.toLowerCase() === BrowserVersion.toLowerCase();
      });
    }

    // Check if Browser is allowed or not
    if (ReverseParams === false) {
      if (BrowserVersion.length !== 0) {
        if (BrowserIsAllowed === true && BrowserVersionIsAllowed === true) {
          Next(); // Next Middleware
        } else {
          // Handle the case when no match is found
          Serve.JSON({
            response: Response,
            status: false,
            Title: "Browser & its Version Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this browser and its version.",
            data: {
              ClientBrowser: `${BrowserName} ${BrowserVersion}`,
            },
            cookieData: undefined,
          }); // Serve JSON
          // You may choose to send an error response or redirect the user to an error page
        }
      } else {
        if (BrowserIsAllowed === true) {
          Next(); // Next Middleware
        } else {
          // Handle the case when no match is found
          Serve.JSON({
            response: Response,
            status: false,
            Title: "Browser Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this browser.",
            data: {
              ClientBrowser: `${BrowserName}`,
            },
            cookieData: undefined,
          }); // Serve JSON
          // You may choose to send an error response or redirect the user to an error page
        }
      }
    } else {
      if (BrowserVersion.length !== 0) {
        if (BrowserIsAllowed === false && BrowserVersionIsAllowed === false) {
          Next(); // Next Middleware
        } else {
          Serve.JSON({
            response: Response,
            status: false,
            Title: "Browser & its Version Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this browser and its version.",
            data: {
              ClientBrowser: `${BrowserName} ${BrowserVersion}`,
            },
            cookieData: undefined,
          }); // Serve JSON
        }
      } else {
        if (BrowserIsAllowed === false) {
          Next(); // Next Middleware
        } else {
          Serve.JSON({
            response: Response,
            status: false,
            Title: "Browser Not Allowed to Access",
            statusCode: StatusCode ?? StatusCodes.NOT_ACCEPTABLE,
            message:
              ErrorMessage ??
              "You are not allowed to access this server from this browser.",
            data: {
              ClientBrowser: `${BrowserName}`,
            },
            cookieData: undefined,
          }); // Serve JSON
        }
      }
    }
  };
}
