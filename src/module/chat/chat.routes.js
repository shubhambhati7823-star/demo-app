import express from "express";
import chatController from "./chat.controller.js";

const router = express.Router();

router.post("/send", chatController.sendMessage);
router.get("/:roomId", chatController.getChat);

export default router;