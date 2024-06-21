import * as mediasoup from "mediasoup";
import { workers } from "../index.js";
import { mediasoupConfig } from "../config/mediasoup/mediasoup.config.js";
class routerManager {
  constructor() {
    this.routers = new Map();
  }
  makingRouter() {
    const { worker } = workers.getWorkerWithLowestUsage();
    console.log(worker);
  }
}
export { routerManager };
