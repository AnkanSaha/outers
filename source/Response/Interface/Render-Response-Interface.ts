/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type int = number;
type obj = object;
type bool = boolean;

//  The SendFileResponse function sends a template response with the specified status, status code, message, and
export default interface RenderResponseInterface {
  response: {
    setHeader: (name: str, value: str) => void;
    status: (statusCode: int) => {
      render: (Filename: unknown, Variables?: obj) => void;
      cookie: (
        name: str,
        value: str,
        options: cookieOptions,
      ) => {
        render: (Filename: unknown, Variables?: obj) => void;
      };
    };
    cookie: (
      name: str,
      value: str,
      options: cookieOptions,
    ) => {
      render: (Filename: unknown, Variables?: obj) => void;
    };
  };
  statusCode: int;
  FileName?: str;
  Variables?: obj;
  cookieData?: [
    {
      name: str;
      value: str;
      options: cookieOptions;
    },
  ];

  contentType?: str;
}

// Section Interfaces

interface cookieOptions {
  maxAge: int;
  httpOnly: bool;
  secure: bool;
  sameSite: str;
}
