const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log("Socket running at port 8900");

// Socket io declarations

io.on("connection", socket => {
  socket.emit("me", socket.id);
  console.log("a user connected in the socket");
  console.log(socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
    console.log("a user DISconnected in the socket");
    console.log(socket.id);
  });

  socket.on("callUser", data => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", data => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
