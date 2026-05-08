import express from "express";
import tokenVerify from "../middleware/middleware.js";
import chatController from "../controller/chat.controller.js";
const router = express.Router();

router
  .route("/message/send/:receiverId")
  .post(tokenVerify, chatController.sendChat);

router.route("/message/:roomId").get(tokenVerify, chatController.getChats);

router
  .route("/conversations")
  .get(tokenVerify, chatController.getConversations);
// make sure protect middleware is whatever you use for auth

export default router;
