import express from "express";
import {
  createTask,
  getTasks,
  getTasksById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

//  Protected routes
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTasksById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
