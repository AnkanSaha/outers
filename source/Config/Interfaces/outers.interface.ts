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