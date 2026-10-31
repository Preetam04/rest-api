import type { Request, Response, NextFunction } from "express";

import * as UserServices from "../services/user.service";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;

    const user = await UserServices.createUser(username, email, password);

    console.log(user);

    res.status(201).json({
      message: "User created successfully",
      statusCode: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}
