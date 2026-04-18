import chatService from "./chat.service.js";

const generateRoomId = (user1, user2) => {
  return [user1, user2].sort().join("_");
};

const chatSocket = (io) => {
  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);
    
    socket.on("join_room", ({ sender, receiver }) => {
      const roomId = generateRoomId(sender, receiver);
      socket.join(roomId);
    });

    socket.on("send_message", async (data) => {
      const roomId = generateRoomId(data.sender, data.receiver);

      const savedMessage = await chatService.createMessage({
        ...data,
        roomId
      });

      io.to(roomId).emit("receive_message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
};

export default chatSocket;