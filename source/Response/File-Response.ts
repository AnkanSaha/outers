
/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type int = number;
type obj = object;

//  The SendFileResponse function sends a file response with the specified status, status code, message, and
export interface FileResponseInterfaces {
    response: {
        status: (statusCode: int) => {
            sendFile: (Filename: unknown, { root }: { root : str }) => void
            cookie : (name: str, value: str, options: obj) => {
                sendFile: (Filename: unknown, { root }: { root : str }) => void
            }
        },
        cookie: (name: str, value: str, options: obj) => {
            json: (data: obj) => void
        }
    },
    statusCode: int,
    Filename?: str,
    rootName: str,
    cookieData?: [
        {
            name: str,
            value: str,
            options: obj
        }
    ] | undefined
}

// Send File Response
/**
 * The function sends a file as a response with the specified status code, filename, and root
 * directory.
 * @param {FileResponseInterface}  - - `statusCode`: The HTTP status code to be sent in the response.
 * @param {FileResponseInterface}  - - `Filename`: The filename of the file to be sent in the response.
 * @param {FileResponseInterface}  - - `rootName`: The root directory of the file to be sent in the response.
 * @param {FileResponseInterface}  - - `cookieData`: The cookie data to be sent in the response.
 */
export const SendFileResponse = ({ statusCode, response, Filename, rootName, cookieData }: FileResponseInterfaces) => {
    if(cookieData){
        cookieData.forEach(({ name, value, options }) => {
            response.cookie(name, value, options); // sets cookie for each cookie in cookieData
        });
        response.status(statusCode).sendFile(Filename, { root: rootName }); // sends response with cookie
    }
    else {
        response.status(statusCode).sendFile(Filename, { root: rootName }); // sends response without cookie
    }
};