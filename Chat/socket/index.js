const { Server } = require("socket.io");
const io = new Server({ cors: { origin: "http://localhost:8001" } });
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    console.log("Online users:", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId);
  console.log(user)
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId:message.senderId,
        isRead:false,
        date: new Date()
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected:", socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000, () => {
  console.log("Socket server running on port 3000");
});
