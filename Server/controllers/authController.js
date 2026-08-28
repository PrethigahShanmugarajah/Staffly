// Server / controllers / authController.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* -------- Login for Employee and Admin -------- */
export const login = async (req, res) => {
  try {
    const { email, password, role_type } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (role_type === "admin" && user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access the admin account.",
      });
    }

    if (role_type === "employee" && user.role !== "EMPLOYEE") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access the employee account.",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: payload,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing the login request.",
      error: `Login Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Session for Employee and Admin -------- */
export const session = async (req, res) => {
  try {
    const session = req.session;

    return res.status(200).json({
      success: true,
      message: "Session retrieved successfully.",
      user: session,
    });
  } catch (error) {
    console.error("Session Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the session.",
      error: `Session Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Change Password for Employee and Admin -------- */
export const changePassword = async (req, res) => {
  try {
    const session = req.session;

    const { currentPassword, newPassword } = req.body;

    // if (!currentPassword || !newPassword) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Both current and new passwords are required.",
    //   });
    // }

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required.",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "The current password is incorrect.",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(session.userId, { password: hashed });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while changing the password.",
      error: `Change Password Error: ${error?.stack || error?.message || error}`,
    });
  }
};
