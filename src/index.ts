import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const route = "/api/v1";

app.use(`${route}/auth`, authRouter);
app.use(`${route}/task`, taskRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("server Starting at port 8000");
});
