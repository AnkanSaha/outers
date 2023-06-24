// Written by: Ankan Saha

/* This is a TypeScript code that exports an object with various color codes as properties. The `export
default` statement makes this object available for use in other modules that import it. The color
codes are used to format text output in the console or terminal. For example, `'\x1b[32m'`
represents the color green. */

export default {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  dimmed: '\x1b[2m',
  bright: '\x1b[1m',
  underscore: '\x1b[4m',
  reverse: '\x1b[7m'
}
