import Comment from "./../model/comment.model.js";

const postComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;

    if (!postId) {
      return res.status(404).json({ message: "Post not found.." });
    }
    const comments = await Comment.create({
      postId: postId,
      userId: userId,
      body: req.body.body,
    });
    res.status(201).json({
      message: "You created comment..",
      comments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate("userId");

    res.status(200).json({
      message: "These are your comments..",
      comments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const comment = await Comment.findOne({ userId, postId });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() === userId.toString()) {
      const deleteComment = await Comment.findOneAndDelete({
        _id: comment._id,
      });
      console.log(deleteComment);
    }
    res.status(200).json({ message: "You deleted comment Successfully.." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default {
  postComment,
  getAllComment,
  deleteComment,
};
