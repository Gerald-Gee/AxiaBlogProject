import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createUser,
  getAllUsers,
  getAUser,
  editUser,
  editProfile,
  deleteUser,
} from "../controllers/userApi/barrel.js";

const userRouter = Router();

// Create a new user
userRouter.post("/user/create", createUser);

// Get all users
userRouter.get("/users", authMiddleware, getAllUsers);

// Get a single user by ID
userRouter.get("/user/:id", getAUser);

// Update a user
userRouter.put("/user/update/:id", authMiddleware, editUser);

// Update profile
userRouter.put("/profile/update/:id", authMiddleware, editProfile);

// Delete a user
userRouter.delete("/user/delete/:id", authMiddleware, deleteUser);

export default userRouter;
