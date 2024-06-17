import * as mediasoup from "mediasoup";
import { mediasoupConfig } from "../config/mediasoup/mediasoup.config.js";
import ENVvariable from "../config/ENV.config.js";
import os from "os";
import { pid } from "process";
let workerpid = [];
class WorkerManager {
  constructor() {
    this.workers = new Map();
  }

  async createWorker() {
    try {
      const worker = await mediasoup.createWorker(mediasoupConfig.worker);
      worker.on("died", () => {
        console.error("Worker died. Closing server in 3 seconds.");
        setTimeout(() => {
          process.exit(1);
        }, 3000);
      });
      this.workers.set(`${worker.pid}`, { worker });
      workerpid.push(worker.pid);
      console.log("Worker created.");
    } catch (error) {
      console.error("Error creating worker:", error);
    }
  }

  async createWorkersForEachCore() {
    try {
      const numCores = os.cpus().length;
      const numWorkers =
        ENVvariable.get("ENV") === "development" ? 3 : numCores;

      for (let i = 0; i < numWorkers; i++) {
        await this.createWorker();
      }
      console.log(`Created ${numWorkers} Mediasoup workers.`);
    } catch (error) {
      console.error("Error creating workers:", error);
    }
  }
}

export default WorkerManager;
