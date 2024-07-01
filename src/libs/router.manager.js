import * as mediasoup from "mediasoup";
import { workers } from "../index.js";
import { mediasoupConfig } from "../config/mediasoup/mediasoup.config.js";
class routerManager {
  constructor() {
    this.routers = new Map();
  }
  async makingRouter() {
    const { worker } = workers.getWorkerWithLowestUsage();
    // console.log(worker)
    const router = await worker.createRouter(
      mediasoupConfig.mediaCodecForRouter,
    );
    this.routers.set(`${router.id}`, {
      router,
      worker: { workerId: worker.pid },
    });
    return { routerId: router.id, routerRtpCapablity: router.rtpCapabilities };
  }
  getRouterWithId(routerId) {
    let router = this.routers.get(`${routerId}`);
    if (!router) {
      console.error("router not found with id", routerId);
    }
    console.log(router);
    return router.router;
  }
  async getRouterRtpCapablity(routerId, roomStatus) {
    if (roomStatus === "creating") {
      let router = await this.makingRouter();
      return { ...router };
    } else {
      let router = this.getRouterWithId(routerId);
      return {
        routerId: router.id,
        routerRtpCapablity: router.rtpCapabilities,
      };
    }
  }
}

let routers = new routerManager();

export { routers };
