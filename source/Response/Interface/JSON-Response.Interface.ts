/* eslint-disable @typescript-eslint/no-explicit-any */
// types
type str = string;
type obj = object;
type int = number;
type bool = boolean;

// interfaces
/* The `interface responseInterface` is defining the structure of an object that has the following
properties: */
export default interface JSONresponseInterface {
  response: {
    status: (statusCode: int) => {
      json: (data: obj) => void;
      cookie: (
        name: str,
        value: str,
        options: cookieOptions,
      ) => {
        json: (data: obj) => void;
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
  status: bool;
  statusCode: int;
  Title: str;
  message: str;
  data: obj | undefined | unknown;
  cookieData?:
    | [
        {
          name: str;
          value: str;
          options: cookieOptions;
        },
      ]
    | undefined;
}

// Section Interfaces

interface cookieOptions {
  maxAge: int;
  httpOnly: bool;
  secure: bool;
  sameSite: str;
}
