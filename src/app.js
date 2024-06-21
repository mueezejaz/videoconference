import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { createWorker } from "mediasoup";
import { routerManager } from "./libs/router.manager.js";
import ENVvariable from "./config/ENV.config.js";
import { IntializingSocket } from "./socket/index.js";
import workerManager from "./libs/worker.manager.js";
const app = express();
const server = createServer(app);
let workers;
let routers;
const io = new Server(server, {
  cors: {
    origin: ENVvariable.get("CORS_ORIGEN"),
    credentials: true,
  },
});
IntializingSocket(io);
app.get("/", (req, res) => {
  res.send("hello world");
});

export { server, workers, routers };
