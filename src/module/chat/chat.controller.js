import chatService from "./chat.service.js";

const sendMessage = async (req, res) => {
  try {
    const message = await chatService.createMessage(req.body);
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getChat = async (req, res) => {
  const { roomId } = req.params;
  const messages = await chatService.getMessages(roomId);
  res.json(messages);
};

export default {
  sendMessage,
  getChat
};