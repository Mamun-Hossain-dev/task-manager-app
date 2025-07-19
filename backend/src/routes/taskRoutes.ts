import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskControllers";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

// All task routes are protected
router.use(authenticate, authorize);

// GET all tasks
router.get("/", getAllTasks);

// GET single task by ID
router.get("/:id", getSingleTask);

// POST new task
router.post("/", createTask);

// PUT update task (full update)
router.put("/:id", updateTask);

// PATCH update task status only
router.patch("/:id/status", updateTaskStatus);

// DELETE task
router.delete("/:id", deleteTask);

export default router;
