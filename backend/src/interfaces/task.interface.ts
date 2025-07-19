import { Document, Types } from "mongoose";

export enum TaskStatus {
  todo = "todo",
  inprogress = "in-progress",
  completed = "completed",
}

export enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
}
