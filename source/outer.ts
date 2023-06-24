// global types
type globe = string | number | boolean | object | null | undefined | symbol | bigint

// function for green
export function green (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[32m', payload)
  })
  return Payload
}; // end of green

// function for yellow
export function yellow (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[33m', payload)
  })
  return Payload
}; // end of yellow

// function for red
export function red (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[31m', payload)
  })
  return Payload
}; // end of red

// function for blue
export function blue (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[34m', payload)
  })
  return Payload
}; // end of blue

// function for magenta
export function magenta (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[35m', payload)
  })
  return Payload
}; // end of magenta

// function for cyan
export function cyan (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[36m', payload)
  })
  return Payload
}; // end of cyan

// function for gray
export function gray (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[90m', payload)
  })
  return Payload
}; // end of gray

// function for dimmed
export function dimmed (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[2m', payload)
  })
  return Payload
}; // end of dimmed

// function for bright
export function bright (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[1m', payload)
  })
  return Payload
}; // end of bright

// function for underscore
export function underscore (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[4m', payload)
  })
  return Payload
}; // end of Underscore

export function reverse (...Payload: globe[]): globe {
  Payload.forEach((payload: globe) => {
    console.log('\x1b[7m', payload)
  })
  return Payload
}; // end of Underscore
