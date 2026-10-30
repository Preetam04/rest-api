import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unexpected error
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
