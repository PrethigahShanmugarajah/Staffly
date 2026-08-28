// Server / controllers / leaveApplicationController.js
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

/* -------- Create Leave -------- */
export const createLeave = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is deactivated. You cannot submit a leave application.",
      });
    }

    const { type, startDate, endDate, reason } = req.body;

    // if (!type || !startDate || !endDate || !reason) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide all required leave application fields.",
    //   });
    // }

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Please provide a leave type.",
      });
    }

    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide a leave start date.",
      });
    }

    if (!endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide a leave end date.",
      });
    }

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Please provide a reason for the leave.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(startDate) <= today || new Date(endDate) <= today) {
      return res.status(400).json({
        success: false,
        message: "Leave dates must be in the future.",
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date.",
      });
    }

    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: "PENDING",
    });

    return res.status(201).json({
      success: true,
      message: "Leave application submitted successfully.",
      data: leave,
    });
  } catch (error) {
    console.error(
      "Create Leave Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while submitting the leave application.",
      error: `Create Leave Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Leaves -------- */
export const getLeaves = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";

    if (isAdmin) {
      const status = req.query.status;
      const where = status ? { status } : {};
      const leaves = await LeaveApplication.find(where)
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const data = leaves.map((l) => {
        const obj = l.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });

      return res.status(200).json({
        success: true,
        message: "Leave applications retrieved successfully.",
        data,
      });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found.",
        });
      }

      const leaves = await LeaveApplication.find({
        employeeId: employee._id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "Leave applications retrieved successfully.",
        data: leaves,
        employee: { ...employee, id: employee._id.toString() },
      });
    }
  } catch (error) {
    console.error("Get Leaves Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving leave applications.",
      error: `Get Leaves Error: ${error?.stack || error?.message || error}`,
    });
  }
};
