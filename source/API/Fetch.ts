// Data Types
type str = string

/**
 * The function `PostFetch` is an asynchronous function that sends a POST request to an API with the
 * provided data and headers, and returns the response as a JSON object.
 * @param {str} API - The API parameter is a string that represents the URL of the API endpoint you
 * want to send the POST request to. It should be a valid URL.
 * @param {unknown} Data - The `Data` parameter is the data that you want to send in the POST request.
 * It can be of any type, but it will be converted to a JSON string using `JSON.stringify()` before
 * sending it in the request body.
 * @param Headers - The `Headers` parameter is an optional object that specifies the headers to be
 * included in the HTTP request. By default, it is set to `{ 'Content-Type': 'application/json' }`,
 * which means that the request body will be in JSON format. However, you can override this default
 * value by
 * @returns a Promise that resolves to an unknown value.
 */
export async function PostFetch (API: str, Data: unknown, Headers = { 'Content-Type': 'application/json' }): Promise<unknown> {
  const Response = await fetch(API, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify(Data)
  }) // fetch the API
  const JSONResponse: unknown = await Response.json() // convert the response to JSON

  // return the response
  return JSONResponse
}; // end of PostFetch

// function for GET requests
/**
 * The function `GetFetch` is an asynchronous function that fetches data from an API using the GET
 * method and returns the response as JSON.
 * @param {str} API - The API parameter is a string that represents the URL of the API you want to
 * fetch data from. It should be a valid URL that points to the API endpoint.
 * @param Headers - The `Headers` parameter is an optional object that specifies the headers to be
 * included in the request. In this case, the default value is `{ 'Content-Type': 'application/json'
 * }`, which sets the `Content-Type` header to `application/json`. This header indicates that the
 * request body will
 * @returns a Promise that resolves to an unknown value.
 */
export async function GetFetch (API: str, Headers = { 'Content-Type': 'application/json' }): Promise<unknown> {
  const Response = await fetch(API, {
    method: 'GET',
    headers: Headers
  }) // fetch the API

  const JSONResponse: unknown = await Response.json() // convert the response to JSON

  // return the response
  return JSONResponse
}

// function for PUT requests
/**
 * The function `PutFetch` is an asynchronous function that sends a PUT request to an API with the
 * provided data and headers, and returns the response as JSON.
 * @param {str} API - The API parameter is a string that represents the URL of the API endpoint you
 * want to send the PUT request to. It should include the protocol (e.g., "https://") and any necessary
 * path or query parameters.
 * @param {unknown} Data - The `Data` parameter is the data that you want to send in the PUT request.
 * It can be of any type, but it will be converted to a JSON string using `JSON.stringify()` before
 * sending it in the request body.
 * @param Headers - The `Headers` parameter is an optional parameter that allows you to specify custom
 * headers for the PUT request. By default, it is set to `{ 'Content-Type': 'application/json' }`,
 * which sets the content type of the request to JSON. However, you can override this value by passing
 * your
 * @returns a Promise that resolves to an unknown value.
 */
export async function PutFetch (API: str, Data: unknown, Headers = { 'Content-Type': 'application/json' }): Promise<unknown> {
  const Response = await fetch(API, {
    method: 'PUT',
    headers: Headers,
    body: JSON.stringify(Data)
  }) // fetch the API

  const JSONResponse: unknown = await Response.json() // convert the response to JSON

  // return the response
  return JSONResponse
}

// function for DELETE requests
/**
 * The above function is an asynchronous function that sends a DELETE request to an API and returns the
 * response as a JSON object.
 * @param {str} API - The API parameter is a string that represents the URL of the API endpoint that
 * you want to send the DELETE request to. It should be a valid URL.
 * @param Headers - The `Headers` parameter is an optional object that specifies the headers to be
 * included in the DELETE request. By default, it is set to `{ 'Content-Type': 'application/json' }`,
 * which sets the content type of the request to JSON. However, you can pass a different set of headers
 * @returns a Promise that resolves to an unknown value.
 */
export async function DeleteFetch (API: str, Headers = { 'Content-Type': 'application/json' }): Promise<unknown> {
  const Response = await fetch(API, {
    method: 'DELETE',
    headers: Headers
  }) // fetch the API

  const JSONResponse: unknown = await Response.json() // convert the response to JSON

  // return the response
  return JSONResponse
}
