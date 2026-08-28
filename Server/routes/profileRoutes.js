// Server / routes / profileRoutes.js
import { Router } from "express";
import { getProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";

const profileRouter = Router();

profileRouter.get("/", protect, getProfile);

export default profileRouter;
