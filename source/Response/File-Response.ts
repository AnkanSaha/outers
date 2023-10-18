
/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type int = number;

//  The SendFileResponse function sends a file response with the specified status, status code, message, and
export interface FileResponseInterfaces {
    response: {
        status: (statusCode: int) => {
            sendFile: (Filename: unknown, { root }: { root : str }) => void
        }
    },
    statusCode: int,
    Filename?: str,
    rootName: str
}

// Send File Response
/**
 * The function sends a file as a response with the specified status code, filename, and root
 * directory.
 * @param {FileResponseInterface}  - - `statusCode`: The HTTP status code to be sent in the response.
 */
export const SendFileResponse = ({ statusCode, response, Filename, rootName }: FileResponseInterfaces) => {
    response.status(statusCode).sendFile(Filename, { root: rootName });
};