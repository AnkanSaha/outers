import { color } from "../Config/Constant/Logs.Constant"; // import color object from color.ts

// global types
type globe =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | symbol
  | bigint;

type anyArray = unknown[]; // type anything is an array of unknown type

// function for green
/**
 * The "green" function logs each element in an array of "globe" type with the color green and returns
 * the original array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * green. Finally, the function returns the
 * @returns an array of objects of type `globe`.
 */
export function green(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.green, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.green} has been executed successfully`,
  };
} // end of green

// function for yellow
/**
 * The "yellow" function logs each payload in yellow color and returns the payloads.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of type "globe". The function then iterates over each
 * element of the array and logs it to the console with the color yellow. Finally, the function returns
 * the original array of "globe"
 * @returns an array of objects of type `globe`.
 */
export function yellow(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.yellow, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.yellow} has been executed successfully`,
  };
} // end of yellow

// function for red
/**
 * The "red" function logs each payload in red color and returns the payloads.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of type "globe". The function then iterates over each
 * element of the array and logs it to the console with the color red. Finally, the function returns
 * the original array of "globe"
 * @returns an array of objects of type `globe`.
 */
export function red(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.red, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.red} has been executed successfully`,
  };
} // end of red

// function for blue
/**
 * The "blue" function logs each payload in blue color and returns the payloads.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of globe objects. The function then iterates over each
 * globe object in the array and logs its contents to the console with the color blue. Finally, the
 * function returns the original array of globe objects.
 * @returns The function `blue` is returning an array of `globe` objects.
 */
export function blue(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.blue, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.blue} has been executed successfully`,
  };
} // end of blue

// function for magenta
/**
 * The function "magenta" logs each element in an array of "globe" type with the color magenta and
 * returns the array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the
 * magenta color using the "color" object
 * @returns an array of objects of type `globe`.
 */
export function magenta(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.magenta, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.magenta} has been executed successfully`,
  };
} // end of magenta

// function for cyan
/**
 * The function "cyan" logs the given payloads in cyan color and returns them.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * cyan. Finally, the function returns the
 * @returns The function `cyan` is returning an array of `globe` objects.
 */
export function cyan(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.cyan, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.cyan} has been executed successfully`,
  };
} // end of cyan

// function for gray
/**
 * The "gray" function logs each element in an array of "globe" type with a gray color and returns the
 * original array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * gray. Finally, the function returns the
 * @returns an array of `globe` objects, which is the same as the `Payload` parameter passed to the
 * function.
 */
export function gray(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.gray, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.gray} has been executed successfully`,
  };
} // end of gray

// function for dimmed
/**
 * The "dimmed" function logs each element in an array of "globe" objects with a dimmed color and
 * returns the original array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe", which is not
 * defined in the code snippet provided. The function then iterates over each argument using a forEach
 * loop and logs the argument to the console with
 * @returns The function `dimmed` is returning an array of `globe` objects, which is the same as the
 * `Payload` parameter passed to the function.
 */
export function dimmed(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.dimmed, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.dimmed} has been executed successfully`,
  };
} // end of dimmed

// function for bright
/**
 * The "bright" function logs each element in an array of "globe" objects with a bright color and
 * returns the original array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe", which is not
 * defined in the code snippet provided. The function then iterates over each argument using the
 * forEach method and logs the argument to the console with
 * @returns The function `bright` is returning an array of `globe` objects after logging each object
 * with the `color.bright` property to the console.
 */
export function bright(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.bright, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.bright} has been executed successfully`,
  };
} // end of bright

// function for underscore
/**
 * The function "underscore" logs each element in an array and returns the array.
 * @param {anyArray} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using the forEach method and logs it to the console with an underscore
 * color. Finally, the function returns the original
 * @returns an array of `globe` objects, which is the same as the `Payload` parameter passed to the
 * function.
 */
export function underscore(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.underscore, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.underscore} has been executed successfully`,
  };
} // end of Underscore

// function for reverse
/**
 * The function "reverse" takes in an array of "globe" type and logs each element in reverse order
 * while returning the original array.
 * @param {anyArray} Payload - The parameter `Payload` is an array of `globe` type elements. The
 * `reverse` function takes this array as input and logs each element in reverse order using the
 * `console.log` function. Finally, the function returns the same array in reverse order.
 * @returns an array of `globe` elements after logging each element in the array to the console with
 * the color `reverse`.
 */
export function reverse(...Payload: anyArray): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.reverse, payload);
  });
  return {
    Status: "Success",
    Payload,
    Message: `The function ${color.reverse} has been executed successfully`,
  };
} // end of Underscore
