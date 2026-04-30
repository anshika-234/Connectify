import express from "express";
const router = express.Router();
import tokenVerify from "./../middleware/middleware.js";
import commentController from "../controller/comment.controller.js";

router
  .route("/create-comment/:postId")
  .post(tokenVerify, commentController.postComment);

router
  .route("/all-comments/:postId")
  .get(tokenVerify, commentController.getAllComment);

router
  .route("/delete-comment/:postId")
  .get(tokenVerify, commentController.deleteComment);

export default router;
