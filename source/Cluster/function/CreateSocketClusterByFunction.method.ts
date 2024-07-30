/* eslint-disable @typescript-eslint/no-explicit-any */
// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import express, { Express } from "express"; // Import express module
import { WebSocketServer, WebSocket } from "ws"; // Import WebSocket module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { bright, red, green, yellow, blue } from "../../Logs/Console.log"; // Import Console module

// Import Interfaces
import { ResponseObject } from "../../Config/Interfaces/Cluster/CreateClusterByFunction.interfaces"; // Import Interfaces

// Main Function
/**
 * Configures and creates a cluster by function.
 *
 * @param ExpressServer - The main Express server instance.
 * @param PORT - The port number to listen on.
 * @param NumberOfWorkers - The number of worker copies to create.
 * @param EnableTrustProxy - Whether to enable trust proxy or not.
 * @param BeforeListenFunctions - Any functions to run before listening.
 * @param AfterListenFunctions - Any functions to run after listening.
 * @param FunctionMiddlewares - Any middlewares to apply to the Express server instance.
 * @returns The response object containing the active server instance, active worker count, and responses from before listen functions.
 * @throws Error if Express server, port, or number of workers is not provided.
 */
export default async function SocketClusterConfig(
  ExpressServer: Express = express(), // Main Express Server Instance
  PORT = 3000, // Port Number to Listen
  NumberOfWorkers: number = cpus().length, // Number of Copies of Workers
  EnableTrustProxy = false, // Enable Trust Proxy
  BeforeListenFunctions: any[] = [], // Any Functions to run before listen
  AfterListenFunctions: any[] = [], // Any Functions to run after listen
  FunctionMiddlewares: any[] = [], // Any Middlewares to apply
): Promise<ResponseObject | undefined> {
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
    TotalBeforeFunctions: BeforeListenFunctions.length,
    TotalAfterFunctions: AfterListenFunctions.length,
    ActiveMiddlewares: FunctionMiddlewares,
  };

  // Number of Workers to be forked
  let ProcessCopy: number = NumberOfWorkers; // Copy Number of Workers

  if (isPrimary) {
    // If the cluster is the primary node
    // Print CPU Count
    bright(
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
      green(`🚀 Worker ${worker.process.pid} started 🚀`);
      blue(
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`,
      );
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      yellow(`Worker ${worker.process.pid} is listening`);
    });

    // Listen for Cluster Exit
    ClusterConfig.on("exit", (worker) => {
      red(`Worker ${worker.process.pid} died`);
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      ClusterConfig.fork();
      green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
      blue(
        `Environment Variables Loaded Successfully in Worker's variables : ${worker.process.pid}`,
      );
      GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
      yellow(`Worker ${worker.process.pid} is listening`);
    });
  } else {
    // Enable trust proxy for Express Server
    EnableTrustProxy
      ? ExpressServer.set("trust proxy", () => true)
      : yellow(
          "Trust Proxy is not enabled, if you are working behind a proxy, please enable it to get the real IP Address",
        );

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
      for (const ListenFunction of BeforeListenFunctions) {
        await ListenFunction(); // Run Before Listen Functions one by one
      }
    }

    // Server Listen
    try {
      const ActiveServer = ExpressServer.listen(PORT, async () => {
        green(`🚀 Server is listening on Port ${PORT} 🚀`); // Print Message for Server Start

        // Run After Listen Functions
        if (
          AfterListenFunctions.length > 0 ||
          AfterListenFunctions !== undefined
        ) {
          for (const ListenFunction of AfterListenFunctions) {
            await ListenFunction(); // Run Function one by one
          }
        }
      }); // Start Server on Port

      // Create WebSocket server
      const WebSocketServerInstance = new WebSocketServer({
        server: ActiveServer,
      });

      // WebSocket connection handler
      WebSocketServerInstance.on("connection", (ws: WebSocket) => {
        green("WebSocket client connected");

        ws.on("message", (message) => {
          blue(`Received message: ${message}`);
        });

        ws.on("close", () => {
          red("WebSocket client disconnected");
        });
      });

      // Return the Active Server Instance in Response Object
      GlobalResponseObject.ActiveServer = ActiveServer; // Active Server Instance After Listen

      return Object.freeze(GlobalResponseObject); // Return Response Object to User for further use
    } catch (error) {
      red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
      return Object.freeze({
        Error: error,
        ActiveServer: GlobalResponseObject.ActiveServer,
        ActiveWorker: GlobalResponseObject.ActiveWorker,
        TotalBeforeFunctions: GlobalResponseObject.TotalBeforeFunctions,
        TotalAfterFunctions: GlobalResponseObject.TotalAfterFunctions,
        ActiveMiddlewares: GlobalResponseObject.ActiveMiddlewares,
      }); // Return Error to User
    }
  }
}
