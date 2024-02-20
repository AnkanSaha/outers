/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Cookies Type
type CookieType = Array<{ name: string; value: string; options: object }>; // Global Cookie Type

// Express Response Object
import { Response } from "express"; // Import Response Object
import { MIME_Types } from "../../Config/Constant/Response.Constant"; // Import JPG_REGEX

// Global JSON Responser Class For Create Response to Client
/**
 * Represents a JSON response object that can be sent using Express.
 */
export default class JSONResponser {
  /**
   * The HTTP status code to be set.
   */
  #StatusCode: number;

  /**
   * The title of the response (e.g., "Success" or "Error").
   */
  #Title?: string;

  /**
   * The message of the response (e.g., "The request was successful.").
   */
  #Message?: string;

  /**
   * The Express response object.
   */
  readonly #response: Response;

  /**
   * The content type of the response.
   */
  readonly #contentType: string;

  /**
   * An optional array of objects representing cookie data to be set.
   */
  #CookieData?: CookieType;

  /**
   * Creates a new instance of the JSONResponser class.
   * @param response The Express response object.
   * @param StatusCode The HTTP status code to be set.
   * @param contentType The content type of the response.
   * @param Title The title of the response (optional).
   * @param Message The message of the response (optional).
   * @param CookieData An optional array of objects representing cookie data to be set.
   */
  constructor(
    response: Response,
    StatusCode: number,
    contentType: string,
    Title?: string,
    Message?: string,
    CookieData?: CookieType,
  ) {
    this.#StatusCode = StatusCode;
    this.#Title = Title;
    this.#Message = Message;
    this.#response = response;
    this.#contentType = contentType;
    this.#CookieData = CookieData;
    this.setContentType();
  }

  /**
   * Sends the JSON response.
   */
  Send(
    Data: any,
    Title?: string,
    Message?: string,
    StatusCode?: number,
    CookieData?: CookieType,
  ) {
    // If CookieData is provided, set the cookies. Otherwise, do nothing.
    if (this.#CookieData) {
      this.#CookieData.forEach(({ name, value, options }) => {
        this.#response.cookie(name, value, options);
      });
    }

    // If the Title, Message, or StatusCode parameters are provided, update the corresponding properties.
    if (Title) {
      this.#Title = Title; // Update the Title property. If the Title property
    }

    if (Message) {
      this.#Message = Message; // Update the Message property.
    }

    if (StatusCode) {
      this.#StatusCode = StatusCode; // Update the StatusCode property.
    }

    // if CookieData is provided, set the cookies. Otherwise, do nothing.
    if (CookieData) {
      CookieData.forEach(({ name, value, options }) => {
        this.#response.cookie(name, value, options);
      });
    }

    // Send the JSON response.
    this.#response.status(this.#StatusCode).json({
      status: this.#Title,
      statusCode: this.#StatusCode,
      Title: this.#Title ?? undefined,
      message: this.#Message ?? undefined,
      data: Data,
    });
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
        ? this.#response.setHeader("Content-Type", this.#contentType)
        : this.#response.setHeader("Content-Type", "text/plain");
    }
  }
}
