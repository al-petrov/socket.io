const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8087;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("sendToClient", { hello: "world" });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("receivedFromClient", function (data) {
    console.log(data);
  });
});

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
