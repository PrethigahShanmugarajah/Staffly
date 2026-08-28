// Server / routes / leaveApplicationRoutes.js
import { Router } from "express";
import {
  createLeave,
  getLeaves,
} from "../controllers/leaveApplicationController.js";
import { protect } from "../middleware/auth.js";

const leaveApplicationRouter = Router();

leaveApplicationRouter.post("/", protect, createLeave);
leaveApplicationRouter.get("/", protect, getLeaves);

export default leaveApplicationRouter;
