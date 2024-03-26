// this File is contain the waiting functions for code

/**
 * Waits for the specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 */
export const Ms = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Delays the execution of a function for a specified number of seconds.
 * @param Second - The number of seconds to delay the execution.
 * @returns A promise that resolves after the specified number of seconds.
 */
export const Seconds = (Second: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, Second * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of minutes.
 * @param Minute - The number of minutes to delay the execution.
 * @returns A promise that resolves after the specified number of minutes.
 */

export const Minutes = (minutes: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, minutes * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of hours.
 * @param Hour - The number of hours to delay the execution.
 * @returns A promise that resolves after the specified number of hours.
 */

export const Hours = (hours: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, hours * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of days.
 * @param Day - The number of days to delay the execution.
 * @returns A promise that resolves after the specified number of days.
 */

export const Days = (days: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, days * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of weeks.
 * @param Week - The number of weeks to delay the execution.
 * @returns A promise that resolves after the specified number of weeks.
 */

export const Weeks = (weeks: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, weeks * 7 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of months.
 * @param Month - The number of months to delay the execution.
 * @returns A promise that resolves after the specified number of months.
 */

export const Months = (months: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, months * 30 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of years.
 * @param Year - The number of years to delay the execution.
 * @returns A promise that resolves after the specified number of years.
 */

export const Years = (years: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, years * 365 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of decades.
 * @param Decade - The number of decades to delay the execution.
 * @returns A promise that resolves after the specified number of decades.
  */

 export const Decades = (decades: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, decades * 365 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of centuries.
 * @param Century - The number of centuries to delay the execution.
 * @returns A promise that resolves after the specified number of centuries.
 */

export const Centuries = (centuries: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, centuries * 365 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of millenia.
 * @param Millenia - The number of millenia to delay the execution.
 * @returns A promise that resolves after the specified number of millenia.
  */

 export const Millenia = (millenia: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millenia * 365 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of leap years.
 * @param LeapYear - The number of leap years to delay the execution.
 * @returns A promise that resolves after the specified number of leap years.
  */

 export const LeapYear = (leapYear: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, leapYear * 365 * 24 * 60 * 60 * 1000);
  });
};

/**
 * Delays the execution of a function for a specified number of gregorian years.
 * @param GregorianYear - The number of gregorian years to delay the execution.
 * @returns A promise that resolves after the specified number of gregorian years.
  */

 export const GregorianYear = (gregorianYear: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, gregorianYear * 365 * 24 * 60 * 60 * 1000);
  });
};