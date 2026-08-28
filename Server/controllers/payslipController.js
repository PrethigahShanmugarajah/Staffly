// Server / controllers / payslipController.js
import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

/* -------- Create Payslip -------- */
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;

    // if (!employeeId || !month || !year || !basicSalary) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide all required payslip fields.",
    //   });
    // }

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Please provide an employee ID.",
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Please provide a payslip month.",
      });
    }

    if (!year) {
      return res.status(400).json({
        success: false,
        message: "Please provide a payslip year.",
      });
    }

    if (
      basicSalary === undefined ||
      basicSalary === null ||
      Number(basicSalary) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid basic salary.",
      });
    }

    const netSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const payslip = await Payslip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    });

    return res.status(201).json({
      success: true,
      message: "Payslip created successfully.",
      data: payslip,
    });
  } catch (error) {
    console.error(
      "Create Payslip Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the payslip.",
      error: `Create Payslip Error: ${error?.stack || error?.message || error}`,
    });
  }
};
