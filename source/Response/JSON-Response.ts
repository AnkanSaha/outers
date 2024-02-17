/* eslint-disable @typescript-eslint/no-explicit-any */
// types

// Interfaces
import JSONresponseInterface from "./Interface/JSON-Response.Interface"; // JSON Interface

/**
 * Sends a JSON response with the specified status, status code, title, message, data, and optional cookie data.
 * @param {JSONresponseInterface} options - An object containing parameters for sending the JSON response.
 * @param {string} options.status - The status of the response (e.g., "success" or "error").
 * @param {number} options.statusCode - The HTTP status code to be sent in the response.
 * @param {string} options.Title - The title of the response (e.g., "Success" or "Error").
 * @param {string} options.message - The message of the response (e.g., "The request was successful.").
 * @param {Response} options.response - The Express response object.
 * @param {Object} options.data - The data to be sent in the response.
 * @param {Array} [options.cookieData] - An optional array of objects representing cookie data to be set.
 * @param {string} [options.contentType] - The content type of the response.
 */
export const JSONSendResponse = ({
  status,
  statusCode,
  Title,
  message,
  response,
  data,
  cookieData,
  contentType,
}: JSONresponseInterface) => {

  // Set Content Type if available
  if(contentType){
    response.setHeader("Content-Type", contentType); // Set Content Type
  }

  // Add Cookie Data if available
  if (cookieData) {
    cookieData.forEach(({ name, value, options }) => {
      response.cookie(name, value, options); // sets cookie
    });
  }

  // Send JSON Response
  response
    .status(statusCode)
    .json({ status, statusCode, Title, message, data }); // sends response
};