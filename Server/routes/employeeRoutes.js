// Server / routes / employeeRoutes.js
import { Router } from "express";
import { getEmployees } from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const employeesRouter = Router();

employeesRouter.get("/", protect, protectAdmin, getEmployees);

export default employeesRouter;
