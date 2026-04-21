import express from "express";
import chatController from "./chat.controller.js";
import Chat from "./chat.model.js";

const router = express.Router();

router.post("/send", chatController.sendMessage);
router.get("/:roomId", chatController.getChat);
router.get("/all", chatController.getAllChats);

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;

  const chats = await Chat.find({
    $or: [
      { sender: userId },
      { receiver: userId }
    ]
  })
    .sort({ createdAt: -1 })
    .populate("sender receiver", "_id fullName email").populate("receiver", "_id fullName email");
  res.json(chats);
});
export default router;