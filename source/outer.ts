// Import All Feature from  internal module
import {blue, bright, cyan, dimmed, gray, green, magenta, red, reverse, underscore, yellow } from './Logs/Console.log'; // Import Console Module
import {APiCall} from './API/Dispatcher'; // Import API Module
import {PutFetch, DeleteFetch, GetFetch, PostFetch} from './API/functions/Fetch'; // Import Fetch Module
import {StatusCode} from './StatusCode/Code'; // Import StatusCode Module
import { JSONSendResponse } from './Response/JSON-Response'; // Import JSON Response Module
import { SendFileResponse } from './Response/File-Response'; // Import File Response Module
import { UniqueGen } from './UniqueGen/Base'; // Import UniqueGen Module
import InjectIP from './Request IP Injector/Base.middleware'; // Import Inject IP Module
import Jwt from './JWT/JWT.method'; // Import JWT Manager Module 
import CreateClusterByFunction from './Cluster/CreateClusterByFunction.method'; // Import Cluster Module
import Encryption from './Encryption - Decryption/Dispatcher'; // Import Crypto Module
import CreateNewShortStorage from './Storage Management/ShortStorage.storage'; // Import Short Storage Module

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


// Export All Methods with Freeze
export const methods = Object.freeze({
    JWT_Manager : Jwt, // Export JWT Manager Module
    ClusterCreator: {
        CreateByFunction : CreateClusterByFunction
    }, // Export Cluster Creator Module
    UniqueGenerator : UniqueGen, // Export UniqueGen Module
    CryptoGraphy: Encryption, // Export Crypto Module
    APiCall: {
        FunctionBased: {
            Get: GetFetch,
            Post: PostFetch,
            Put: PutFetch,
            Delete: DeleteFetch            
        },
        ClassBased: APiCall
    },
    Storage: {
        CreateNewShortStorage: CreateNewShortStorage
    }
}); // Export All Methods
