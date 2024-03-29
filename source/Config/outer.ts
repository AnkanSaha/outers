// Import Interface
import {
  WaitInterface,
  ConsoleInterface,
  ServeInterface,
  MiddlewareInterface,
  ClassBasedInterface,
  FunctionBasedInterface
} from "./Interfaces/outers.interface"; // import interface

// Import Console Color Related Modules
import {
  blue,
  bright,
  cyan,
  dimmed,
  gray,
  green,
  magenta,
  red,
  reverse,
  underscore,
  yellow,
} from "../Logs/Console.log"; // Import Console Module

// Import API Related Modules
import { APiCall } from "../API/Dispatcher"; // Import API Module
import {
  PutFetch,
  DeleteFetch,
  GetFetch,
  PostFetch,
} from "../API/functions/Fetch"; // Import Fetch Module

// Import Response Related Modules
import { StatusCode } from "../StatusCode/Code"; // Import StatusCode Module
import { JSONSendResponse } from "../Response/JSON-Response"; // Import JSON Response Module
import { SendFileResponse } from "../Response/File-Response"; // Import File Response Module
import RenderResponse from "../Response/Render-Response"; // Import Render Response Module
import JSONResponser from "../Response/Class/JSON-Response.class"; // Import JSON Responser Class
import FileResponse from "../Response/Class/File-Response.class"; // Import File Responser Class

// Import Waiter Functions
import {
  Centuries,
  Days,
  Decades,
  GregorianYear,
  Hours,
  LeapYear,
  Millenia,
  Minutes,
  Months,
  Ms,
  Seconds,
  Weeks,
  Years,
} from "../Functions/Waiter.function"; // Waiter Functions

// Import Random Generator Modules
import { UniqueGen } from "../UniqueGen/Base"; // Import UniqueGen Module

// Import Random Generator Module
import randomBoolean from "../UniqueGen/Function/BooleanFunction"; // Random Boolean Generator
import randomMixed from "../UniqueGen/Function/MixedFunction"; // Random Mixed Generator
import randomWord from "../UniqueGen/Function/WordFunction"; // Random Word Generator
import randomSymbol from "../UniqueGen/Function/SymbolFunction"; // Random Symbol Generator
import randomNumber from "../UniqueGen/Function/NumFunction"; // Random Number Generator

// Import JWT Manager Modules
import Jwt from "../JWT/JWT.method"; // Import JWT Manager Module

// Import Cluster Creation Modules
import CreateClusterByFunction from "../Cluster/function/CreateClusterByFunction.method"; // Import Cluster Creation Module
import CreateClusterByClass from "../Cluster/class/CreateClusterByClass.method"; // Import Cluster Creation Module

// Import Encryption and Decryption Modules
import Encryption from "../Encryption - Decryption/Dispatcher"; // Import Crypto Module

// Import Storage Management Modules
import CreateNewShortStorage from "../Storage Management/ShortStorage.storage"; // Import Short Storage Module

// Import Linux Command Execution Modules
import Executor from "../command/exec.command"; // Linux Command Executor
import SpawnCommander from "../command/spawn.command"; // Linux Command Executor

// Import MongoDB Related Modules
import MongoSuper from "../MongoSuper/Connection/Connection"; //  Mongo Super Module

// Import Git Cloning Modules
import GitCloner from "../Git Cloner/Cloner"; // Import Git Cloner Module

// Import All Middlewares
import InjectIP from "../Middlewares/Request IP Injector/Base.middleware"; // Import Inject IP Module
import AccessController from "../Middlewares/URL Controller/Base.middleware"; // Import URL Controller Module
import IP_Controller from "../Middlewares/IP Controller/Base.middleware"; // Import IP Controller Module
import UserAccessController from "../Middlewares/User Agent Controller/Base.middleware"; // Import User Access Controller Module
import RequestController from "../Middlewares/Request Controller/Base.middleware"; // Import Request Controller Module
import JWTValidator from "../Middlewares/JWT Validator/Base.middleware"; // Import JWT Validator Middleware
import RequestLogger from "../Middlewares/Request Logger/Base.middleware"; // Import Request Counter Middleware

// Import Functions Related Modules
import IPChecker from "../Functions/IP Type Checker.function"; // Import IP Type Checker Module
import getIPDetails from "../Functions/Get IP Details.function"; // Import Get IP Details Module
import ReadRequestCount from "../Functions/Read Request Count.function"; // Import Read Request Count Module

// Export Console Color Related Modules
export const Console: ConsoleInterface = Object.freeze({
  blue,
  bright,
  cyan,
  dimmed,
  gray,
  green,
  magenta,
  red,
  reverse,
  underscore,
  yellow,
}); // Export Console Module

// Export HTTP Status Code Related Modules
export const StatusCodes = StatusCode; // Export StatusCode Module

// Export Waiter Modules
export const Wait: WaitInterface = Object.freeze({
  MS: Ms,
  Seconds: Seconds,
  Minutes: Minutes,
  Hours: Hours,
  Days: Days,
  Weeks: Weeks,
  Months: Months,
  Centuries: Centuries,
  Decades: Decades,
  GregorianYear: GregorianYear,
  LeapYear: LeapYear,
  Millenia: Millenia,
  Year: Years,
});

// Export Direct Function Based HTTP Response Sender Modules
export const Serve: ServeInterface = Object.freeze({
  JSON: JSONSendResponse,
  File: SendFileResponse,
  Render: RenderResponse,
});

// Export All Middlewares
export const Middleware: MiddlewareInterface = Object.freeze({
  RequestInjectIP: InjectIP, // Export IP Injector Module as Middleware
  URL_Controller: AccessController, // Export URL Controller Module as Middleware
  IPAccessController: IP_Controller, // Export IP Controller Module as Middleware
  User_AgentController: UserAccessController, // Export User Access Controller Module as Middleware
  MethodsController: RequestController, // Export Request Controller Module as Middleware
  JWTValidator, // Export JWT Validator Middleware
  RequestLogger, // Export Request Counter Middleware
}); // Export IP Injector Module as Middleware

// Export All Class based with Freeze
export const ClassBased: ClassBasedInterface = Object.freeze({
  JWT_Manager: Jwt, // Export JWT Manager Module
  MongoSuper: MongoSuper,
  ClusterCreator: CreateClusterByClass, // CreateClusterByClass is used to create a cluster using the class based method
  UniqueGenerator: UniqueGen, // Export UniqueGen Module
  CryptoGraphy: Encryption, // Export Crypto Module
  API: APiCall,
  Response: {
    JSON: JSONResponser, // Export Class Based JSON Response Sender Module
    File: FileResponse, // Export Class Based File Response Sender Module
  }, // Export HTTP Response Sender Module
  Storage: {
    CreateNewShortStorage, // Export Short Storage Module
  }, // Export Storage Management Module
  Command: {
    Execute: Executor, // Export Command Execution Module
    Spawn: SpawnCommander, // Export Command Execution Module
  }, // Export Command Related Module
  GitCloner: GitCloner, // Export Git Cloning Module
}); // Export All Methods

// Export Functions with Freeze
export const FunctionBased: FunctionBasedInterface = Object.freeze({
  RandomGenerator: {
    Boolean: randomBoolean, // Export Random Boolean Generator Module
    Mixed: randomMixed, // Export Random Mixed Generator Module
    Number: randomNumber, // Export Random Number Generator Module
    Symbol: randomSymbol, // Export Random Symbol Generator Module
    Word: randomWord, // Export Random Word Generator Module
  }, // Export UniqueGen Module
  IP: {
    TypeCheck: IPChecker, // Export IP Type Checker Module
    Info: getIPDetails, // Export Get IP Details Function
  },
  ClusterCreator: CreateClusterByFunction, // CreateClusterByFunction is used to create a cluster using the function based method
  API: {
    GET: GetFetch, // Export Get Fetch Module
    POST: PostFetch, // Export Post Fetch Module
    PUT: PutFetch, // Export Put Fetch Module
    DELETE: DeleteFetch, // Export Delete
  },
  GetRequestLog: ReadRequestCount, // Export Read Request Count Module
}); // Export
