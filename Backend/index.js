const express = require("express");
const app = express();

const cors = require("cors");

const http = require("http");
const { Socket } = require("socket.io");
const server = http.createServer(app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: { origin: "*" },
});

const port = 3001;

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("chat msg", (payload) => {
    // console.log("msg recieved: ", payload);
    io.emit("chat msg", payload);
  });

  socket.on("disconnect", () => {
    console.log("user got disconnected");
  });
});
server.listen(port, () => {
  console.log("listening on port: ", port);
});
