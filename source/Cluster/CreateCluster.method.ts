/* eslint-disable @typescript-eslint/no-explicit-any */
// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import { Express } from "express"; // Import express module
import express from "express"; // Express Instance for Server
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { Console } from "../outer"; // Import Console module

// Import Interfaces
import {BeforeListenFunctions, AfterListenFunctions, FunctionMiddlewares, EngineMiddlewares, ResponseObject} from './interfaces'; // Import Interfaces

// Main Function
export default function Config(
  ExpressServer: Express = express(), // Main Express Server Instance
  PORT: number = 3000, // Port Number to Listen
  NumberOfWorkers: number = cpus().length, // Number of Copies of Workers
  engineMiddlewares: EngineMiddlewares[] = [], // Any Middlewares to apply
  BeforeListenFunctions: BeforeListenFunctions[] = [], // Any Functions to run before listen
  AfterListenFunctions: AfterListenFunctions[] = [], // Any Functions to run after listen
  FunctionMiddlewares: FunctionMiddlewares[] // Any Middlewares to apply
) {

  // Check if User Provided Express Server or not
  if(!ExpressServer) {
    throw new Error("Express Server is not provided");
  }

  // Check if User Provided Port or not
  if(!PORT) {
    throw new Error("Port is not provided");
  }

// Global Response Object
const GlobalResponseObject: ResponseObject = {
  ActiveServer: ExpressServer ,
  ActiveWorker: 0,
  BeforeListenFunctionsResponse: [],
  AfterListenFunctionsResponse: [],
};

  // Number of Workers to be forked
  let ProcessCopy: number = NumberOfWorkers; // Copy Number of Workers

  if (isPrimary) {
    // If the cluster is the primary node
    // Print CPU Count
    Console.bright(
      `${platform()} ${arch()} server : ${(
        freemem() /
        1024 /
        1024 /
        1024
      ).toFixed(2)} GB Free Ram : ${cpus()[0].model}`
    );

    // Create a worker according to the number that is specified
    while (ProcessCopy > 0) {
      ClusterConfig.fork();
      ProcessCopy--;
    }

    // Listen for Cluster Online
    ClusterConfig.on("online", (worker) => {
      Console.green(`🚀 Worker ${worker.process.pid} started 🚀`);
      Console.blue(
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
      );
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      Console.yellow(`Worker ${worker.process.pid} is listening`);
    });

    // Listen for Cluster Exit
    ClusterConfig.on("exit", (worker) => {
      Console.red(`Worker ${worker.process.pid} died`);
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      ClusterConfig.fork();
      Console.green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
      Console.blue(
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
      );
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      Console.yellow(`Worker ${worker.process.pid} is listening`);
    });
  } else {

    // Apply String Middlewares to Express Server Instance like PUG, EJS, Trust Proxy, etc.
    if(engineMiddlewares.length > 0) {
      engineMiddlewares.forEach(({Key, Value}) => {
        ExpressServer.set(String(Key), Value); // Apply Middleware to Express Server Instance one by one
      }); // Apply Middlewares to Express Server Instance
    }

    // Apply Function Middlewares to Express Server Instance like CORS, Body Parser, etc.
    if(FunctionMiddlewares.length > 0) {
      FunctionMiddlewares.forEach(({FunctionMiddleware}) => {
        ExpressServer.use(FunctionMiddleware); // Apply Middleware to Express Server Instance one by one
      }); // Apply Middlewares to Express Server Instance
    }

    // Run Before Listen Functions
    if(BeforeListenFunctions.length > 0) {
      BeforeListenFunctions.forEach(({Function}) => {
        const Response = Function(); // Run Function one by one

        // Push Response to Global Response Object
        GlobalResponseObject.BeforeListenFunctionsResponse.push({
          FunctionName: `${Function.name}`,
          Response: Response
        }); // Push Response to Global Response Object
      }); // Run Functions
    }
    // Server Listen
    try {
      const ActiveServer = ExpressServer.listen(PORT, async () => {
        Console.green(
          `🚀 Server is listening on Port ${PORT} 🚀`
        ); // Print Message for Server Start
      }); // Start Server on Port

      // Return the Active Server Instance in Response Object
      GlobalResponseObject.ActiveServer = ActiveServer; // Active Server Instance After Listen
    } catch (error) {
      Console.red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
      return error; // Return Error to User
    }

    // Run After Listen Functions
    if(AfterListenFunctions.length > 0) {
      AfterListenFunctions.forEach(({Function}) => {
        const Response = Function(); // Run Function one by one

        // Push Response to Global Response Object
        GlobalResponseObject.BeforeListenFunctionsResponse.push({
          FunctionName: `${Function.name}`,
          Response: Response
        }); // Push Response to Global Response Object

      }); // Run Functions
    }

    return GlobalResponseObject; // Return Response Object to User for further use
  }
}
