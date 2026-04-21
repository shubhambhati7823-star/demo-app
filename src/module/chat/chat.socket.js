import { createMessage } from "./chat.service.js";
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
  const newMessage = await createMessage({
    sender: data.sender,     // 🔥 ADD THIS
    receiver: data.receiver,
    message: data.message,
    roomId: data.roomId
  });

  io.to(data.roomId).emit("receive_message", newMessage);
});

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
};

export default chatSocket;