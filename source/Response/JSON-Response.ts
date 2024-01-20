/* eslint-disable @typescript-eslint/no-explicit-any */
// types

// Interfaces
import JSONresponseInterface from "./Interface/JSON-Response.Interface";  // JSON Interface

/**
 * The SendResponse function sends a JSON response with the specified status, status code, message, and
 * data.
 * @param {responseInterface}  - - `status`: The status of the response (e.g., "success" or "error").
 * @param {responseInterface}  - - `statusCode`: The HTTP status code to be sent in the response.
 * @param {responseInterface}  - - `Title`: The title of the response (e.g., "Success" or "Error").
 * @param {responseInterface}  - - `message`: The message of the response (e.g., "The request was successful.").
 * @param {responseInterface}  - - `data`: The data to be sent in the response.
 * @param {responseInterface}  - - `cookieData`: The cookie data to be sent in the response.
 */
export const JSONSendResponse = ({ status, statusCode, Title, message, response, data, cookieData }: JSONresponseInterface) => {
    if(cookieData){
        cookieData.forEach(({ name, value, options }) => {
            response.cookie(name, value, options); // sets cookie
        }); // end forEach loop
        response.status(statusCode).json({ status, statusCode, Title, message, data }); // sends response with cookie
    }
    else {
        response.status(statusCode).json({ status, statusCode, Title, message, data }); // sends response without cookie
    }
};