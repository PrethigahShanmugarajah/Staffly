// Server / routes / payslipRoutes.js
import { Router } from "express";
import {
  createPayslip,
  getPayslipByID,
  getPayslips,
} from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);
payslipRouter.get("/", protect, getPayslips);
payslipRouter.get("/:id", protect, getPayslipByID);

export default payslipRouter;
