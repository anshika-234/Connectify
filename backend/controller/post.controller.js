import Post from "./../model/post.model.js";
import Comment from "./../model/comment.model.js";
import User from "./../model/user.model.js";
/* =========================
   CREATE POST
========================= */

const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { body } = req.body;

    const newPost = await Post.create({
      userId,
      body,
      media: req.file ? req.file.filename : "",
      fileType: req.file ? req.file.mimetype.split("/")[0] : "",
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL POSTS
========================= */

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userId", "username name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ONE POST
========================= */

const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("userId");
    if (!post) {
      res.status(404).json({ message: "Post doesn't found.." });
    }
    res.status(200).json({
      message: "This is your post..",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* =========================
   MY POST
========================= */
const myPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const userPosts = await Post.find({ userId }).populate(
      "userId",
      "username name profilePicture",
    );
    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: "No post found.." });
    }
    res.status(200).json({
      message: "These are my posts.",
      userPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE POST
========================= */

const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   CREATE COMMENT
========================= */

const createComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ message: "Comment body required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      userId,
      postId,
      body,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL COMMENTS OF A POST
========================= */

const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .populate("userId", "username name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE COMMENT
========================= */

const deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
    LIKE POST
========================= */

const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const isLiked = await post.likedBy?.includes(userId);
    if (isLiked) {
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likedBy: userId },
        $inc: { likes: -1 },
      });
      res.status(200).json({ message: "You unliked..", like: false });
    } else {
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { likedBy: userId },
        $inc: { likes: 1 },
      });
      res.status(200).json({ message: "You liked..", like: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  createComment,
  getAllComments,
  deleteComment,
  myPosts,
  likePost,
};
