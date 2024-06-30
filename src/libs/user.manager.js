class userManager {
  constructor() {
    this.users = new Map();
  }
  creatNewUser(userName, userId, socketId, roomId, routerId, isAdmin) {
    this.users.set(`${userId}`, {
      userName,
      socketId,
      roomId,
      routerId,
      isAdmin,
      transports: [],
    });
  }
  finduserById(userid) {
    let user = this.users.get(`${userid}`);
    if (!user) {
      console.log("user not found");
    }
    return user;
  }
  addNewTransport(transportId, userId) {
    const user = this.finduserById(userId);
    user.transports = [...user.transports, transportId];
    this.users.set(`${userId}`, user);
    console.log(this.users);
  }
}

const users = new userManager();
export { users };
