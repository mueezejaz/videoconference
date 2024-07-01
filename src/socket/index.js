import { SocketEvents } from "./Socket.events.js";
import { routers } from "../libs/router.manager.js";
import { rooms } from "../libs/rooms.manager.js";
import { users } from "../libs/user.manager.js";
import { mediasoupConfig } from "../config/mediasoup/mediasoup.config.js";
import { transports } from "../libs/transports.manager.js";
const JoiningEvent = (socket) => {
  socket.on(SocketEvents.CreatRoom_EVENT, async (data, callback) => {
    try {
      let routerData;
      console.log(data);
      let existedUser = users.finduserById(data.userid);
      if (existedUser) {
        console.log("user already existed");
        // callback({
        //   success:false,
        //   message:"user allready existed"
        // })
        // return
      }
      // if(data.roomStatus === "creating"){
      routerData = await routers.getRouterRtpCapablity(null, data.roomStatus);
      console.log("router data ", routerData);
      // }
      users.creatNewUser(
        data.username,
        data.userid,
        socket.id,
        data.Roomid,
        routerData.routerId,
        true,
      );
      console.log(users);
      rooms.createRoom(data.Roomid, routerData.routerId);
      rooms.addNewUserToRoom(data.Roomid, data.userid);
      callback({
        success: true,
        message: "Room created successfully",
        routerRtpCapablity: routerData.routerRtpCapablity,
      });
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Failed to create room",
        error: error.message || error,
      });
    }
  });
};
const creatWebRtcTransportEvent = (socket) => {
  socket.on(SocketEvents.creatWebRtcTransport, async (data, callback) => {
    const user = users.finduserById(data.userid);
    const router = routers.getRouterWithId(user.routerId);
    const transport = await router.createWebRtcTransport(
      mediasoupConfig.webRtcTransportOptions,
    );
    transports.creatingWebrtcTransport("producer", transport, data.userid);
    callback({
      message: "transport is created",
    });
  });
};
const IntializingSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    JoiningEvent(socket);
    creatWebRtcTransportEvent(socket);
  });
};

export { IntializingSocket };
