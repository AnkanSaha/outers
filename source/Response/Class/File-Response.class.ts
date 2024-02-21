/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Cookies Type

// Express Response Object
import { Response } from "express"; // Import Response Object
import {
  MIME_Types,
  CookieType,
} from "../../Config/Constant/Response.Constant"; // Import JPG_REGEX

// Global File Responser Class For Create Response to Client
export default class FileResponse {
  // Readonly Properties
  readonly #Response: Response; // Response Object
  readonly #rootPATH: string; // Root Name

  // Private Properties
  #StatusCode?: number; // Status Code
  #cookieData?: CookieType; // Cookie Data
  #contentType: string; // Content Type

  constructor(
    Response: Response,
    rootPATH: string,
    contentType: string,
    StatusCode?: number,
    cookieData?: CookieType
  ) {
    // Constructor
    this.#Response = Response; // Set Response
    this.#rootPATH = rootPATH; // Set Root Name
    this.#StatusCode = StatusCode; // Set Status Code
    this.#contentType = contentType; // Set Content Type
    this.#cookieData = cookieData; // Set Cookie Data
    this.setContentType(); // Set Content Type
  }

  // Send File Response
  SendFile(FileName: string, StatusCode?: number, CookieData?: CookieType) {
    // Set Cookie Data to Response if it exists
    if (this.#cookieData) {
      this.#cookieData.forEach((CookieItems) => {
        this.#Response.cookie(
          CookieItems.name,
          CookieItems.value,
          CookieItems.options
        ); // sets cookie for each cookie in cookieData
      });
    }

    // Check if Status Code is available then override the default status code
    if (StatusCode) {
      this.#StatusCode = StatusCode; // Set Status Code
    }

    // Check if Cookie Data is available then set the cookie data
    if (CookieData) {
      CookieData.forEach(({ name, value, options }) => {
        this.#Response.cookie(name, value, options); // sets cookie for each cookie in cookieData
      });
    }

    // Send File Response
    this.#Response
      .status(Number(this.#StatusCode))
      .sendFile(FileName, { root: this.#rootPATH }); // sends response with file
  }

  /**
   * Sets the content type of the response.
   * @private
   */
  private setContentType() {
    if (this.#contentType) {
      const Valid_contentType = MIME_Types.find((type) => {
        const regex = new RegExp(type, "i");
        if (regex.test(this.#contentType)) {
          return true;
        }
      });

      Valid_contentType
        ? this.#Response.setHeader("Content-Type", this.#contentType)
        : this.#Response.setHeader("Content-Type", "text/plain");
    }
  }
}
