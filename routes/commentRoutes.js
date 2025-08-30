// routes/commentRoutes.js
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentApis/commentController.js";

const commentRouter = Router();

// Add a comment to a post
commentRouter.post("/comment/add", authMiddleware, addComment);

// Get all comments for a post
commentRouter.get("/comment/:postId", getCommentsByPost);

// Delete a comment
commentRouter.delete("/comment/delete/:id", authMiddleware, deleteComment);

export default commentRouter;
