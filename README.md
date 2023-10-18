# outers - a all in one package for your day to day use
[![npm version](https://badge.fury.io/js/outers.svg)](https://badge.fury.io/js/outers)

### This package provides services like Response Sender, Colorful Console, HTTP Status Codes, API Call, Random Number Generate, Encryption and Decryption and many more.

## Usage
```shell
npm install outers@latest --save  # install the package
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

## Encrypt and Decrypt
```javascript
const { CryptoGraphy } = require('outers'); // import the package

const Crypto = new CryptoGraphy('secretKey'); // create a new instance of CryptoGraphy class

const ASYNCencrypted = Crypto.Encrypt('Hello World!'); // encrypt the string with secret key in async way

const SYNCencrypted = Crypto.EncryptSync('Hello World!'); // encrypt the string with secret key in sync way

const ASYNCdecrypted = Crypto.Decrypt(ASYNCencrypted); // decrypt the string with secret key in async way

const SYNCdecrypted = Crypto.DecryptSync(SYNCencrypted); // decrypt the string with secret key in sync way
```

## Send HTTP Response in Efficient Way with HTTP Status Code
```javascript
const { Response, StatusCodes } = require('outers'); // import the package

Response.JSON({ // send a JSON response to the client
     status: true, // boolean value
     response: response, // response object in Express or Node Server
     statusCode: StatusCodes.OK, // HTTP Status Code
     Title: 'Hello World!', // Title of the response (you can pass anything or yo can pass undefined) ** Mainly used in Modal POP-UP Text **
     data: { // data object of the response (you can pass anything or yo can pass undefined)
          message: 'Hello World!' // message of the response
     },
     message: 'Hello World!' // message of the response (you can pass anything or yo can pass undefined) ** Mainly used in Modal POP-UP Text **
}) // send a JSON response to the client

Response.File({ // send a file to the client
    response: response, // response object in Express or Node Server
    rootName: 'public', // root directory name or your static directory name
    statusCode: StatusCodes.OK, // HTTP Status Code
    Filename: 'index.html', // Name of the File that you want to send, it can be anything like, image, html file, pdf, audio, video etc.
}) // send a file to the client
```

## API Call in Efficient Way
```javascript
const { API } = require('outers'); // import the package

const Call = new API("https://jsonplaceholder.typicode.com"); // create a new instance of API class with base URL

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

const { UniqueGenerator } = require('outers'); // import the package

const Unique = new UniqueGenerator(10); // create a new instance of UniqueGenerator class with length of the random string or number or symbol

const Number = Unique.RandomNumber(true, ["Custom Numbers"]); // generate a random number with custom numbers with Zero

const Number = Unique.RandomNumber(false, ["Custom Numbers"]); // generate a random number with custom numbers without Zero

const Words = Unique.RandomWord(true, ["Custom Words"]); // generate a random word with custom words in Capital Letters

const Words = Unique.RandomWord(false, ["Custom Words"]); // generate a random word with custom words in Small Letters

const Mixed = Unique.RandomMixed(true, ["Custom Mixed"]); // generate a random mixed string with custom mixed in Capital Letters

const Mixed = Unique.RandomMixed(false, ["Custom Mixed"]); // generate a random mixed string with custom mixed in Small Letters

const Symbols = Unique.RandomSymbol(["Custom Symbols"]); // generate a random symbol with custom symbols

** Custom Numbers, Words, Mixed and Symbols are optional, you can pass anything or you can pass undefined **

```

## License
MIT