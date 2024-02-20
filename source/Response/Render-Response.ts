/* eslint-disable @typescript-eslint/no-explicit-any */
// Constants
import { MIME_Types } from "../Config/Constant/Response.Constant"; // Import JPG_REGEX

// Import interfaces
import RenderResponseInterface from "./Interface/Render-Response-Interface";

/**
 * Renders a response with provided parameters.
 * @param {RenderResponseInterface} options - An object containing parameters for rendering the response.
 * @param {number} options.statusCode - The HTTP status code to be set.
 * @param {string} options.FileName - The name of the template file to render.
 * @param {Object} options.Variables - The variables to be passed to the template file.
 * @param {Array} options.cookieData - An array of objects representing cookie data to be set.
 * @param {Response} options.response - The Express response object.
 * @param {string} options.contentType - The content type of the response.
 */
export default function RenderResponse({
  statusCode,
  FileName,
  Variables,
  cookieData,
  response,
  contentType,
}: RenderResponseInterface) {
  // Set Content Type if available
  if (contentType) {
    // Regex to check if the content type is a valid MIME type
    const Valid_contentType = MIME_Types.find((type) => {
      const regex = new RegExp(type, "i"); // Create a Regular Expression for MIME Type to match
      if (regex.test(contentType)) {
        return true; // Return true when the test passes
      }
    });

    // Check if the content type is a valid MIME type
    Valid_contentType
      ? response.setHeader("Content-Type", contentType)
      : response.setHeader("Content-Type", "text/plain"); // Set Content Type
  }

  // Add Cookie Data if available
  if (cookieData) {
    cookieData.forEach(({ name, value, options }) => {
      response.cookie(name, value, options); // sets cookie
    });
  }

  // Set status code and render file
  response.status(statusCode).render(FileName, Variables);
}
