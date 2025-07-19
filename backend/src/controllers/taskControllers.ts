import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Task from "../models/Task";
import { TaskStatus } from "../interfaces/task.interface";
import "../../types/express";

// create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    // const user = req.user as unknown as { id: string };
    const task = new Task({
      ...req.body,
      userId: req.user?.id,
    });
    await task.save();
    res.status(StatusCodes.CREATED).json({ success: true, task });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.user?.id }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json({ success: true, tasks });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Task not found" });
    }
    res.status(StatusCodes.OK).json({ success: true, task });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Invalid updates!" });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Task not found" });
    }

    res.status(StatusCodes.OK).json({ success: true, task });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

// Toggle Task Status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Task not found" });
    }

    const statuses: TaskStatus[] = [
      TaskStatus.todo,
      TaskStatus.inprogress,
      TaskStatus.completed,
    ];

    const currentIndex = statuses.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    task.status = statuses[nextIndex];

    await task.save();

    res.status(StatusCodes.OK).json({ success: true, task });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
