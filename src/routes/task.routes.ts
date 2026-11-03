import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.route("/create").post(createTask);
router.route("/get").get(getAllTask);
router.route("/get/:id").get(getTask);
router.route("/update/:id").patch(updateTask);
router.route("/delete/:id").delete(deleteTask);

export default router;
