// Server / routes / authRoutes.js
import { Router } from "express";
import { login, session } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/session", protect, session);

export default authRouter;
