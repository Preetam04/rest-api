import type { Request, Response, NextFunction } from "express";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  res.send("res reached");
}
