// Import All Feature from  internal module
import {blue, bright, cyan, dimmed, gray, green, magenta, red, reverse, underscore, yellow } from './color/Console.log'; // Import Console Module
import {APiCall} from './API/Dispatcher'; // Import API Module
import {PutFetch, DeleteFetch, GetFetch, PostFetch} from './API/bin/Fetch'; // Import Fetch Module
import {StatusCode} from './StatusCode/Code'; // Import StatusCode Module
import { JSONSendResponse } from './Response/JSON-Response'; // Import JSON Response Module
import { SendFileResponse } from './Response/File-Response'; // Import File Response Module
import { UniqueGen } from './UniqueGen/Base'; // Import UniqueGen Module
import InjectIP from './Request IP Injector/Base.middleware'; // Import Inject IP Module
import Jwt from './JWT/JWT.method'; // Import JWT Manager Module 
import CreateClusterByFunction from './Cluster/CreateClusterByFunction.method'; // Import Cluster Module
import Encryption from './Encryption - Decryption/Crypto'; // Import Crypto Module

// Export All Feature from  internal module
/* The code is exporting an object named `ConsoleColors` that contains various color functions from the
`Console.log` module. These color functions can be used to format console output with different
colors. By exporting this object, other modules or files can import and use these color functions by
accessing them through the `ConsoleColors` object. */
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
    yellow
}); // Export Console Module

// export all feature from internal module
/* The line `export const API = APiCall; // Export API Module` is exporting the `APiCall` function from
the `Dispatcher` module as `API`. This allows other modules or files to import and use the `APiCall`
function by importing `API` from this module. */
export const API = APiCall; // Export API Module

// Export Fetch Module
export const Fetch = Object.freeze({
    Put : PutFetch,
    Delete : DeleteFetch,
    Get : GetFetch,
    Post : PostFetch
}); // Export Fetch Module

/* The line `export const StatusCodes = StatusCode; // Export StatusCode Module` is exporting the
`StatusCode` object from the `Code` module as `StatusCodes`. This allows other modules or files to
import and use the `StatusCode` object by importing `StatusCodes` from this module. */
export const StatusCodes = StatusCode; // Export StatusCode Module


// export all feature from internal module
/* The code is exporting an object named `Response` that contains two properties: `JSON` and `File`. */
export const Serve = Object.freeze({
    JSON : JSONSendResponse,
    File : SendFileResponse
}); // Export JSON Response Module

// Export All Middlewares
export const Middleware = Object.freeze({
    RequestInjectIP: InjectIP // Export IP Injector Module as Middleware
}); // Export IP Injector Module as Middleware


// Export All Methods
export const methods = Object.freeze({
    JWT_Manager : Jwt, // Export JWT Manager Module
    ClusterCreator: {
        CreateByFunction : CreateClusterByFunction
    }, // Export Cluster Creator Module
    UniqueGenerator : UniqueGen, // Export UniqueGen Module
    CryptoGraphy: Encryption, // Export Crypto Module
}); // Export All Methods
