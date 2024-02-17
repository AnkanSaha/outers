/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type int = number;
type obj = object;
type bool = boolean;

//  The SendFileResponse function sends a file response with the specified status, status code, message, and
export default interface FileResponseInterfaces {
  response: {
    setHeader: (name: str, value: str) => void;
    status: (statusCode: int) => {
      sendFile: (Filename: unknown, { root }: { root: str }) => void;
      cookie: (
        name: str,
        value: str,
        options: cookieOptions,
      ) => {
        sendFile: (Filename: unknown, { root }: { root: str }) => void;
      };
    };
    cookie: (
      name: str,
      value: str,
      options: cookieOptions,
    ) => {
      json: (data: obj) => void;
    };
  };
  statusCode: int;
  Filename?: str;
  rootName: str;
  cookieData?: [
    {
      name: str;
      value: str;
      options: cookieOptions;
    },
  ];
  contentType: str;
}

// Section Interfaces

interface cookieOptions {
  maxAge: int;
  httpOnly: bool;
  secure: bool;
  sameSite: str;
}
