import { users } from "./user.manager.js";
class RoomManager {
  constructor() {
    this.rooms = new Map();
  }
  createRoom(roomId, userId, routerId) {
    users.push(userId);
    this.rooms.set(`${roomId}`, { routerId, users });
  }
}

const rooms = new RoomManager();
export { rooms };
