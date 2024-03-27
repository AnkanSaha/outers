import { red } from "../Logs/Console.log"; // Import Color Console Log
import { StatusCode } from "../StatusCode/Code"; // Import Status Code
import TypeCheck from "./IP Type Checker.function"; // Import IP Type Checker Function

// Import Storage
import Storage from "../Storage Management/ShortStorage.storage"; // Import Short Storage Module

// Import Interfaces
import { IGetIPDetails } from "../Config/Interfaces/Functions/Get IP Details.interface"; // Import IGetIPDetails from IP Details.utils.interface

// Import Constant Values
import { APiCall } from "../Config/Constant/Functions.constant"; // Import APiCall from IP Details.utils.constant

// Main Function
/**
 * Retrieves details for a given IP address using an API.
 *
 * @param {string} IP_INFO_API_KEY The API key for accessing IP information.
 * @readonly login to https://https://ipinfo.io  and get your API key.
 * @param {string} ClientIP The IP address for which to retrieve details.
 * @returns {Promise<IGetIPDetails>} A Promise that resolves to an object containing the IP details.
 */
export default async function getIPDetails(
  IP_INFO_API_KEY: string,
  ClientIP: string
): Promise<IGetIPDetails> {
  try {
    // Register IP Details Short Storage for IP Details Cache
    const IPDetailsShortStorage = new Storage(
      "cache-ip-details-for-nodejs",
      99000000, // Default Storage is 99TB
      "cache-ip-details-for-nodejs"
    ); // Create New Short Storage for IP Details

    // Check if user provided IP_INFO_API_KEY
    if (
      IP_INFO_API_KEY === undefined ||
      IP_INFO_API_KEY === null ||
      IP_INFO_API_KEY === ""
    ) {
      throw new Error("IP_INFO_API_KEY is not provided");
    }

    // Check if user provided ClientIP
    if (ClientIP === undefined || ClientIP === null || ClientIP === "") {
      throw new Error("ClientIP is not provided");
    }

    // Check if IP_INFO_API_KEY is valid
    if (IP_INFO_API_KEY.length < 1) {
      throw new Error("IP_INFO_API_KEY is not valid");
    }

    // Check if ClientIP is valid
    if (ClientIP.length < 1) {
      throw new Error("ClientIP is not valid");
    }

    // Check if IP_INFO_API_KEY is valid

    // Search IP Details in Short Storage
    const IPDetails = await IPDetailsShortStorage.Get(ClientIP); // Get IP Details from Short Storage

    // Check if IP Details are available in Short Storage
    if (IPDetails.status == StatusCode.OK) {
      return {
        status: 200,
        message: "Success",
        details: IPDetails.Data[0].Data,
      };
    }
    const ClientIPData = await APiCall.Get(
      `/${ClientIP}/json?token=${IP_INFO_API_KEY}`,
      true
    );
    const IPType = TypeCheck(ClientIP); // Check if IP is IPv4 or IPv6

    // Save to Short Storage
    await IPDetailsShortStorage.Save(ClientIP, {
      ...ClientIPData,
      Type: IPType,
      origin: "outers Cache Server",
    }); // Save IP Details to Short Storage

    // Send Return data
    return {
      status: 200,
      message: "Success",
      details: {
        ...ClientIPData,
        Type: IPType,
        origin: "IP Address Lookup API Server",
      },
    };
  } catch (error) {
    red(error); // Log Error
    return {
      status: 500,
      message: "Internal Server Error",
      details: null,
    };
  }
}
