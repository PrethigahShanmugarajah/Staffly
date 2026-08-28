// Server / routes / attendanceRoutes.js
import { Router } from "express";
import { clockInOut } from "../controllers/attendanceController.js";
import { protect } from "../middleware/auth.js";

const attendanceRouter = Router();

attendanceRouter.post("/", protect, clockInOut);

export default attendanceRouter;
