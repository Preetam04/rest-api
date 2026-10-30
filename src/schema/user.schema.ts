import * as z from "zod";

const username = z.string();
const password = z
  .string()
  .min(8, "password must be atleast 8 characters")
  .max(12, "password must be atmost 12 characters");

const userSchema = z.object({
  username,
  password,
  email: z.email(),
});

export default userSchema;
