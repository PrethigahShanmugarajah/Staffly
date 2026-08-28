// Server / routes / leaveApplicationRoutes.js
import { Router } from "express";
import { createLeave } from "../controllers/leaveApplicationController.js";
import { protect } from "../middleware/auth.js";

const leaveApplicationRouter = Router();

leaveApplicationRouter.post("/", protect, createLeave);

export default leaveApplicationRouter;
