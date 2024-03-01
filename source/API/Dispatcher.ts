/* eslint-disable @typescript-eslint/no-explicit-any */
// Import API from internal module
import { GetFetch, PostFetch, DeleteFetch, PutFetch } from "./functions/Fetch"; // Import Fetch Module
import { cpus, platform, arch, freemem, totalmem } from "node:os"; // Import OS Module

// Create A Class for API
/* The `APiCall` class is a TypeScript class that provides a method for making GET requests to a
specified API endpoint and returning the response as JSON. */

export class APiCall {
  readonly #Domain: string; // The #Domain property is a private property that can only be accessed within the class.
  readonly #ContentType: object; // The #ContentType property is a private property that can only be accessed within the class.

  constructor(
    Domain: string,
    ContentType = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Server: "Outer",
      "X-Powered-By": "Outer",
      "Request Date": new Date().toUTCString(),
      "Access-Control-Allow-Origin": "*",
      "User-Agent": `${platform()} ${arch()} server`,
      "Total Ram": `${(totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      "Available Ram": `${(freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      "Model Name": `${cpus()[0].model}`,
    },
  ) {
    this.#Domain = Domain; // Set Domain to the Domain passed in the constructor
    this.#ContentType = ContentType; // Set ContentType to the ContentType passed in the constructor
  }

  // Function for GET requests
  /**
   * The Get function is an asynchronous function that makes a GET request to a specified path and
   * returns the response as JSON.
   * @param {string} path - The `path` parameter is a string that represents the endpoint or URL path
   * that you want to make a GET request to. It is typically used to specify the specific resource or
   * data you want to retrieve from the server.
   * @param [Responsejson=true] - The "Responsejson" parameter is a boolean flag that determines
   * whether the response from the API should be parsed as JSON or not. If set to true, the response
   * will be parsed as JSON. If set to false, the response will be returned as is without any parsing.
   * @param {any} headers - The `headers` parameter is an optional parameter that allows you to
   * specify custom headers for the HTTP request. In the code snippet you provided, the default value
   * for the `headers` parameter is set to `{'Content-Type': 'application/json'}`. This means that if
   * no custom headers are provided
   * @returns the result of the `GetFetch` function, which is being awaited.
   */
  public async Get(
    path: string,
    Responsejson = true,
    headers: object = this.#ContentType,
  ) {
    return await GetFetch(`${this.#Domain}${path}`, Responsejson, headers);
  }

  // Function for POST requests
  /**
   * The function is used for making POST requests with optional parameters for the path, data,
   * response format, and headers.
   * @param {string} path - The `path` parameter is a string that represents the endpoint or URL path
   * where the POST request will be sent to. It specifies the location on the server where the
   * request should be handled.
   * @param {any} Data - The "Data" parameter is used to pass the data that you want to send in the
   * request body. It can be of any type, but in this case, it is expected to be of type "any", which
   * means it can be any valid JavaScript object.
   * @param [Responsejson=true] - The `Responsejson` parameter is a boolean flag that determines
   * whether the response from the server should be parsed as JSON or not. If `Responsejson` is set
   * to `true`, the response will be parsed as JSON. If it is set to `false`, the response will be
   * returned as is
   * @param {any} headers - The `headers` parameter is an optional parameter that allows you to
   * specify additional headers for the POST request. By default, it is set to `{'Content-Type':
   * 'application/json'}` which sets the content type of the request to JSON.
   * @returns the result of the `PostFetch` function, which is awaited.
   */

  public async Post(
    path: string,
    Data: any,
    Responsejson = true,
    headers: object = this.#ContentType,
  ) {
    // Function for POST requests
    return await PostFetch(
      `${this.#Domain}${path}`,
      Data,
      Responsejson,
      headers,
    );
  }

  // Function for DELETE requests
  /**
   * The function is used for making DELETE requests with optional parameters for response format and
   * headers.
   * @param {string} path - The path parameter is a string that represents the endpoint or resource
   * that you want to delete. It is appended to the domain to form the complete URL for the DELETE
   * request.
   * @param [Responsejson=true] - The Responsejson parameter is a boolean value that determines
   * whether the response from the DELETE request should be parsed as JSON. If set to true, the
   * response will be parsed as JSON. If set to false, the response will be returned as is without any
   * parsing.
   * @param {any} headers - The `headers` parameter is an optional parameter that allows you to
   * specify additional headers to include in the DELETE request. By default, it is set to
   * `{'Content-Type': 'application/json'}` which sets the content type of the request to JSON.
   * However, you can override this default value by
   * @returns the result of the `DeleteFetch` function, which is being awaited.
   */
  public async Delete(
    path: string,
    Responsejson = true,
    headers: object = this.#ContentType,
  ) {
    // Function for DELETE requests
    return await DeleteFetch(`${this.#Domain}${path}`, Responsejson, headers);
  }

  // Function for PUT requests
  /**
   * The function is used for making PUT requests with optional parameters for data, response format, and
   * headers.
   * @param {string} path - The path parameter is a string that represents the endpoint or URL path where
   * the PUT request will be sent to. It specifies the location of the resource that needs to be updated
   * or modified.
   * @param {any} Data - The `Data` parameter is the payload or data that you want to send in the request
   * body. It can be of any type, but in this case, it is of type `any`, which means it can be any
   * JavaScript object.
   * @param [Responsejson=true] - The `Responsejson` parameter is a boolean flag that determines whether
   * the response from the server should be parsed as JSON or not. If `Responsejson` is set to `true`,
   * the response will be parsed as JSON. If it is set to `false`, the response will be returned as is
   * @param {any} headers - The `headers` parameter is an optional parameter that allows you to specify
   * additional headers for the PUT request. By default, it is set to `{'Content-Type':
   * 'application/json'}` which sets the content type of the request to JSON.
   * @returns the result of the `PutFetch` function.
   */
  public async Put(
    path: string,
    Data: any,
    Responsejson = true,
    headers: object = this.#ContentType,
  ) {
    // Function for PUT requests
    return await PutFetch(
      `${this.#Domain}${path}`,
      Data,
      Responsejson,
      headers,
    );
  }
}
