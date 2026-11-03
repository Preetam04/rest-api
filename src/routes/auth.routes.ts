import { Router } from "express";
import { me, signIn, signOut, signUp } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

router.use(authMiddleware);

router.route("/me").get(me);
router.route("/sign-out").post(signOut);

export default router;
