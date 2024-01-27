import util from "util"; // Node.js utility module
import { exec } from "node:child_process"; // Import exec from child_process
const executor = util.promisify(exec); // Promisify exec

/**
 * Executes a command and returns the output and error.
 * @param command - The command to execute.
 * @returns An object containing the output and error.
 */
export default async function executeCommand(command: string) {
  try {
    const { stdout, stderr } = await executor(command); // Execute Command
    return {
      output: stdout,
      error: stderr,
    };
  } catch (error) {
    console.error("Error executing command:", error);
    return {
      output: "",
      error: error,
    };
  }
}
