const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log("Socket running at port 8900");

io.on("connection", socket => {
  console.log("a user connected in the socket");
  console.log(socket.id);
  io.emit("welcome", "You are connected to the server");
});
