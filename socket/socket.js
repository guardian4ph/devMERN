const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log("Socket running at port 8900");

io.on("connection", socket => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
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
