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
        }
    },
    status: bool,
    statusCode: int,
    Title: str,
    message: str,
    data: obj | undefined | unknown
}


/**
 * The SendResponse function sends a JSON response with the specified status, status code, message, and
 * data.
 * @param {responseInterface}  - - `status`: The status of the response (e.g., "success" or "error").
 */
export const JSONSendResponse = ({ status, statusCode, Title, message, response, data }: JSONresponseInterface) => {
    response.status(statusCode).json({
        status: status,
        statusCode: statusCode,
        Title: Title,
        message: message,
        data: data
    });
};
