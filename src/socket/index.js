import { SocketEvents } from "./Socket.events.js";

const JoiningEvent = (socket) => {
  socket.on(SocketEvents.CONNECTED_EVENT, (id, callback) => {
    console.log(id);
    callback({
      status: "ok",
    });
  });
};

const IntializingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    JoiningEvent(socket);
  });
};

export { IntializingSocket };
