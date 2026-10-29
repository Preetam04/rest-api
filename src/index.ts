import express from "express";

// routes
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

const route = "/api/v1";

app.use(route, authRoutes);

app.listen(process.env.PORT, () => {
  console.log("server Starting at port 8000");
});
