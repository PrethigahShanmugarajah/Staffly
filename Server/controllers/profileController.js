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
        // firstName: "Admin",
        // lastName: "",
        // email: session.email,
        profile: {
          firstName: "Admin",
          lastName: "",
          email: session.email,
          position: "Admin",
          bio: "",
          isDeleted: false,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      profile: employee,
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

/* -------- Update Profile -------- */
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found.",
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. You cannot update your profile.",
      });
    }

    // await Employee.findByIdAndUpdate(employee._id, { bio: req.body.bio });
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      { bio: req.body.bio },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      // employee,
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the profile.",
      error: `Update Profile Error: ${error?.stack || error?.message || error}`,
    });
  }
};
