// global types
type globe =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | symbol
  | bigint;

type anyArray = unknown[]; // type anything is an array of unknown type

// Import Interfaces
import JSONresponseInterface from "./Response/JSON-Response.Interface"; // import JSON Response Interface
import FileResponseInterfaces from "./Response/File-Response.Interface"; // import File Response Interface
import RenderResponseInterface from "./Response/Render-Response-Interface"; // import Render Response Interface
import { Request, Response, NextFunction } from "express"; // Import Request, Response, NextFunction from express

// Interface for Wait Object
export interface WaitInterface {
  MS: (ms: number) => Promise<unknown>;
  Seconds: (seconds: number) => Promise<unknown>;
  Minutes: (minutes: number) => Promise<unknown>;
  Hours: (hours: number) => Promise<unknown>;
  Days: (days: number) => Promise<unknown>;
  Weeks: (weeks: number) => Promise<unknown>;
  Months: (months: number) => Promise<unknown>;
  Centuries: (centuries: number) => Promise<unknown>;
  Decades: (decades: number) => Promise<unknown>;
  GregorianYear: (gregorianYear: number) => Promise<unknown>;
  LeapYear: (leapYear: number) => Promise<unknown>;
  Millenia: (millenia: number) => Promise<unknown>;
  Year: (year: number) => Promise<unknown>;
}

// Interface for Console Colors
export interface ConsoleInterface {
  blue: (...Payload: anyArray) => globe;
  bright: (...Payload: anyArray) => globe;
  cyan: (...Payload: anyArray) => globe;
  dimmed: (...Payload: anyArray) => globe;
  gray: (...Payload: anyArray) => globe;
  green: (...Payload: anyArray) => globe;
  magenta: (...Payload: anyArray) => globe;
  red: (...Payload: anyArray) => globe;
  reverse: (...Payload: anyArray) => globe;
  underscore: (...Payload: anyArray) => globe;
  yellow: (...Payload: anyArray) => globe;
}

//Interface for Serve Object
export type ServeInterface = {
  JSON: ({Title, data, message, response, status, statusCode, contentType, cookieData}: JSONresponseInterface) => void;
  File: ({response, rootName, statusCode, Filename, contentType, cookieData}: FileResponseInterfaces) => void;
  Render: ({response, statusCode, FileName, Variables, contentType, cookieData}: RenderResponseInterface)=> void;
}

// Interface for Middleware Object
export interface MiddlewareInterface {
  RequestInjectIP: (Methods?: string[]) => (Request: Request, Response: Response, Next: NextFunction)=> void;
  URL_Controller: ( AllowedURLs: string[], StatusCode?: number, ErrorMessage?: string, Reverse?: boolean,)=> (Request: Request, Response: Response, Next: NextFunction)=> void;
  IPAccessController: (  AllowedIP: string[], StatusCode?: number, ErrorMessage?: string, Reverse?: false,) => (Request: Request, Response: Response, Next: NextFunction)=> void;
  User_AgentController: (  BrowserNames: string[], BrowserVersions?: string[], StatusCode?: number, ErrorMessage?: string, Reverse?: boolean,) => (Request: Request, Response: Response, Next: NextFunction) => void;
}