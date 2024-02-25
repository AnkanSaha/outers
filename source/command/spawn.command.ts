import { spawn, SpawnOptions, SpawnSyncReturns } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";

// Promisify the spawn function so that it can be used with other async functions.
const SpawnCommander = promisify(spawn);

// Import Interfaces
import { CommandResult } from "../Config/Interfaces/command/spawn.interface"; // Import CommandResult Interface

/**
 * Executes a command with the given arguments and options.
 * @param command - The command to execute.
 * @param args - The arguments to pass to the command.
 * @param options - The options for executing the command.
 * @returns A promise that resolves to the command result, containing the output and error.
 */
export default async function executeCommand(
  command: string,
  args: string[],
  options: SpawnOptions = {},
): Promise<CommandResult> {
  try {
    const isWindows = os.platform() === "win32"; // check for Windows or not supported
    const isShell = isWindows ? true : false; // check for Windows or not
    const { stdout, stderr } = (await SpawnCommander(command, args, {
      shell: isShell,
      ...options,
    })) as SpawnSyncReturns<Buffer>;
    return {
      output: stdout.toString(),
      error: stderr ? stderr.toString() : "",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error executing command:", errorMessage);
    return {
      output: "",
      error: errorMessage,
    };
  }
}
