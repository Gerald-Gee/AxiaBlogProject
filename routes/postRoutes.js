// routes/postRoutes.js
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
} from "../controllers/postApis/postController.js";

const postRouter = Router();

// Create a new post
postRouter.post("/post/create", authMiddleware, createPost);

// Get all posts
postRouter.get("/posts", getAllPosts);

// Get a single post by ID
postRouter.get("/post/:id", getPostById);

// Update a post
postRouter.put("/post/update/:id", authMiddleware, editPost);

// Delete a post
postRouter.delete("/post/delete/:id", authMiddleware, deletePost);

export default postRouter;
