import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { createWorker } from "mediasoup";
import ENVvariable from "./config/ENV.config.js";
import { IntializingSocket } from "./socket/index.js";

const app = express();

function creatingworker() {
  const worker = createWorker({
    logLevel: "warn",
  });
  if (worker) {
    console.log("worker is created");
  }
}
const server = createServer(app);
creatingworker();
const io = new Server(server, {
  cors: {
    origin: ENVvariable.get("CORS_ORIGEN"),
    credentials: true,
  },
});
console.log(ENVvariable.get("CORS_ORIGEN"));
IntializingSocket(io);
app.get("/", (req, res) => {
  res.send("hello world");
});

export { server };
