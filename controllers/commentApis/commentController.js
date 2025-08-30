import Comment from "../../schemas/commentSchema.js";
import Post from "../../schemas/postSchema.js";

// Add a comment to a post
export const addComment = async (req, res) => {
  const { postId, content } = req.body;
  const user = req.user;

  if (!postId || !content) return res.status(400).json({ message: "Post ID and content required" });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = new Comment({ postId, userId: user._id, content });
    await newComment.save();

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments for a post
export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate("userId", "username email");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!comment) return res.status(404).json({ message: "Comment not found or unauthorized" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
