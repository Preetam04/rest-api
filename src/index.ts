import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

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

app.use(
  session({
    name: "sid", // cookie name
    secret: process.env.SESSION_SECRET || "change-me-in-production",
    resave: false, // don't save unchanged sessions
    saveUninitialized: false, // don't create sessions for anonymous visitors
    cookie: {
      httpOnly: true, // JS in the browser can't read it (blocks XSS theft)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax", // basic CSRF protection
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

const route = "/api/v1";

app.use(`${route}/auth`, authRouter);
app.use(`${route}/task`, taskRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("server Starting at port 8000");
});
