// Server / controllers / employeeController.js
import Employee from "../models/Employee.js";

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
