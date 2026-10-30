import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.route("/create-task").post(createTask);
router.route("/get-task").get(getAllTask);
router.route("/get-task/:id").get(getTask);
router.route("/update-task/:id").patch(updateTask);
router.route("/delete-task/:id").delete(deleteTask);

export default router;
