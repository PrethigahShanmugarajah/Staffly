// Server / controllers / attendanceController.js
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";

/* -------- Clock in/out for Employee -------- */
export const clockInOut = async (req, res) => {
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
        message: "Your account is deactivated. You cannot clock in/out.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    const now = new Date();

    if (!existing) {
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: today,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT",
      });

      return res.status(200).json({
        success: true,
        message: "Employee checked in successfully.",
        type: "CHECK_IN",
        data: attendance,
      });
    } else if (!existing.checkOut) {
      const checkInTime = new Date(existing.checkIn).getTime();
      const diffMs = now.getTime() - checkInTime;
      const diffHours = diffMs / (1000 * 60 * 60);

      existing.checkOut = now;

      /* -------- Compute Working Hours and Day Type -------- */
      const workingHours = parseFloat(diffHours.toFixed(2));

      let dayType = "Half Day";

      if (workingHours >= 8) {
        dayType = "Full Day";
      } else if (workingHours >= 6) {
        dayType = "Three Quarter Day";
      } else if (workingHours >= 4) {
        dayType = "Half Day";
      } else {
        dayType = "Short Day";
      }

      existing.workingHours = workingHours;
      existing.dayType = dayType;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Employee checked out successfully.",
        type: "CHECK_OUT",
        data: existing,
      });
    }

    return res.status(400).json({
      success: false,
      message: "You have already checked out for today.",
    });
  } catch (error) {
    console.error(
      "Clock in/out for Employee Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing the clock in/out request.",
      error: `Clock in/out for Employee Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Attendance for Employee -------- */
export const getAttendance = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    const limit = parseInt(req.query.limit || 30);
    const history = await Attendance.find({ employeeId: employee._id })
      .sort({ date: -1 })
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Attendance records retrieved successfully.",
      data: history,
      employee: { isDeleted: employee.isDeleted },
    });
  } catch (error) {
    console.error(
      "Get Attendance for Employee Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving attendance records.",
      error: `Get Attendance for Employee Error: ${error?.stack || error?.message || error}`,
    });
  }
};
