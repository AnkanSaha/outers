/* eslint-disable @typescript-eslint/no-explicit-any */
// types

// Interfaces
import FileResponseInterfaces from "./Interface/File-Response.Interface"; // File Response Interfaces

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
  if (contentType) {
    response.setHeader("Content-Type", contentType);
  }

  // Set Cookie Data to Response if it exists
  if (cookieData) {
    cookieData.forEach((CookieItems) => {
      response.cookie(CookieItems.name, CookieItems.value, CookieItems.options); // sets cookie for each cookie in cookieData
    });
  }

  response.status(statusCode).sendFile(Filename, { root: rootName }); // sends response with file
};
