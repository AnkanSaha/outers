/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type obj = object;
type int = number;
type bool = boolean;


// interfaces
/* The `interface responseInterface` is defining the structure of an object that has the following
properties: */
export interface JSONresponseInterface {
    response: {
        status: (statusCode: int) => {
            json: (data: obj) => void
            cookie : (name: str, value: str, options: obj) => {
                json: (data: obj) => void
            }
        },
        cookie: (name: str, value: str, options: obj) => {
            json: (data: obj) => void
        }
    },
    status: bool,
    statusCode: int,
    Title: str,
    message: str,
    data: obj | undefined | unknown
    cookieData: [
        {
            name: str,
            value: str,
            options: obj
        }
    ] | undefined
}


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