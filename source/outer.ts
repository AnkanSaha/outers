/* eslint-disable @typescript-eslint/no-explicit-any */
import color from './color/color' // import color object from color.ts

// Common Functions
import { Decrypt, Encrypt } from './Common/Common'

// API Functions
import { GetFetch, DeleteFetch, PostFetch, PutFetch } from './API/Fetch'; // import Fetch functions from Fetch.ts

// global types
type globe = string | number | boolean | object | null | undefined | symbol | bigint

// function for green
/**
 * The "green" function logs each element in an array of "globe" type with the color green and returns
 * the original array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * green. Finally, the function returns the
 * @returns an array of objects of type `globe`.
 */
export function green (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.green, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.green} has been executed successfully`
  }
} // end of green

// function for yellow
/**
 * The "yellow" function logs each payload in yellow color and returns the payloads.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of type "globe". The function then iterates over each
 * element of the array and logs it to the console with the color yellow. Finally, the function returns
 * the original array of "globe"
 * @returns an array of objects of type `globe`.
 */
export function yellow (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.yellow, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.yellow} has been executed successfully`
  }
} // end of yellow

// function for red
/**
 * The "red" function logs each payload in red color and returns the payloads.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of type "globe". The function then iterates over each
 * element of the array and logs it to the console with the color red. Finally, the function returns
 * the original array of "globe"
 * @returns an array of objects of type `globe`.
 */
export function red (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.red, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.red} has been executed successfully`
  }
} // end of red

// function for blue
/**
 * The "blue" function logs each payload in blue color and returns the payloads.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments as an array of globe objects. The function then iterates over each
 * globe object in the array and logs its contents to the console with the color blue. Finally, the
 * function returns the original array of globe objects.
 * @returns The function `blue` is returning an array of `globe` objects.
 */
export function blue (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.blue, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.blue} has been executed successfully`
  }
} // end of blue

// function for magenta
/**
 * The function "magenta" logs each element in an array of "globe" type with the color magenta and
 * returns the array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the
 * magenta color using the "color" object
 * @returns an array of objects of type `globe`.
 */
export function magenta (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.magenta, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.magenta} has been executed successfully`
  }
} // end of magenta

// function for cyan
/**
 * The function "cyan" logs the given payloads in cyan color and returns them.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * cyan. Finally, the function returns the
 * @returns The function `cyan` is returning an array of `globe` objects.
 */
export function cyan (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.cyan, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.cyan} has been executed successfully`
  }
} // end of cyan

// function for gray
/**
 * The "gray" function logs each element in an array of "globe" type with a gray color and returns the
 * original array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using a forEach loop and logs the argument to the console with the color
 * gray. Finally, the function returns the
 * @returns an array of `globe` objects, which is the same as the `Payload` parameter passed to the
 * function.
 */
export function gray (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.gray, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.gray} has been executed successfully`
  }
} // end of gray

// function for dimmed
/**
 * The "dimmed" function logs each element in an array of "globe" objects with a dimmed color and
 * returns the original array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe", which is not
 * defined in the code snippet provided. The function then iterates over each argument using a forEach
 * loop and logs the argument to the console with
 * @returns The function `dimmed` is returning an array of `globe` objects, which is the same as the
 * `Payload` parameter passed to the function.
 */
export function dimmed (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.dimmed, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.dimmed} has been executed successfully`
  }
} // end of dimmed

// function for bright
/**
 * The "bright" function logs each element in an array of "globe" objects with a bright color and
 * returns the original array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe", which is not
 * defined in the code snippet provided. The function then iterates over each argument using the
 * forEach method and logs the argument to the console with
 * @returns The function `bright` is returning an array of `globe` objects after logging each object
 * with the `color.bright` property to the console.
 */
export function bright (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.bright, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.bright} has been executed successfully`
  }
} // end of bright

// function for underscore
/**
 * The function "underscore" logs each element in an array and returns the array.
 * @param {globe[]} Payload - Payload is a rest parameter that allows the function to accept an
 * indefinite number of arguments. In this case, the arguments are of type "globe". The function then
 * iterates over each argument using the forEach method and logs it to the console with an underscore
 * color. Finally, the function returns the original
 * @returns an array of `globe` objects, which is the same as the `Payload` parameter passed to the
 * function.
 */
export function underscore (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.underscore, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.underscore} has been executed successfully`
  }
} // end of Underscore

// function for reverse
/**
 * The function "reverse" takes in an array of "globe" type and logs each element in reverse order
 * while returning the original array.
 * @param {globe[]} Payload - The parameter `Payload` is an array of `globe` type elements. The
 * `reverse` function takes this array as input and logs each element in reverse order using the
 * `console.log` function. Finally, the function returns the same array in reverse order.
 * @returns an array of `globe` elements after logging each element in the array to the console with
 * the color `reverse`.
 */
export function reverse (...Payload: unknown[]): globe {
  Payload.forEach((payload: unknown) => {
    console.log(color.reverse, payload)
  })
  return {
    Status: 'Success',
    Payload,
    Message: `The function ${color.reverse} has been executed successfully`
  }
} // end of Underscore

// Node Encryption Class
class nodeDecryption {
  Key: string
  constructor (Key: string) {
    this.Key = Key
  }

  public async Decrypt (Data: string): Promise<unknown> {
    // Encrypt data
    const decryptedData = await Decrypt(Data, this.Key)
    // Convert data from string to its original type
    const ReadyData = JSON.parse(String(decryptedData))
    return ReadyData
  }

  public async Encrypt (Data: any): Promise<string> {
    // Convert data to string
    const ReadyData = JSON.stringify(Data)
    // Encrypt data
    const encryptedData = await Encrypt(ReadyData, this.Key)
    return encryptedData
  }
}

// Export Node Common Functions
export const Node = {
  NodeEncrypt: nodeDecryption,
  API: {
    Get: GetFetch,
    Delete: DeleteFetch,
    Post: PostFetch,
    Put: PutFetch
  }
}
