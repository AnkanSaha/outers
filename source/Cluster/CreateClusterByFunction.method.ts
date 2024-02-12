/* eslint-disable @typescript-eslint/no-explicit-any */
// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import express, { Express } from "express"; // Import express module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { Console } from "../Config/outer"; // Import Console module

// Import Interfaces
import {
  EngineMiddlewares,
  ResponseObject,
} from "./Interface/CreateClusterByFunction.interfaces"; // Import Interfaces

// Main Function
/**
 * Configures and creates a cluster by function.
 *
 * @param ExpressServer - The main Express server instance.
 * @param PORT - The port number to listen on.
 * @param NumberOfWorkers - The number of worker copies to create.
 * @param engineMiddlewares - Any middlewares to apply to the Express server instance.
 * @param BeforeListenFunctions - Any functions to run before listening.
 * @param AfterListenFunctions - Any functions to run after listening.
 * @param FunctionMiddlewares - Any middlewares to apply to the Express server instance.
 * @returns The response object containing the active server instance, active worker count, and responses from before listen functions.
 * @throws Error if Express server, port, or number of workers is not provided.
 */
export default function Config(
  ExpressServer: Express = express(), // Main Express Server Instance
  PORT = 3000, // Port Number to Listen
  NumberOfWorkers: number = cpus().length, // Number of Copies of Workers
  engineMiddlewares: EngineMiddlewares[] = [], // Any Middlewares to apply
  BeforeListenFunctions: any[] = [], // Any Functions to run before listen
  AfterListenFunctions: any[] = [], // Any Functions to run after listen
  FunctionMiddlewares: any[] = [], // Any Middlewares to apply
): ResponseObject | undefined {
  // Check if User Provided Express Server or not
  if (!ExpressServer || ExpressServer === undefined) {
    throw new Error("Express Server is not provided");
  }

  // Check if User Provided Port or not
  if (!PORT || PORT === undefined) {
    throw new Error("Port is not provided");
  }

  // Check if User Provided Number of Workers or not
  if (!NumberOfWorkers || NumberOfWorkers === undefined) {
    throw new Error("Number of Workers is not provided");
  }

  // Global Response Object
  const GlobalResponseObject: ResponseObject = {
    ActiveServer: ExpressServer,
    ActiveWorker: NumberOfWorkers,
    BeforeListenFunctionsResponse: [],
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
      ).toFixed(2)} GB Free Ram : ${cpus()[0].model}`,
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
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`,
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
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`,
      );
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      Console.yellow(`Worker ${worker.process.pid} is listening`);
    });
  } else {
    // Apply String Middlewares to Express Server Instance like PUG, EJS, Trust Proxy, etc.
    if (engineMiddlewares.length > 0 || engineMiddlewares !== undefined) {
      engineMiddlewares.forEach(({ Key, Value }) => {
        ExpressServer.set(String(Key), Value); // Apply Middleware to Express Server Instance one by one
      }); // Apply Middlewares to Express Server Instance
    }

    // Apply Function Middlewares to Express Server Instance like CORS, Body Parser, etc.
    if (FunctionMiddlewares.length > 0 || FunctionMiddlewares !== undefined) {
      FunctionMiddlewares.forEach((FunctionMiddleware) => {
        ExpressServer.use(FunctionMiddleware); // Apply Middleware to Express Server Instance one by one
      }); // Apply Middlewares to Express Server Instance
    }

    // Run Before Listen Functions
    if (
      BeforeListenFunctions.length > 0 ||
      BeforeListenFunctions !== undefined
    ) {
      BeforeListenFunctions.forEach((BeforeFunction) => {
        const BeforeResponse = BeforeFunction(); // Run Function one by one

        // Push Response to Global Response Object
        GlobalResponseObject.BeforeListenFunctionsResponse.push({
          FunctionName: `${BeforeFunction.name}`,
          Response: BeforeResponse,
        }); // Push Response to Global Response Object
      }); // Run Functions
    }

    // Server Listen
    try {
      const ActiveServer = ExpressServer.listen(PORT, () => {
        Console.green(`🚀 Server is listening on Port ${PORT} 🚀`); // Print Message for Server Start

        // Run After Listen Functions
        if (
          AfterListenFunctions.length > 0 ||
          AfterListenFunctions !== undefined
        ) {
          AfterListenFunctions.forEach((AfterFunction) => {
            AfterFunction(); // Run Function one by one
          }); // Run Functions
        }
      }); // Start Server on Port

      // Return the Active Server Instance in Response Object
      GlobalResponseObject.ActiveServer = ActiveServer; // Active Server Instance After Listen

      return Object.freeze(GlobalResponseObject); // Return Response Object to User for further use
    } catch (error) {
      Console.red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
      return Object.freeze({
        Error: error,
        ActiveServer: GlobalResponseObject.ActiveServer,
        ActiveWorker: GlobalResponseObject.ActiveWorker,
        BeforeListenFunctionsResponse:
          GlobalResponseObject.BeforeListenFunctionsResponse,
      }); // Return Error to User
    }
  }
}
