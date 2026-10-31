import { prisma } from "../db/prisma";
import { AppError } from "../utils/app-error";

async function createUser(username: string, email: string, password: string) {
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new AppError("User already exists", 400);
  }

  const createdUser = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
    omit: {
      password: true,
    },
  });

  if (!createUser) {
    throw new AppError("Error creating a user", 400);
  }

  return createdUser;
}

export { createUser };
