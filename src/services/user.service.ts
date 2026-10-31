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

export { createUser };
