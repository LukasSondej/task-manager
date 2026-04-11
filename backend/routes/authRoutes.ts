import { Router } from "express";
import { loginUser, logOutUser, refreshToken } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router()
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", verifyToken, logOutUser);
export default router