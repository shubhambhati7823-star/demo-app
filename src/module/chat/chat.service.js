import Chat from "./chat.model.js";

const createMessage = async (data, userId) => {
  return await Chat.create({
    ...data,
    sender: userId
  });
};

const getMessages = async (roomId) => {
  return await Chat.find({ roomId })
    .sort({ createdAt: 1 })
    .populate("sender receiver", "name email");
};
export default {
  createMessage,
  getMessages
};