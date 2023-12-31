// Import All Feature from  internal module
import {Encryption} from './Encryption - Decryption/Crypto'; // Import Crypto Module
import {blue, bright, cyan, dimmed, gray, green, magenta, red, reverse, underscore, yellow } from './color/Console.log'; // Import Console Module
import {APiCall} from './API/Dispatcher'; // Import API Module
import {PutFetch, DeleteFetch, GetFetch, PostFetch} from './API/bin/Fetch'; // Import Fetch Module
import {StatusCode} from './StatusCode/Code'; // Import StatusCode Module
import { JSONSendResponse } from './Response/JSON-Response'; // Import JSON Response Module
import { SendFileResponse } from './Response/File-Response'; // Import File Response Module
import { UniqueGen } from './UniqueGen/Base'; // Import UniqueGen Module

// Export All Feature from  internal module

/* The line `export const CryptoGraphy = Encryption; // Export Crypto Module` is exporting the
`Encryption` object from the `Crypto` module as `CryptoGraphy`. This allows other modules or files
to import and use the `Encryption` object by importing `CryptoGraphy` from this module. */
export const CryptoGraphy = Encryption; // Export Crypto Module

// Export All Feature from  internal module
/* The code is exporting an object named `ConsoleColors` that contains various color functions from the
`Console.log` module. These color functions can be used to format console output with different
colors. By exporting this object, other modules or files can import and use these color functions by
accessing them through the `ConsoleColors` object. */
export const Console = {
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
    yellow
}; // Export Console Module

// export all feature from internal module
/* The line `export const API = APiCall; // Export API Module` is exporting the `APiCall` function from
the `Dispatcher` module as `API`. This allows other modules or files to import and use the `APiCall`
function by importing `API` from this module. */
export const API = APiCall; // Export API Module

// Export Fetch Module
export const Fetch = {
    Put : PutFetch,
    Delete : DeleteFetch,
    Get : GetFetch,
    Post : PostFetch
}; // Export Fetch Module

/* The line `export const StatusCodes = StatusCode; // Export StatusCode Module` is exporting the
`StatusCode` object from the `Code` module as `StatusCodes`. This allows other modules or files to
import and use the `StatusCode` object by importing `StatusCodes` from this module. */
export const StatusCodes = StatusCode; // Export StatusCode Module


// export all feature from internal module
/* The code is exporting an object named `Response` that contains two properties: `JSON` and `File`. */
export const Response = {
    JSON : JSONSendResponse,
    File : SendFileResponse
}; // Export JSON Response Module

// Export UniqueGen Module
/* The line `export const UniqueGenerator = UniqueGen; // Export UniqueGen Module` is exporting the
`UniqueGen` object from the `Base` module as `UniqueGenerator`. This allows other modules or files
to import and use the `UniqueGen` object by importing `UniqueGenerator` from this module. */
export const UniqueGenerator = UniqueGen; // Export UniqueGen Module