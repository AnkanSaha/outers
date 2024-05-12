/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Executes the provided function after a specified delay.
 * @param func The function to be executed.
 * @param ms The delay in milliseconds.
 * @returns A promise that resolves after the delay and the function execution.
 */
export const Ms = async (func: () => any, ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      await func();
      resolve();
    }, ms);
  });
};

/**
 * Delays the execution of a function by a specified number of seconds.
 * @param func - The function to be executed after the delay.
 * @param seconds - The number of seconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Seconds = (func: () => any, seconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      await func();
      resolve();
    }, seconds * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of minutes.
 * @param func - The function to be executed after the delay.
 * @param minutes - The number of minutes to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Minutes = (func: () => any, minutes: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      minutes * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of hours.
 * @param func - The function to be executed after the delay.
 * @param hours - The number of hours to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Hours = (func: () => any, hours: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      hours * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of days.
 * @param func - The function to be executed after the delay.
 * @param days - The number of days to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Days = (func: () => any, days: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      days * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of weeks.
 * @param func - The function to be executed after the delay.
 * @param weeks - The number of weeks to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Weeks = (func: () => any, weeks: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      weeks * 7 * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of months.
 * @param func - The function to be executed after the delay.
 * @param months - The number of months to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Months = (func: () => any, months: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      months * 30 * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of years.
 * @param func - The function to be executed after the delay.
 * @param years - The number of years to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Years = (func: () => any, years: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      years * 365 * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of decades.
 * @param func - The function to be executed after the delay.
 * @param decades - The number of decades to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Decades = (func: () => any, decades: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      decades * 10 * 365 * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of centuries.
 * @param func - The function to be executed after the delay.
 * @param centuries - The number of centuries to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Centuries = (func: () => any, centuries: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      centuries * 100 * 365 * 24 * 60 * 60 * 1000,
    );
  });
};

/**
 * Delays the execution of a function for a specified number of millenia.
 * @param func - The function to be executed after the delay.
 * @param millenia - The number of millenia to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const Millenia = (func: () => any, millenia: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(
      async () => {
        await func();
        resolve();
      },
      millenia * 1000 * 365 * 24 * 60 * 60 * 1000,
    );
  });
};
