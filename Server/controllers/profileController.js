// Server / controllers / profileController.js
import Employee from "../models/Employee.js";

/* -------- Get Profile -------- */
export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(200).json({
        success: true,
        message: "Profile retrieved successfully.",
        firstName: "Admin",
        lastName: "",
        email: session.email,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      employee,
    });
  } catch (error) {
    console.error(
      "Get Profile Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the profile.",
      error: `Get Profile Error: ${error?.stack || error?.message || error}`,
    });
  }
};
