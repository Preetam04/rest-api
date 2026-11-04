import { taskSchema } from "../schema/task.schema";
import { AppError } from "../utils/app-error";

import * as TaskRepository from "../repositories/task.repository";
import { Status, type Task } from "../../generated/prisma/browser";

async function createTask(title: string, description: string, userId: string) {
  const data = { title, description };

  console.log(title, description);

  if (taskSchema.safeParse(data).error) {
    const message = taskSchema.safeParse(data).error?.message;
    // console.log(message);
    throw new AppError("Data not Valid", 400);
  }

  const task = await TaskRepository.createTask(title, description, userId);

  return task;
}

async function getAllTask(userId: string) {
  const allTask = await TaskRepository.getAllTask(userId);

  return allTask;
}

async function getTaskWithId(taskId: string, userId: string) {
  const task = await TaskRepository.getTaskWithId(taskId, userId);

  return task;
}

async function deleteTaskWithId(taskId: string, userId: string) {
  await TaskRepository.deleteTaskWithId(taskId, userId);

  return true;
}

async function updateTaskWithId(taskId: string, userId: string, data: Task) {
  console.log(data?.status);

  if (
    data?.status &&
    !["PENDING", "COMPLETED", "IN_PROGRESS"].includes(data?.status)
  ) {
    throw new AppError("Data format ot valid", 400);
  }

  const updatedTask = await TaskRepository.updateTask(taskId, userId, data);

  return updatedTask;
}

export {
  createTask,
  getAllTask,
  getTaskWithId,
  deleteTaskWithId,
  updateTaskWithId,
};
