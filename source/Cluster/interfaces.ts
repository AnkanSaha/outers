/* eslint-disable @typescript-eslint/no-explicit-any */
// Imports
import { Request, Response, NextFunction } from "express"; // Express
// This interface is used to define the type of the StringMiddlewares object
export interface EngineMiddlewares {
  [key: string]: {
    Key: string;
    Value?:
      | string
      | number
      | boolean
      | null
      | (() => void)
      | ((Request: Request, Response: Response, next: NextFunction) => void); // Index signature for string keys with an array of functions
  };
}

// This interface is used to define the type of the ResponseObject object
export interface ResponseObject {
  ActiveServer: any;
  ActiveWorker: number;
  BeforeListenFunctionsResponse: object[],
  [key: string]: any | number | undefined | object | (() => void)[] | undefined;
}