import { routers } from "./router.manager.js";
import { users } from "./user.manager.js";
class transportManager {
  constructor() {
    this.transports = new Map();
  }
  creatingWebrtcTransport(transportType, transport, userId) {
    this.transports.set(`${transport.id}`, transport, transportType);
    users.addNewTransport(transport.id, userId);
    console.log(this.transports);
  }
}
const transports = new transportManager();
export { transports };
