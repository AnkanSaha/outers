/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cpus, platform, arch, freemem, totalmem } from "node:os"; // Import os module
import express, { Express } from "express"; // Import express module
import { Server as HTTPServer } from "http"; // Import HTTP Server module
import { WebSocketServer } from "ws"; // Import WebSocket module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { bright, red, green, yellow, blue } from "../../Logs/Console.log"; // Import Console module

// Import Interfaces
import { ResponseObject } from "../../Config/Interfaces/Cluster/CreateClusterByFunction.interfaces"; // Import Interfaces

// Main Class

/**
 * Represents a class for creating a SocketCluster cluster.
 */
export default class createSocketCluster {
  // Properties

  /**
   * Express Server Instance.
   */
  readonly #ExpressServer: Express;

  /**
   * HTTP Server Instance.
   */
  readonly #HTTPServer: HTTPServer;

  /**
   * WebSocket Server Instance.
   */
  readonly #WebSocketServer: WebSocketServer;

  /**
   * Port Number to Listen.
   */
  readonly #PORT: number;

  // Private Properties

  /**
   * Number of Copies of Workers.
   */
  #NumberOfWorkers: number;

  /**
   * Any Functions to run before listen.
   */
  #BeforeListenFunctions: any[];

  /**
   * Any Functions to run after listen.
   */
  #AfterListenFunctions: any[];

  /**
   * Any Middlewares to apply.
   */
  #FunctionMiddlewares: any[];

  /**
   * Any ResponseObject.
   */
  #GlobalResponseObject: ResponseObject;

  /**
   * Enable Trust Proxy.
   */
  #EnableTrustProxy: boolean;

  /**
   * Store WebSocket connection handler.
   */
  #WebSocketConnectionHandler: WebSocketServer;

  /**
   * Creates an instance of CreateClusterByClass.
   * @param ExpressServer - Express Server Instance.
   * @param PORT - Port Number to Listen.
   * @param NumberOfWorkers - Number of Copies of Workers.
   * @param BeforeListenFunctions - Any Functions to run before listen.
   * @param AfterListenFunctions - Any Functions to run after listen.
   * @param FunctionMiddlewares - Any Middlewares to apply.
   * @param EnableTrustProxy - Enable Trust Proxy.
   */
  constructor(
    ExpressServer: Express,
    PORT: number,
    NumberOfWorkers?: number,
    BeforeListenFunctions?: any[],
    AfterListenFunctions?: any[],
    FunctionMiddlewares?: any[],
    EnableTrustProxy?: boolean,
  ) {
    this.#ExpressServer = ExpressServer ?? express();
    this.#HTTPServer = new HTTPServer(this.#ExpressServer);
    this.#WebSocketServer = new WebSocketServer({ server: this.#HTTPServer });
    this.#PORT = PORT;
    this.#NumberOfWorkers = NumberOfWorkers ?? cpus().length;
    this.#BeforeListenFunctions = BeforeListenFunctions ?? [];
    this.#AfterListenFunctions = AfterListenFunctions ?? [];
    this.#FunctionMiddlewares = FunctionMiddlewares ?? [];
    this.#GlobalResponseObject = {
      ActiveServer: this.#ExpressServer,
      ActiveWorker: this.#NumberOfWorkers,
      TotalBeforeFunctions: this.#BeforeListenFunctions.length,
      TotalAfterFunctions: this.#AfterListenFunctions.length,
      ActiveMiddlewares: this.#FunctionMiddlewares,
      TotalCPU: cpus().length,
      TotalFreeRam: `${(freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      TotalRam: `${(totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      Architecture: arch(),
      Platform: platform(),
    };
    this.#EnableTrustProxy = EnableTrustProxy ?? false;
    this.#WebSocketConnectionHandler= this.#WebSocketServer;
  }

  /**
   * Starts the server.
   * @returns A Promise that resolves to the ResponseObject or undefined.
   * @throws Error if Express Server or Port is not provided.
   */
  public async StartServer(): Promise<ResponseObject | undefined> {
    if (!this.#ExpressServer || !this.#ExpressServer === undefined) {
      throw new Error("Express Server is not provided");
    }

    if (!this.#PORT || this.#PORT === undefined) {
      throw new Error("Port is not provided");
    }

    let ProcessCopy: number = this.#NumberOfWorkers;

    if (isPrimary) {
      bright(
        `${platform()} ${arch()} server : ${(
          freemem() /
          1024 /
          1024 /
          1024
        ).toFixed(2)} GB Free Ram : ${cpus()[0].model}`,
      );

      while (ProcessCopy > 0) {
        ClusterConfig.fork();
        ProcessCopy--;
      }

      ClusterConfig.on("online", (worker) => {
        green(`🚀 Worker ${worker.process.pid} started 🚀`);
        blue(
          `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`,
        );
        this.#GlobalResponseObject.ActiveWorker++;
        yellow(`Worker ${worker.process.pid} is listening`);
      });

      ClusterConfig.on("exit", (worker) => {
        red(`Worker ${worker.process.pid} died`);
        ClusterConfig.fork();
        green("🚀 Worker restarted 🚀");
        blue(
          `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`,
        );
        yellow("Worker is listening");
      });
    } else {
      this.#EnableTrustProxy === true
        ? this.#ExpressServer.set("trust proxy", true)
        : yellow(
            "Trust Proxy is not enabled, if you are working behind a proxy, please enable it to get the real IP Address",
          );

      if (
        this.#FunctionMiddlewares.length > 0 ||
        this.#FunctionMiddlewares !== undefined
      ) {
        this.#FunctionMiddlewares.forEach((FunctionMiddleware) => {
          this.#ExpressServer.use(FunctionMiddleware);
        });
      }

      if (
        this.#BeforeListenFunctions.length > 0 ||
        this.#BeforeListenFunctions !== undefined
      ) {
        for (const ListenFunction of this.#BeforeListenFunctions) {
          await ListenFunction();
        }
      }

      try {
        const ActiveServer = this.#HTTPServer.listen(this.#PORT, async () => {
          green(`🚀 Server is listening on Port ${this.#PORT} 🚀`);

          if (
            this.#AfterListenFunctions.length > 0 ||
            this.#AfterListenFunctions !== undefined
          ) {
            for (const ListenFunction of this.#AfterListenFunctions) {
              await ListenFunction();
            }
          }
        });

        this.#GlobalResponseObject.ActiveServer = ActiveServer;

        this.#WebSocketServer.on("connection", (ws: WebSocketServer) => {
          green("Client connected");

          ws.on("message", (message: any) => {
            blue(`Received message: ${message}`);
          });

          ws.on("close", () => {
            red("Client disconnected");
          });

          this.#WebSocketConnectionHandler = ws;
        });

        return Object.freeze(this.#GlobalResponseObject);
      } catch (error) {
        red(`Error in Starting Server : ${error}`);
        return Object.freeze({
          Error: error,
          ...this.#GlobalResponseObject,
        });
      }
    }
  }

  /**
   * Gets the WebSocket connection handler.
   * @returns The WebSocket connection handler or null.
   */
  public getWebSocketConnectionHandler(): WebSocketServer {
    return this.#WebSocketConnectionHandler;
  }

  /**
   * Sets the number of workers.
   * @param NumberOfWorkers - The number of workers.
   * @throws Error if NumberOfWorkers is not provided, not a number, or not a positive number.
   */
  public SetNumberOfWorkers(NumberOfWorkers: number): void {
    if (!NumberOfWorkers) {
      throw new Error("Number of Workers is not provided");
    }

    if (typeof NumberOfWorkers !== "number") {
      throw new Error("Number of Workers is not a Number");
    }

    if (NumberOfWorkers <= 0) {
      throw new Error("Number of Workers is not a Positive Number");
    }

    this.#NumberOfWorkers = NumberOfWorkers;
  }

  /**
   * Adds a function to run before listen.
   * @param FunctionToRun - The function to run before listen.
   * @throws Error if FunctionToRun is not provided or not a function.
   */
  public AddBeforeListenFunction(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided");
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function");
    }

    this.#BeforeListenFunctions.push(FunctionToRun);
  }

  /**
   * Adds a function to run after listen.
   * @param FunctionToRun - The function to run after listen.
   * @throws Error if FunctionToRun is not provided or not a function.
   */
  public AddAfterListenFunction(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided");
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function");
    }

    this.#AfterListenFunctions.push(FunctionToRun);
  }

  /**
   * Adds a middleware function.
   * @param FunctionToRun - The middleware function to add.
   * @throws Error if FunctionToRun is not provided or not a function.
   */
  public AddMiddleware(FunctionToRun: Function): void {
    if (!FunctionToRun) {
      throw new Error("Function to Run is not provided");
    }

    if (typeof FunctionToRun !== "function") {
      throw new Error("Function to Run is not a Function");
    }

    this.#FunctionMiddlewares.push(FunctionToRun);
  }

  /**
   * Sets the status of the Trust Proxy.
   * @param Status - The status of the Trust Proxy.
   * @throws Error if Status is not provided or not a boolean.
   */
  public SetEnableTrustProxy(Status: boolean): void {
    if (!Status) {
      throw new Error("Trust Proxy Status is not provided");
    }

    if (typeof Status !== "boolean") {
      throw new Error("Trust Proxy Status is not a Boolean");
    }

    this.#EnableTrustProxy = Status;
  }
}
