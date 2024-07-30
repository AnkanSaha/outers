/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Request, Response, NextFunction, Express } from "express"; // Import Request, Response, NextFunction from express

// Interface for Wait Object
export interface WaitInterface {
  MS: (func: () => any, ms: number) => Promise<unknown>;
  Seconds: (func: () => any, seconds: number) => Promise<unknown>;
  Minutes: (func: () => any, minutes: number) => Promise<unknown>;
  Hours: (func: () => any, hours: number) => Promise<unknown>;
  Days: (func: () => any, days: number) => Promise<unknown>;
  Weeks: (func: () => any, weeks: number) => Promise<unknown>;
  Months: (func: () => any, months: number) => Promise<unknown>;
  Centuries: (func: () => any, centuries: number) => Promise<unknown>;
  Decades: (func: () => any, decades: number) => Promise<unknown>;
  Millenia: (func: () => any, millenia: number) => Promise<unknown>;
  Year: (func: () => any, year: number) => Promise<unknown>;
}

export interface RetryInterface {
  MS: (
    Function: () => Promise<void>,
    ms: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Seconds: (
    Function: () => Promise<void>,
    Seconds: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Minutes: (
    Function: () => Promise<void>,
    Minutes: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Hours: (
    Function: () => Promise<void>,
    Hours: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Days: (
    Function: () => Promise<void>,
    Days: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Weeks: (
    Function: () => Promise<void>,
    Weeks: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Months: (
    Function: () => Promise<void>,
    Months: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Centuries: (
    Function: () => Promise<void>,
    Centuries: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Decades: (
    Function: () => Promise<void>,
    Decades: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Millenia: (
    Function: () => Promise<void>,
    Millenia: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
  Year: (
    Function: () => Promise<void>,
    Year: number,
    firstEffect: boolean,
  ) => Promise<unknown>;
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
  JSON: ({
    Title,
    data,
    message,
    response,
    status,
    statusCode,
    contentType,
    cookieData,
  }: JSONresponseInterface) => void;
  File: ({
    response,
    rootName,
    statusCode,
    Filename,
    contentType,
    cookieData,
  }: FileResponseInterfaces) => void;
  Render: ({
    response,
    statusCode,
    FileName,
    Variables,
    contentType,
    cookieData,
  }: RenderResponseInterface) => void;
};

// Interface for Middleware Object
export interface MiddlewareInterface {
  RequestInjectIP: (
    Methods?: string[],
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  URL_Controller: (
    AllowedURLs: string[],
    StatusCode?: number,
    ErrorMessage?: string,
    Reverse?: boolean,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  IPAccessController: (
    AllowedIP: string[],
    StatusCode?: number,
    ErrorMessage?: string,
    Reverse?: false,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  User_AgentController: (
    BrowserNames: string[],
    BrowserVersions?: string[],
    StatusCode?: number,
    ErrorMessage?: string,
    Reverse?: boolean,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  MethodsController: (
    Methods?: string[],
    reverse?: boolean,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  JWTValidator: (
    TokenFieldName: string,
    SecretToken: string,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
  RequestLogger: (
    SaveIP: boolean,
    SaveUserAgent: boolean,
    SaveRequestTime: boolean,
    SaveContentType: boolean,
    SaveMethod: boolean,
  ) => (Request: Request, Response: Response, Next: NextFunction) => void;
}

// Interface for ClassBased Methods
import Jwt from "../../JWT/JWT.method"; // Import JWT Manager Module
import MongoSuper from "../../MongoSuper/Connection/Connection"; //  Mongo Super Module
import CreateClusterByClass from "../../Cluster/class/CreateClusterByClass.method"; // Import Cluster Creation Module
import { UniqueGen } from "../../UniqueGen/Base"; // Import UniqueGen Module
import Encryption from "../../Encryption - Decryption/Dispatcher"; // Import Crypto Module
import { APiCall } from "../../API/Dispatcher"; // Import API Module
import JSONResponser from "../../Response/Class/JSON-Response.class"; // Import JSON Responser Class
import FileResponse from "../../Response/Class/File-Response.class"; // Import File Responser Class
import CreateNewShortStorage from "../../Storage Management/ShortStorage.storage"; // Import Short Storage
import Executor from "../../command/exec.command"; // Linux Command Executor
import SpawnCommander from "../../command/spawn.command"; // Linux Command Executor
import GitCloner from "../../Git Cloner/Cloner"; // Import Git Cloner Module

export interface ClassBasedInterface {
  JWT_Manager: typeof Jwt;
  MongoSuper: typeof MongoSuper;
  ClusterCreator: typeof CreateClusterByClass;
  SocketClusterCreator: typeof createSocketCluster;
  UniqueGenerator: typeof UniqueGen;
  CryptoGraphy: typeof Encryption;
  API: typeof APiCall;
  Response: {
    JSON: typeof JSONResponser;
    File: typeof FileResponse;
  };
  Storage: {
    CreateNewShortStorage: typeof CreateNewShortStorage;
  };
  Command: {
    Execute: typeof Executor;
    Spawn: typeof SpawnCommander;
  };
  GitCloner: typeof GitCloner;
}

// FunctionBased Interface
import { IGetIPDetails } from "./Functions/Get IP Details.interface"; // Get IP Details Interface
import { ResponseObject } from "./Cluster/CreateClusterByFunction.interfaces"; // Create Cluster Interface
import { ReturnData } from "../../Functions/Read Request Count.function"; // Read Request Count Interface
import createSocketCluster from "../../Cluster/class/createSocketClusterByClass.method";
export interface FunctionBasedInterface {
  RandomGenerator: {
    Boolean: () => boolean;
    Mixed: (
      length?: number,
      isCAPITAL?: boolean,
      CustomMixeds?: string[],
    ) => string;
    Number: (
      length?: number,
      WithZero?: boolean,
      CustomNumbers?: number[],
    ) => number;
    Symbol: (length?: number, CustomSymbols?: string[]) => string;
    Word: (
      length?: number,
      isCAPITAL?: boolean,
      CustomWords?: string[],
    ) => string;
  };
  IP: {
    TypeCheck: (IP: string) => string | unknown;
    Info: (IP_INFO_API_KEY: string, ClientIP: string) => Promise<IGetIPDetails>;
  };
  ClusterCreator: (
    ExpressServer?: Express,
    PORT?: number,
    NumberOfWorkers?: number,
    EnableTrustProxy?: boolean,
    BeforeListenFunctions?: any[],
    AfterListenFunctions?: any[],
    FunctionMiddlewares?: any[],
  ) => Promise<ResponseObject | undefined>;
  SocketClusterCreator: () => Promise<ResponseObject | undefined>;
  API: {
    GET: (API: string, Responsejson?: boolean, Headers?: any) => Promise<any>;
    POST: (
      API: string,
      Data: any,
      Responsejson?: boolean,
      Headers?: any,
    ) => Promise<any>;
    PUT: (
      API: string,
      Data: any,
      Responsejson?: boolean,
      Headers?: any,
    ) => Promise<any>;
    DELETE: (
      API: string,
      Responsejson?: boolean,
      Headers?: any,
    ) => Promise<any>;
  };
  GetRequestLog: (RequestDate?: string) => Promise<ReturnData>;
}
