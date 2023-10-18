// Import All Feature from  internal module
import {nodeDecryption} from './Encryption - Decryption/Crypto'; // Import Crypto Module
import {blue, bright, cyan, dimmed, gray, green, magenta, red, reverse, underscore, yellow } from './color/Console.log'; // Import Console Module
import {APiCall} from './API/Dispatcher'; // Import API Module

// Export All Feature from  internal module
/* The line `export const CryptoGraphy = nodeDecryption;` is exporting the `nodeDecryption` function
from the `Crypto` module as `CryptoGraphy`. This allows other modules or files to import and use the
`nodeDecryption` function by importing `CryptoGraphy` from this module. */
export const CryptoGraphy = nodeDecryption; // Export Crypto Module

// Export All Feature from  internal module
/* The code is exporting an object named `ConsoleColors` that contains various color functions from the
`Console.log` module. These color functions can be used to format console output with different
colors. By exporting this object, other modules or files can import and use these color functions by
accessing them through the `ConsoleColors` object. */
export const ConsoleColors = {
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