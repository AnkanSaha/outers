## outers - a all in one package for your day to day use
[![npm version](https://badge.fury.io/js/outers.svg)](https://badge.fury.io/js/outers)

### This package provides services like Response Sender, Colorful Console, HTTP Status Codes, API Call, Random Number Generate, Create Cluster in NodeJS Easily also you can Store Temporary Data in Server Side like localStorage in Client Side

## Usage
```shell
npm install outers@latest --save  # install the package
```

### If You Want to Use Encrypt and Decrypt, You Need To Install in your Client Side
```shell
npm i react-caches@latest --save
```

## Encrypt and Decrypt
```javascript
const { methods } = require('outers'); // import the package

const Crypto = new methods.CryptoGraphy('secretKey'); // create a new instance of CryptoGraphy class

const ASYNCencrypted = Crypto.Encrypt('Hello World!'); // encrypt the string with secret key in async way

const SYNCencrypted = Crypto.EncryptSync('Hello World!'); // encrypt the string with secret key in sync way

const ASYNCdecrypted = Crypto.Decrypt(ASYNCencrypted); // decrypt the string with secret key in async way

const SYNCdecrypted = Crypto.DecryptSync(SYNCencrypted); // decrypt the string with secret key in sync way
```

## Send HTTP Response in Efficient Way with HTTP Status Code
```javascript
const { Serve, StatusCodes } = require('outers'); // import the package

Serve.JSON({ // send a JSON response to the client
     status: true, // boolean value
     response: response, // response object in Express or Node Server
     statusCode: StatusCodes.OK, // HTTP Status Code
     Title: 'Hello World!', // Title of the response (you can pass anything or yo can pass undefined) ** Mainly used in Modal POP-UP Text **
     data: { // data object of the response (you can pass anything or yo can pass undefined)
          message: 'Hello World!' // message of the response
     },
     message: 'Hello World!' // message of the response (you can pass anything or yo can pass undefined) ** Mainly used in Modal POP-UP Text **
     cookieData: [ // cookieData array of the response (you can pass anything or yo can pass undefined)
            {
                 name: 'cookieName', // name of the cookie
                 value: 'cookieValue', // value of the cookie
                 options: { // options of the cookie
                        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                 }
            }
         
     ]
}) // send a JSON response to the client

Serve.File({ // send a file to the client
    response: response, // response object in Express or Node Server
    rootName: 'public', // root directory name or your static directory name
    statusCode: StatusCodes.OK, // HTTP Status Code
    Filename: 'index.html', // Name of the File that you want to send, it can be anything like, image, html file, pdf, audio, video etc.
    cookieData: [ // cookieData array of the response (you can pass anything or yo can pass undefined)
            {
                 name: 'cookieName', // name of the cookie
                 value: 'cookieValue', // value of the cookie
                 options: { // options of the cookie
                        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                 }
            }
         
     ]
}) // send a file to the client
```

## API Call in Efficient Way
```javascript
const { methods } = require('outers'); // import the package

const Call = new methods.APiCall.ClassBased("https://jsonplaceholder.typicode.com"); // create a new instance of API class with base URL

Call.Get('/todos/1', true, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a GET request to the server with you want to parse the response to JSON

Call.Get('/todos', false, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a POST request to the server with you want to not parse the response to JSON
 
Call.Post('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
}, true, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a POST request to the server with you want to parse the response to JSON

Call.Post('/posts/1', {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
}, false, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a PUT request to the server with you want not to parse the response to JSON

Call.Put('/posts/1', {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
}, true, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a PUT request to the server with you want to parse the response to JSON

Call.Put('/posts/1', {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
}, false, {"Custom Headers"}).then((response) => {
    Console.log(response)
}); // send a PUT request to the server with you want not to parse the response to JSON

Call.Delete('/posts/1', true, {"Custom Headers"}).then((response) => {}); // send a DELETE request to the server with you want to parse the response to JSON

Call.Delete('/posts/1', false, {"Custom Headers"}).then((response) => {}); // send a DELETE request to the server with you want not to parse the response to JSON

** Note : You can set Custom Headers in the third parameter of the function, by default it is set to application/json **

```

## Generate Random Number, Words, Symbols
```javascript

const { methods } = require('outers'); // import the package

const Unique = new methods.UniqueGenerator(10); // create a new instance of UniqueGenerator class with length of the random string or number or symbol

const Number = Unique.RandomNumber(true, ["Custom Numbers"]); // generate a random number with custom numbers with Zero

const Number = Unique.RandomNumber(false, ["Custom Numbers"]); // generate a random number with custom numbers without Zero

const Words = Unique.RandomWord(true, ["Custom Words"]); // generate a random word with custom words in Capital Letters

const Words = Unique.RandomWord(false, ["Custom Words"]); // generate a random word with custom words in Small Letters

const Mixed = Unique.RandomMixed(true, ["Custom Mixed"]); // generate a random mixed string with custom mixed in Capital Letters

const Mixed = Unique.RandomMixed(false, ["Custom Mixed"]); // generate a random mixed string with custom mixed in Small Letters

const Symbols = Unique.RandomSymbol(["Custom Symbols"]); // generate a random symbol with custom symbols

** Custom Numbers, Words, Mixed and Symbols are optional, you can pass anything or you can pass undefined **

```

## Console Colorful Print
```javascript
const {Console} = require('outers'); // import the package

Console.green('Hello World!'); // print a string to the console with green color

Console.red('Hello World!'); // print a string to the console with red color

Console.blue('Hello World!'); // print a string to the console with blue color

Console.yellow('Hello World!'); // print a string to the console with yellow color

Console.magenta('Hello World!'); // print a string to the console with magenta color

Console.bright('Hello World!'); // print a string to the console with bright color

Console.cyan('Hello World!'); // print a string to the console with cyan color
```

## Get Requester IP Address in Request.body Object
```javascript
const { Middleware } = require('outers'); // import the package
app.use('/api', Middleware.RequestInjectIP, MainFunction); // inject the IP Address in Request.body 
```
- Note : You can access the IP Address in Request.body Object
- Example : Request.body.RequesterIPaddress
- Requirement : This Middleware work only can with POST, PATCH, PUT and DELETE Request
- Note : You can use this Middleware in any route, but it is recommended to use in the first route
- Example : app.use('/api', Middleware.RequestInjectIP, MainFunction);
- You need to set trust proxy to true in express app to get the IP Address
- Example : app.set('trust proxy', true);
- You Need to Set X-Forwarded-For in the Header of the Request in Nginx or Apache or any other server
- Example : proxy_set_header X-Forwarded-For $remote_addr;


## Create Cluster in NodeJS Easily
```javascript
const { methods } = require('outers'); // import the package
methods.ClusterCreator.CreateByFunction(ExpressServer, PORT, CustomWorkerCount, engineMiddlewares?, BeforeListenFunctions? AfterListenFunctions?, ...FunctionMiddlewares?); // create a cluster with custom worker count
```

# Full Example
```javascript
const Express = require('express'); // import express
const { methods} = require('outers'); // import the package
const app = Express(); // create a new express app
const CORS = require('cors'); // import cors
const PORT = process.env.PORT || 3000; // set the port

// Set the All Middlewares & First with the Express App like Body Parser, Cookie Parser, CORS, Helmet, Compression, Request Inject IP etc.
app.static('public'); // set the static directory
app.set('trust proxy', true); // set trust proxy to true
app.use(CORS); // use CORS
app.use(Express.json()); // use Express.json()
app.use(Express.urlencoded({ extended: true })); // use Express.urlencoded()
app.use(Middleware.RequestInjectIP); // inject the IP Address in Request.body

// Set the Routes with the Express App
app.use('/api', Routes); // set the routes

// At Last Create a Cluster with the Express App
methods.ClusterCreator.CreateByFunction(app, PORT, 2, [{
    Key: 'trust proxy',
    Value: true
},
{
    Key: 'view engine',
    Value: 'ejs'
}
], [
    () => {
        Console.green('Server Started Not Listening');
    }
], [
    () => {
        Console.green('Server Started Listening');
    }
],
[
    (req, res, next) => {
        Console.green('Function Middleware 1');
        next();
    },
    (req, res, next) => {
        Console.green('Function Middleware 2');
        next();
    },
    (req, res, next) => {
        Console.green('Function Middleware 3');
        next();
    }
]); // create a cluster with custom worker count

// Default Value of CustomWorkerCount is length of the CPU Core & Default Value of PORT is 3000

// If you want to use the default value of CustomWorkerCount then you can pass undefined in the third parameter of the function

// You Don't need to listen the app, it will automatically listen the app in the cluster

// After all the setup, you can connect Database or anything else that you want to do

// If you want to use the engine middlewares, then you can pass the engine middlewares in the fourth parameter of the function or you can pass undefined if you don't want to use engine middlewares or you want to use outside of the cluster

// If you want to use the before listen functions, then you can pass the before listen functions in the fifth parameter of the function or you can pass undefined if you don't want to use before listen functions or you want to use outside of the cluster

// If you want to use the after listen functions, then you can pass the after listen functions in the sixth parameter of the function or you can pass undefined if you don't want to use after listen functions or you want to use outside of the cluster

// If you want to use the function middlewares, then you can pass the function middlewares in the seventh parameter of the function or you can pass undefined if you don't want to use function middlewares or you want to use outside of the cluster, you can pass as many as you want
```

# Store Temporary Data in Server Side like localStorage in Client Side
```javascript
const { methods } = require('outers'); // import the package
const storage = new methods.Storage.CreateNewShortStorage('Ankan Saha', 100); // create a new instance of Storage class with name of the storage with 100 KB of storage size

storage.createShortStorage(); // create a new short storage with name of the storage with 100 KB of storage size

storage.Save("Ankan", { // save a data in the storage with key and value with .then() method
        Name: "Ankan",
        Roll: 67
    }).then((res) => {
        console.log(res)
    })

await storage.Save("Ankan", { // save a data in the storage with key and value with await keyword
        Name: "Ankan",
        Roll: 67
    })


storage.Get("Ankan").then((res) => { // get a data from the storage with key with .then() method
    console.log(res)
})

await storage.Get("Ankan") // get a data from the storage with key with await keyword

await storage.Delete("Ankan") // delete a data from the storage with key with await keyword

storage.Delete("Ankan").then((res) => { // delete a data from the storage with key with .then() method
    console.log(res)
})

storage.DeleteStorage().(res=> console.log(res)); // Delete The All Data & also Delete the Data Storage with .then method

await storage.DeleteStorage() // Delete The All Data & also Delete the Data Storage with await keyword

## License
MIT