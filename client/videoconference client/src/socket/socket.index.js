import { SocketEvents } from "./socket.events";
const gettingRouterRtpCapability = (socket, data) => {
  socket
    .timeout(5000)
    .emit(
      `${SocketEvents.CreatRoom_EVENT}`,
      { ...data },
      async (err, response) => {
        console.log(response);
        if (!response.success) {
          console.log("falid to recive router rtp capability");
          return;
        }
        return response.routerRtpCapablity;
        // let isDeviceCreated = await settingUpDevice(
        //   response.routerRtpCapablity,
        // );
        // console.log(isDeviceCreated);
        // if (isDeviceCreated) {
        //   navigate(`/Room/${values.Roomid}`);
        // } else {
        //   console.log("Faild to creat room");
        // }
      },
    );
};

export { gettingRouterRtpCapability };
