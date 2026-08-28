// Server / controllers / employeeController.js
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

/* -------- Get Employees -------- */
export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    const where = {};
    if (department) where.department = department;

    // const employees = (await Employee.find(where))
    //   .toSorted({ createdAt: -1 })
    //   .populate("userId", "email role")
    //   .lean();

    const employees = await Employee.find(where)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    return res.status(200).json({
      success: true,
      message:
        employees.length === 0
          ? "No employees found."
          : employees.length === 1
            ? "Employee retrieved successfully."
            : "Employees retrieved successfully.",
      result,
    });
  } catch (error) {
    console.error(
      "Get Employees Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving employees.",
      error: `Get Employees Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Create Employee -------- */
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    // if (!email || !password || !firstName || !lastName) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide all required employee fields.",
    //   });
    // }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password.",
      });
    }

    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a first name.",
      });
    }

    if (!lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a last name.",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide a phone number.",
      });
    }

    if (!position) {
      return res.status(400).json({
        success: false,
        message: "Please provide a position.",
      });
    }

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Please provide a department.",
      });
    }

    if (!joinDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide a join date.",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role: role || "EMPLOYEE",
    });

    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      bio: bio || "",
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
        error: "Create Employee Error: Email already exists",
      });
    }

    console.error(
      "Create Employee Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the employee.",
      error: `Create Employee Error: ${error?.stack || error?.message || error}`,
    });
  }
};
