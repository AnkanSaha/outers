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

// Import Random Generator Modules
import { UniqueGen } from "../UniqueGen/Base"; // Import UniqueGen Module

// Import JWT Manager Modules
import Jwt from "../JWT/JWT.method"; // Import JWT Manager Module

// Import Cluster Creation Modules
import CreateClusterByFunction from "../Cluster/CreateClusterByFunction.method"; // Import Cluster Creation Module

// Import Encryption and Decryption Modules
import Encryption from "../Encryption - Decryption/Dispatcher"; // Import Crypto Module

// Import Storage Management Modules
import CreateNewShortStorage from "../Storage Management/ShortStorage.storage"; // Import Short Storage Module

// Import Linux Command Execution Modules
import Executor from "../command/exec.command"; // Linux Command Executor
import SpawnCommander from "../command/spawn.command"; // Linux Command Executor

// Import MongoDB Related Modules
import { Mongo } from "mongosuper"; //  Mongo Super Module

// Import Git Cloning Modules
import GitCloner from "../Git Cloner/Cloner"; // Import Git Cloner Module

// Import All Middlewares
import InjectIP from "../Middlewares/Request IP Injector/Base.middleware"; // Import Inject IP Module
import URL_Controller from "../Middlewares/URL Controller/Base.middleware"; // Import URL Controller Module
import IP_Controller from "../Middlewares/IP Controller/Base.middleware"; // Import IP Controller Module
import UserAccessController from "../Middlewares/User Agent Controller/Base.middleware"; // Import User Access Controller Module
import RequestController from "../Middlewares/Request Controller/Base.middleware"; // Import Request Controller Module

// Export Console Color Related Modules
export const Console = Object.freeze({
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

// Export Direct Function Based HTTP Response Sender Modules
export const Serve = Object.freeze({
  JSON: JSONSendResponse,
  File: SendFileResponse,
  Render: RenderResponse,
});

// Export All Middlewares
export const Middleware = Object.freeze({
  RequestInjectIP: InjectIP, // Export IP Injector Module as Middleware
  AccessController: URL_Controller, // Export URL Controller Module as Middleware
  IPAccessController: IP_Controller, // Export IP Controller Module as Middleware
  UserAccessController, // Export User Access Controller Module as Middleware
  RequestController, // Export Request Controller Module as Middleware
}); // Export IP Injector Module as Middleware

// Export All Methods with Freeze
export const methods = Object.freeze({
  JWT_Manager: Jwt, // Export JWT Manager Module
  MongoSuper: Mongo,
  ClusterCreator: CreateClusterByFunction, // Export Cluster Creator Module
  UniqueGenerator: UniqueGen, // Export UniqueGen Module
  CryptoGraphy: Encryption, // Export Crypto Module
  APiCall: {
    FunctionBased: {
      Get: GetFetch, // Export Get Fetch Module
      Post: PostFetch, // Export Post Fetch Module
      Put: PutFetch, // Export Put Fetch Module
      Delete: DeleteFetch, // Export Delete
    }, // Export Direct Function Based API Call Function
    ClassBased: APiCall, // Export Class Based API Call Function
  },
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
