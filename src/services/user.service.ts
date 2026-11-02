import userSchema from "../schema/user.schema";
import { AppError } from "../utils/app-error";
import bcrypt from "bcrypt";

import * as UserRepository from "../repositories/user.repository";

async function createUser(username: string, email: string, password: string) {
  const data = { username, email, password };
  if (userSchema.safeParse(data).error) {
    const message = userSchema.safeParse(data).error?.message;
    // console.log(message);
    throw new AppError("Invalid Sign Up data", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await UserRepository.createUser(username, email, hashedPassword);

  return user;
}

async function userExists(email: string, password: string) {
  const data = { email, password, username: "" };

  if (userSchema.safeParse(data).error) {
    const message = userSchema.safeParse(data).error?.message;
    console.log(message);
    throw new AppError("Data not valid", 400);
  }

  const user = await UserRepository.findUser(email);

  const userValid = user && (await bcrypt.compare(password, user.password));

  if (!userValid) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
}

export { createUser, userExists };
