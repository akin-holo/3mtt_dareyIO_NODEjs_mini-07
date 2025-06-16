const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
   console.log("User connected: ", socket.id);

   socket.on("chat message", (data) => {
      io.emit("chat message", {
         username: data.username,
         message: data.message
      });
   });

   socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
   });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});