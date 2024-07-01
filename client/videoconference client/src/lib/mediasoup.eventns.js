import * as mediasoup from "mediasoup-client";
import { useSocket } from "@/context/Socketconnectioncontext";
import { SocketEvents } from "@/socket/socket.events";
import useLocalhost from "@/Hooks/useLocalhost";
let device;
let sentTransport;
let recvTransport = new Map();
async function settingUpDevice(routerRtpCapabilities) {
  try {
    device = new mediasoup.Device();

    await device.load({ routerRtpCapabilities });
    // creatingSendtransport()
    return true;
  } catch (error) {
    if (error.name === "UnsupportedError") {
      console.warn("Browser not supported");
    } else {
      console.error("Error loading device:", error);
    }
    return false;
  }
}
function creatingSendtransport() {
  try {
    socket
      .timeout(5000)
      .emmit(
        SocketEvents.creatWebRtcTransport,
        { userid },
        async (err, responce) => {
          console.log(responce);
        },
      );
  } catch (error) {
    console.log("error in creating sent transport", error);
  }
}
export { settingUpDevice, device };
