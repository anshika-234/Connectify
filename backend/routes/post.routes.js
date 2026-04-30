import express from "express";
import multer from "multer";
import postController from "./../controller/post.controller.js";
import tokenVerify from "./../middleware/middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage,
});
router
  .route("/post")
  .post(tokenVerify, upload.single("media"), postController.createPost);
router.route("/get_single_post/:id").get(postController.getSinglePost);

router.route("/get_all_post").get(postController.getAllPosts);

router.route("/get_my_posts").get(tokenVerify, postController.myPosts);
router
  .route("/delete_post/:postId")
  .post(tokenVerify, postController.deletePost);

router
  .route("/comment/:postId")
  .post(tokenVerify, postController.createComment);

router
  .route("/all_comments/:postId")
  .get(tokenVerify, postController.getAllComments);

router
  .route("/delete_comment/:commentId")
  .post(tokenVerify, postController.deleteComment);

router.route("/like_post/:postId").post(tokenVerify, postController.likePost);

export default router;
