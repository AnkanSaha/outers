# outers - a small package for console color printing

### This package provides a simple way to print colored text to the console.

## Usage
```shell
npm install outers@latest --save  # install the package
```

## Without Destructuring
```javascript
const outers = require('outers'); // import the package

outers.green('Hello World!'); // print a string to the console with green color

outers.red('Hello World!'); // print a string to the console with red color

outers.blue('Hello World!'); // print a string to the console with blue color

outers.yellow('Hello World!'); // print a string to the console with yellow color

outers.magenta('Hello World!'); // print a string to the console with magenta color

```

## With Destructuring
```javascript
const { green, red, blue, yellow, magenta } = require('outers');

green('Hello World!'); // print a string to the console with green color

red('Hello World!'); // print a string to the console with red color

blue('Hello World!'); // print a string to the console with blue color

yellow('Hello World!'); // print a string to the console with yellow color

magenta('Hello World!'); // print a string to the console with magenta color
```

## you can pass multiple arguments to the functions
```javascript
const { green, red, blue, yellow, magenta } = require('outers');

green('Hello', 'World!'); // print a string to the console with green color

red('Hello', 'World!'); // print a string to the console with red color

blue('Hello', 'World!'); // print a string to the console with blue color

yellow('Hello', 'World!'); // print a string to the console with yellow color

magenta('Hello', 'World!'); // print a string to the console with magenta color
```

## License
MIT