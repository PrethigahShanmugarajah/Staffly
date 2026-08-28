// Server / routes / payslipRoutes.js
import { Router } from "express";
import { createPayslip } from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);

export default payslipRouter;
