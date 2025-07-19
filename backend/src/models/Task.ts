import {
  ITask,
  TaskPriority,
  TaskStatus,
} from "./../interfaces/task.interface";
import { Schema, model } from "mongoose";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatus.todo,
    },
    priority: {
      type: String,
      enum: TaskPriority,
      default: TaskPriority.medium,
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);
export default Task;
