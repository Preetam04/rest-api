import type { NextFunction, Request, Response } from "express";
import * as TaskService from "../services/task.service";
import type { Task } from "../../generated/prisma/client";

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { title, description } = req.body;

    const userId = req.session.userId;

    const task = await TaskService.createTask(title, description, userId || "");

    res.status(201).json({
      message: "Task created successfully",
      taskId: task.id,
      success: true,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}
export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: taskId } = req.params;

    const userId = req.session.userId || "";

    const task = await TaskService.getTaskWithId(taskId as string, userId);

    res.status(200).json({
      message: "Task fetched successfully",
      task: task,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.session.userId || "";

    const allTask = await TaskService.getAllTask(userId);

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: allTask,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id: taskId } = req.params;

    const userId = req.session.userId || "";

    const data: Task = req.body;

    const task = await TaskService.updateTaskWithId(
      taskId as string,
      userId,
      data,
    );

    res.status(200).json({
      message: "Tasks updated successfully",
      task,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id: taskId } = req.params;

    const userId = req.session.userId || "";

    await TaskService.deleteTaskWithId(taskId as string, userId);

    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
