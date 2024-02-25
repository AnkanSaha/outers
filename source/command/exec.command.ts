import util from "node:util";
import { exec } from "node:child_process"; // Import exec from child_process

const executor = util.promisify(exec);

/**
 * Executes a command and returns the output and error.
 * It is only for short-lived processes. long-lived processes are not recommended for security reasons.
 * @param command - The command to execute.
 * @returns An object containing the output and error.
 */

export default async function executeCommand(command: string) {
  try {
    const { stdout, stderr } = await executor(command);
    return {
      output: stdout,
      error: stderr,
    };
  } catch (error) {
    console.error("Error executing command:", error);
    return {
      output: "",
      error: error, // Return error message instead of the error object
    };
  }
}
