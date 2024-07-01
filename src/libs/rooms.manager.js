import { users } from "./user.manager.js";
class RoomManager {
  constructor() {
    this.rooms = new Map();
  }
  createRoom(roomId, routerId) {
    this.rooms.set(`${roomId}`, { routerId, users: [] });
  }
  addNewUserToRoom(roomId, userId) {
    let room = this.rooms.get(roomId);
    if (room) {
      room.users.push(userId);
      this.rooms.set(roomId, room);
      console.log(room.users);
    } else {
      console.error(`Room with ID ${roomId} does not exist.`);
    }
  }
}

const rooms = new RoomManager();
export { rooms };
