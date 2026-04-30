import express from "express";
import tokenVerify from "../middleware/middleware.js";
import chatController from "../controller/chat.controller.js";
const router = express.Router();

router
  .route("/message/send/:receiverId")
  .post(tokenVerify, chatController.sendChat);

router.route("/message/:roomId").get(tokenVerify, chatController.getChats);

export default router;
