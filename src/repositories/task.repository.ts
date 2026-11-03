import type { Task } from "../../generated/prisma/browser";
import { prisma } from "../db/prisma";
import { AppError } from "../utils/app-error";

export async function createTask(
  title: string,
  description: string,
  userId: string,
) {
  try {
    const task = prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId,
      },
    });

    if (!task) {
      throw new AppError("Error creating Task", 400);
    }

    return task;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
}
export async function getAllTask(userId: string) {
  const allTask = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  return allTask;
}

export async function getTaskWithId(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError(`Task not found`, 404);
  }

  return task;
}
export async function deleteTaskWithId(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError(`Task not found`, 404);
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return true;
}
export async function updateTask(taskId: string, userId: string, data: Task) {
  const { id, title, status, description } = data;

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError(`Task not found`, 404);
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      title,
      description,
      status,
    },
  });

  if (!updatedTask) {
    throw new AppError("Error updating Task", 404);
  }

  return updateTask;
}
