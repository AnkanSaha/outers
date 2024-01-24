import util from "util"; // Node.js utility module
import { exec } from "child_process"; // Import exec from child_process
const executor = util.promisify(exec); // Promisify exec

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
