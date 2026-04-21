import Chat from "./chat.model.js";

export const createMessage = async (data) => {
  return await Chat.create(data);
};

export const getMessages = async (roomId) => {
  return await Chat.find({ roomId })
    .sort({ createdAt: 1 })
    .populate("sender receiver", "_id email");
};