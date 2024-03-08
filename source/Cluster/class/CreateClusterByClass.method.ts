/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import express, { Express } from "express"; // Import express module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { bright, red, green, yellow, blue } from "../../Logs/Console.log"; // Import Console module

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
  #EnableTrustProxy: boolean; // Enable Trust Proxy

  // Constructor
  /**
   * Creates an instance of the server configuration class.
   * This constructor initializes the server with the specified Express server, port,
   * and optional configurations for workers, middleware, and pre/post listen functions.
   *
   * @param {Express} ExpressServer - The Express server instance. If not provided, a new Express instance is created.
   * @param {number} PORT - The port number on which the Express server will listen.
   * @param {number} [NumberOfWorkers=cpus().length] - Optional. The number of worker processes to spawn in cluster mode.
   *        Defaults to the number of CPU cores available.
   * @param {Function[]} [BeforeListenFunctions=[]] - Optional. An array of functions to execute before the server starts listening.
   * @param {Function[]} [AfterListenFunctions=[]] - Optional. An array of functions to execute after the server starts listening.
   * @param {Function[]} [FunctionMiddlewares=[]] - Optional. An array of middleware functions to apply to the Express server.
   */
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
    this.#EnableTrustProxy = true; // Enable Trust Proxy
  }

  // Start Server Method
  /**
   * Starts the server using the configured Express instance and port. It initializes
   * workers based on the number of workers specified if running in a cluster mode.
   * This method also applies any configured middlewares and executes before and after
   * listen functions as part of the server startup process.
   *
   * @returns {Promise<ResponseObject | undefined>} A promise that resolves to a ResponseObject
   * containing the server and active worker information if the server starts successfully, or
   * undefined if an error occurs.
   * @throws {Error} Throws an error if the Express server instance or port is not provided.
   *
   * The method leverages clustering if `isPrimary` is true, creating workers and managing
   * their lifecycle. For the worker processes, or when `isPrimary` is false, it applies
   * middlewares, runs before listen functions, starts the Express server, and then runs
   * after listen functions.
   *
   * Note: `Console` is used for logging, and `ClusterConfig`, `platform`, `arch`, `freemem`,
   * `cpus` are assumed to be available in the scope for cluster and system information logging.
   */
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
      bright(
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
        green(`🚀 Worker ${worker.process.pid} started 🚀`);
        blue(
          `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
        );
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        yellow(`Worker ${worker.process.pid} is listening`);
      });

      // Listen for Cluster Exit
      ClusterConfig.on("exit", (worker) => {
        red(`Worker ${worker.process.pid} died`);
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        ClusterConfig.fork();
        green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
        blue(
          `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
        );
        this.#GlobalResponseObject.ActiveWorker++; // Increment Active Worker Count by 1
        yellow(`Worker ${worker.process.pid} is listening`);
      });
    } else {
      // Enable trust proxy for Express Server
      this.#EnableTrustProxy === true
        ? this.#ExpressServer.set("trust proxy", true)
        : yellow(
            "Trust Proxy is not enabled, if you are working behind a proxy, please enable it to get the real IP Address"
          );

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
            green(`🚀 Server is listening on Port ${this.#PORT} 🚀`); // Print Message for Server Start

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
        red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
        return Object.freeze({
          Error: error,
          ...this.#GlobalResponseObject, // Spread the Global Response Object
        }); // Return Error to User
      }
    }
  }

  // Set Number of Workers Method
  /**
   * Sets the number of worker processes to be used in cluster mode.
   * This method updates the instance's number of workers with the provided value,
   * ensuring that it is a positive number.
   *
   * @param {number} NumberOfWorkers - The new number of worker processes to be set.
   *        Must be a positive integer.
   * @throws {Error} Throws an error if `NumberOfWorkers` is not provided,
   *        is not a number, or is less than or equal to zero.
   */
  public SetNumberOfWorkers(NumberOfWorkers: number): void {
    if (!NumberOfWorkers) {
      throw new Error("Number of Workers is not provided"); // Error Message for Server Start
    }

    if (typeof NumberOfWorkers !== "number") {
      throw new Error("Number of Workers is not a Number"); // Error Message for Server Start
    }

    if (NumberOfWorkers <= 0) {
      throw new Error("Number of Workers is not a Positive Number"); // Error Message for Server Start
    }

    // Update Number of Workers
    this.#NumberOfWorkers = NumberOfWorkers; // Set Number of Workers
  }

  // Add Before Listen Function Method
  /**
   * Adds a function to be executed before the server starts listening.
   * This method appends the provided function to the list of functions to run
   * before the server starts listening for incoming requests.
   *
   * @param {Function} FunctionToRun - The function to be added to the list of functions to run.
   * @throws {Error} Throws an error if `FunctionToRun` is not provided or is not a function.
   */
  public AddBeforeListenFunction(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided"); // Error Message for Server Start
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function"); // Error Message for Server Start
    }

    this.#BeforeListenFunctions.push(FunctionToRun); // Add Function to Before Listen Functions
  }

  // Add After Listen Function Method
  /**
   * Adds a function to be executed after the server starts listening.
   * This method appends the provided function to the list of functions to run
   * after the server starts listening for incoming requests.
   *
   * @param {Function} FunctionToRun - The function to be added to the list of functions to run.
   * @throws {Error} Throws an error if `FunctionToRun` is not provided or is not a function.
   */
  public AddAfterListenFunction(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided"); // Error Message for Server Start
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function"); // Error Message for Server Start
    }

    this.#AfterListenFunctions.push(FunctionToRun); // Add Function to After Listen Functions
  }

  // Add Function Middleware Method
  /**
   * Adds a middleware function to the list of middleware functions to be applied
   * to the Express server instance.
   *
   * @param {Function} FunctionToRun - The function to be added to the list of middleware functions to run.
   * @throws {Error} Throws an error if `FunctionToRun` is not provided or is not a function.
   */
  public AddFunctionMiddleware(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided"); // Error Message for Server Start
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function"); // Error Message for Server Start
    }

    this.#FunctionMiddlewares.push(FunctionToRun); // Add Function to Function Middlewares
  }

  // Enable Trust Proxy Method
  /**
   * Controls the Trust Proxy setting.
   * @param {boolean} Status - The value indicating whether to enable or disable Trust Proxy.
   * @throws {Error} If Trust Proxy is already enabled.
   * @throws {Error} If the provided value is not a boolean.
   */
  public ControlTrustProxy(Status: boolean): void {
    // Check if Trust Proxy is already enabled or not
    if (this.#EnableTrustProxy === true) {
      throw new Error("Trust Proxy is already enabled"); // Error Message for Server Start
    }

    // Check inserted value is boolean or not
    if (typeof Status !== "boolean") {
      throw new Error("TPlease provide a boolean value to enable Trust Proxy"); // Error Message for Server Start
    }

    // Enable Trust Proxy
    this.#EnableTrustProxy = Status; // Enable Trust Proxy
  }
}
