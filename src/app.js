import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import ENVvariable from "./config/ENV.config.js";
import { IntializingSocket } from "./socket/index.js";

const app = express();
const server = createServer(app);
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
