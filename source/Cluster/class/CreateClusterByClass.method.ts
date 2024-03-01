/* eslint-disable @typescript-eslint/no-explicit-any */
// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import express, { Express } from "express"; // Import express module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { Console } from "../../Config/outer"; // Import Console module

// Import Interfaces
import { ResponseObject } from "../../Config/Interfaces/Cluster/CreateClusterByFunction.interfaces"; // Import Interfaces

// Main Class

export default class CreateClusterByClass {
  // Properties
  readonly #ExpressServer: Express; // Express Server Instance
  readonly #PORT: number; // Port Number to Listen

  // Private Properties

  #NumberOfWorkers: number; // Number of Copies of Workers
  #BeforeListenFunctions: any[]; // Any Functions to run before listen
  #AfterListenFunctions: any[]; // Any Functions to run after listen
  #FunctionMiddlewares: any[]; // Any Middlewares to apply
  #GlobalResponseObject: ResponseObject; // Any ResponseObject

  // Constructor
  constructor(
    ExpressServer: Express,
    PORT: number,
    NumberOfWorkers?: number,
    BeforeListenFunctions?: any[],
    AfterListenFunctions?: any[],
    FunctionMiddlewares?: any[]
  ) {
    this.#ExpressServer = ExpressServer ?? express(); // Express Server Instance
    this.#PORT = PORT; // Active Server Instance
    this.#NumberOfWorkers = NumberOfWorkers ?? cpus().length; // Number of Copies of Workers
    this.#BeforeListenFunctions = BeforeListenFunctions ?? []; // Any Functions to run before listen
    this.#AfterListenFunctions = AfterListenFunctions ?? []; // Any Functions to run after listen
    this.#FunctionMiddlewares = FunctionMiddlewares ?? []; // Any Middlewares to apply
    this.#GlobalResponseObject = {
      ActiveServer: this.#ExpressServer,
      ActiveWorker: this.#NumberOfWorkers,
      TotalBeforeFunctions: this.#BeforeListenFunctions.length,
      TotalAfterFunctions: this.#AfterListenFunctions.length,
      ActiveMiddlewares: this.#FunctionMiddlewares,
    };
  }

  // Start Server Method
  public async StartServer(): Promise<ResponseObject | undefined> {
    // Check if User Provided Express Server or not
    if (!this.#ExpressServer || !this.#ExpressServer === undefined) {
      throw new Error("Express Server is not provided"); // Error Message for Server Start
    }

    // Check if User Provided Port or not
    if (!this.#PORT || this.#PORT === undefined) {
      throw new Error("Port is not provided"); // Error Message for Server Start
    }

    // Number of Workers to be forked
    let ProcessCopy: number = this.#NumberOfWorkers; // Copy Number of Workers

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
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        Console.yellow(`Worker ${worker.process.pid} is listening`);
      });

      // Listen for Cluster Exit
      ClusterConfig.on("exit", (worker) => {
        Console.red(`Worker ${worker.process.pid} died`);
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        ClusterConfig.fork();
        Console.green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
        Console.blue(
          `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
        );
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        Console.yellow(`Worker ${worker.process.pid} is listening`);
      });
    } else {
      // Apply Function Middlewares to Express Server Instance like CORS, Body Parser, etc.
      if (
        this.#FunctionMiddlewares.length > 0 ||
        this.#FunctionMiddlewares !== undefined
      ) {
        this.#FunctionMiddlewares.forEach((FunctionMiddleware) => {
          this.#ExpressServer.use(FunctionMiddleware); // Apply Middleware to Express Server Instance one by one
        }); // Apply Middlewares to Express Server Instance
      }

      // Run Before Listen Functions
      if (
        this.#BeforeListenFunctions.length > 0 ||
        this.#BeforeListenFunctions !== undefined
      ) {
        for (const ListenFunction of this.#BeforeListenFunctions) {
          await ListenFunction(); // Run Before Listen Functions one by one
        }
      }

      // Server Listen
      try {
        const ActiveServer = this.#ExpressServer.listen(
          this.#PORT,
          async () => {
            Console.green(`🚀 Server is listening on Port ${this.#PORT} 🚀`); // Print Message for Server Start

            // Run After Listen Functions
            if (
              this.#AfterListenFunctions.length > 0 ||
              this.#AfterListenFunctions !== undefined
            ) {
              for (const ListenFunction of this.#AfterListenFunctions) {
                await ListenFunction(); // Run Function one by one
              }
            }
          }
        ); // Start Server on Port

        // Return the Active Server Instance in Response Object
        this.#GlobalResponseObject.ActiveServer = ActiveServer; // Active Server Instance After Listen

        return Object.freeze(this.#GlobalResponseObject); // Return Response Object to User for further use
      } catch (error) {
        Console.red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
        return Object.freeze({
          Error: error,
          ...this.#GlobalResponseObject, // Spread the Global Response Object
        }); // Return Error to User
      }
    }
  }

  // Set Number of Workers Method
  public SetNumberOfWorkers(NumberOfWorkers: number): void {
    if (!NumberOfWorkers){
        throw new Error("Number of Workers is not provided"); // Error Message for Server Start
    }

    if(typeof NumberOfWorkers !== "number"){
        throw new Error("Number of Workers is not a Number"); // Error Message for Server Start
    }

    if (NumberOfWorkers <= 0){
        throw new Error("Number of Workers is not a Positive Number"); // Error Message for Server Start
    }

    // Update Number of Workers
    this.#NumberOfWorkers = NumberOfWorkers; // Set Number of Workers
  }
}
