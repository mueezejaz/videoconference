import * as mediasoup from "mediasoup";
import { mediasoupConfig } from "../config/mediasoup/mediasoup.config.js";
import { routerManager } from "./router.manager.js";
import ENVvariable from "../config/ENV.config.js";
import { execSync } from "child_process";
import os from "os";
import fs from "fs";

let routers;

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
      console.log(`Worker created ${worker.pid}`);
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
      await this.updateCpuResourceUsage();
      console.log(`Created ${numWorkers} Mediasoup workers.`);
      /// creating router
      routers = new routerManager();
      routers.makingRouter();
    } catch (error) {
      console.error("Error creating workers:", error);
    }
  }

  getWorkerCpuCore(pid) {
    try {
      const command = `ps -o psr= -p ${pid}`;
      const result = execSync(command).toString().trim();
      return parseInt(result, 10);
    } catch (error) {
      console.error(`Failed to get CPU core for PID ${pid}:`, error);
      return null;
    }
  }

  getCpuCoreUsage() {
    const cores = {};
    const lines = fs.readFileSync("/proc/stat", "utf8").split("\n");
    lines.forEach((line) => {
      if (line.startsWith("cpu")) {
        const parts = line.split(/\s+/);
        const core = parts[0];
        if (core !== "cpu") {
          const user = parseInt(parts[1], 10);
          const nice = parseInt(parts[2], 10);
          const system = parseInt(parts[3], 10);
          const idle = parseInt(parts[4], 10);
          const iowait = parseInt(parts[5], 10);
          const irq = parseInt(parts[6], 10);
          const softirq = parseInt(parts[7], 10);
          const steal = parseInt(parts[8], 10);

          const total =
            user + nice + system + idle + iowait + irq + softirq + steal;
          const active = total - idle;

          cores[core] = { total, active };
        }
      }
    });
    return cores;
  }

  async calculateCoreUsage() {
    const startUsage = this.getCpuCoreUsage();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const endUsage = this.getCpuCoreUsage();

    const usage = {};
    for (const core in startUsage) {
      const start = startUsage[core];
      const end = endUsage[core];

      const totalDiff = end.total - start.total;
      const activeDiff = end.active - start.active;

      const usagePercentage = (activeDiff / totalDiff) * 100;
      usage[core] = usagePercentage;
    }

    return usage;
  }

  async updateCpuResourceUsage() {
    const coreUsages = await this.calculateCoreUsage();
    for (const [pid, { worker, resourceUsage }] of this.workers) {
      const core = this.getWorkerCpuCore(pid);
      const coreUsage = coreUsages[`cpu${core}`];
      this.workers.set(`${pid}`, {
        worker,
        resourceUsage: {
          ...resourceUsage,
          cpu: { cpuid: core, cpuUsage: coreUsage },
        },
      });
      console.log(
        `Worker PID ${pid} is using CPU core ${coreUsage} % core number ${core}`,
      );
    }
  }
  getWorkerWithLowestUsage() {
    let lowestUsage = null;
    for (const [pid, { worker, resourceUsage }] of this.workers) {
      if (!lowestUsage) {
        lowestUsage = this.workers.get(`${pid}`);
        continue;
      }
      if (lowestUsage.resourceUsage.cpu.cpuUsage > resourceUsage.cpu.cpuUsage) {
        lowestUsage = this.workers.get(`${pid}`);
      }
    }
    // console.log(lowestUsage)
    return { worker: lowestUsage.worker };
  }
}

export default WorkerManager;
