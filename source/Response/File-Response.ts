/* eslint-disable @typescript-eslint/no-explicit-any */
// types
// Constants
import { MIME_Types } from "../Config/Constant/Response.Constant"; // Import JPG_REGEX

// Interfaces
import FileResponseInterfaces from "../Config/Interfaces/Response/File-Response.Interface"; // File Response Interfaces

// Send File Response
/**
 * The function sends a file as a response with the specified status code, filename, and root
 * directory.
 * @param {FileResponseInterface}  - - `statusCode`: The HTTP status code to be sent in the response.
 * @param {FileResponseInterface}  - - `Filename`: The filename of the file to be sent in the response.
 * @param {FileResponseInterface}  - - `rootName`: The root directory of the file to be sent in the response.
 * @param {FileResponseInterface}  - - `cookieData`: The cookie data to be sent in the response.
 */
export const SendFileResponse = ({
  statusCode,
  response,
  Filename,
  rootName,
  cookieData,
  contentType,
}: FileResponseInterfaces) => {
  // Set Content Type if available
  const Valid_contentType = MIME_Types.find((type) => {
    const regex = new RegExp(type, "i"); // Create a Regular Expression for MIME Type to match
    if (regex.test(String(contentType))) {
      return true; // Return true when the test passes
    }
  });

  // Check if the content type is a valid MIME type
  Valid_contentType
    ? response.setHeader("Content-Type", String(contentType))
    : response.setHeader("Content-Type", "text/plain"); // Set Content Type
    
  // Set Cookie Data to Response if it exists
  if (cookieData) {
    cookieData.forEach((CookieItems) => {
      response.cookie(CookieItems.name, CookieItems.value, CookieItems.options); // sets cookie for each cookie in cookieData
    });
  }

  response.status(statusCode).sendFile(Filename, { root: rootName }); // sends response with file
};
