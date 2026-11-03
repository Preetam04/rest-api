import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import * as UserRepository from "../repositories/user.repository";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new AppError("Not Authenticated", 401);
    }

    const user = await UserRepository.getUserById(userId);

    if (!user) {
      return req.session.destroy(() => {
        res.clearCookie("sid");
        throw new AppError("Not Authenticated", 401);
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
