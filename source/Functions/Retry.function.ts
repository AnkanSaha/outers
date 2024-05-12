/**
 * Executes a given function repeatedly at a specified interval.
 * @param Function The function to be executed.
 * @param ms The interval in milliseconds at which the function should be executed.
 * @param firstEffect Determines whether the function should be executed immediately or not.
 * @returns A function that can be used to clear the interval when needed.
 */
export const Ms = async (Function: () => Promise<void>, ms: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, ms);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};


/**
 * Executes a given function repeatedly at a specified interval.
 * 
 * @param Function - The function to be executed.
 * @param Seconds - The interval in seconds at which the function should be executed.
 * @param firstEffect - A boolean indicating whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Seconds = async (Function: () => Promise<void>, Seconds: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Seconds * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};


/**
 * Executes a given function repeatedly at a specified interval.
 * 
 * @param Function - The function to be executed.
 * @param Minutes - The interval in minutes at which the function should be executed.
 * @param firstEffect - A boolean indicating whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval when needed.
 */
export const Minutes = async (Function: () => Promise<void>, Minutes: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Minutes * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a given function at regular intervals.
 * @param Function - The function to be executed.
 * @param Hours - The interval duration in hours.
 * @param firstEffect - Determines whether to execute the function immediately or not.
 * @returns A function that can be used to clear the interval.
 */
export const Hours = async (Function: () => Promise<void>, Hours: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Hours * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a function repeatedly at a specified interval, with an optional initial execution.
 * @param Function - The function to be executed.
 * @param Days - The number of days between each execution of the function.
 * @param firstEffect - Determines whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Days = async (Function: () => Promise<void>, Days: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Days * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a function repeatedly at a specified interval for a given number of weeks.
 * @param Function - The function to be executed.
 * @param Weeks - The number of weeks to repeat the function execution.
 * @param firstEffect - A boolean indicating whether to execute the function immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Weeks = async (Function: () => Promise<void>, Weeks: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Weeks * 7 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a function at regular intervals for a specified number of months.
 * @param Function - The function to be executed.
 * @param Months - The number of months between each execution of the function.
 * @param firstEffect - Determines whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Months = async (Function: () => Promise<void>, Months: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Months * 30 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a function periodically at specified intervals.
 * @param Function - The function to be executed.
 * @param Years - The number of years between each execution of the function.
 * @param firstEffect - A boolean indicating whether to execute the function immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Years = async (Function: () => Promise<void>, Years: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Years * 365 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a function repeatedly at a specified interval for a given number of decades.
 * @param Function - The function to be executed.
 * @param Decades - The number of decades to execute the function for.
 * @param firstEffect - A boolean indicating whether to execute the function immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Decades = async (Function: () => Promise<void>, Decades: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Decades * 10 * 365 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a given function periodically at specified intervals.
 * @param Function - The function to be executed.
 * @param Centuries - The number of centuries between each execution.
 * @param firstEffect - Determines whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Centuries = async (Function: () => Promise<void>, Centuries: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Centuries * 100 * 365 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};

/**
 * Executes a given function repeatedly at a specified interval.
 * @param Function - The function to be executed.
 * @param Millenia - The interval in milliseconds at which the function should be executed.
 * @param firstEffect - A boolean indicating whether the function should be executed immediately.
 * @returns A function that can be used to clear the interval.
 */
export const Millenia = async (Function: () => Promise<void>, Millenia: number, firstEffect: boolean) => {
    const executeFunction = async () => {
        try {
            await Function();
        } catch (error) {
            console.error("Error occurred during function execution:", error);
        }
    };

    if (firstEffect === true) {
        await executeFunction();
    }

    const intervalId: NodeJS.Timeout = setInterval(executeFunction, Millenia * 1000 * 365 * 24 * 60 * 60 * 1000);

    // Returning a function to clear the interval when needed
    return () => clearInterval(intervalId);
};