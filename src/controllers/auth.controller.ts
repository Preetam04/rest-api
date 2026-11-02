import type { Request, Response, NextFunction } from "express";

import * as UserServices from "../services/user.service";
import { AppError } from "../utils/app-error";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;

    const user = await UserServices.createUser(username, email, password);

    // console.log(user);

    res.status(201).json({
      message: "User created successfully",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await UserServices.userExists(email, password);

    req.session.regenerate((err) => {
      if (err) {
        throw new AppError("Session Error", 500);
      }

      req.session.userId = user.id;
    });

    res.status(200).send({
      message: "User logged in Successfully",
      statusCode: 201,
      success: true,
    });
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
