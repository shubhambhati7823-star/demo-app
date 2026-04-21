import {createMessage,getMessages} from "./chat.service.js";

// controller
const sendMessage = async (req, res) => {
  try {
    const message = await createMessage(req.body, req.body.sender);
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChat = async (req, res) => {
  const { roomId } = req.params;
  const messages = await getMessages(roomId);
  res.json(messages);
};

const getAllChats = async (req, res) => {
  const chats = await Chat.find()
    .populate("sender receiver", "name email");

  res.json(chats);
};

export default {
  sendMessage,
  getChat,
  getAllChats,
};