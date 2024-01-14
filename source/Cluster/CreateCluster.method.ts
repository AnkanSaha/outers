// main code for creating a cluster in node js
import { cpus, platform, arch, freemem } from "node:os"; // Import os module
import { Express } from "express"; // Import express module
import ClusterConfig from "node:cluster"; // Import Cluster module
const { isPrimary } = ClusterConfig; // Import isPrimary from Cluster
import { Console } from "../outer"; // Import Console module

// Main Function
export default function Config(
  ExpressServer: Express,
  PORT: 3000,
  NumberOfWorkers = cpus().length
) {

  // Check if User Provided Express Server or not
  if(!ExpressServer) {
    throw new Error("Express Server is not provided");
  }

  // Number of Workers to be forked
  let ProcessCopy: number = NumberOfWorkers; // Copy Number of Workers

  if (isPrimary) {
    // If the cluster is the primary node
    // Print CPU Count
    Console.bright(
      `${platform()} ${arch()} server : ${(
        freemem() /
        1024 /
        1024 /
        1024
      ).toFixed(2)} GB Free Ram : ${cpus()[0].model}`
    );

    // Create a worker according to the number that is specified
    while (ProcessCopy > 0) {
      ClusterConfig.fork();
      ProcessCopy--;
    }

    // Listen for Cluster Online
    ClusterConfig.on("online", (worker) => {
      Console.green(`🚀 Worker ${worker.process.pid} started 🚀`);
      Console.blue(
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
      );
      Console.yellow(`Worker ${worker.process.pid} is listening`);
    });

    // Listen for Cluster Exit
    ClusterConfig.on("exit", (worker) => {
      Console.red(`Worker ${worker.process.pid} died`);
      ClusterConfig.fork();
      Console.green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
      Console.blue(
        `Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`
      );
      Console.yellow(`Worker ${worker.process.pid} is listening`);
    });
  } else {
    // Server Listen
    try {
      ExpressServer.listen(PORT, async () => {
        Console.green(
          `🚀 Server is listening on Port ${PORT} 🚀`
        ); // Print Message for Server Start
      }); // Start Server on Port
    } catch (error) {
      Console.red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
    }
  }
}
