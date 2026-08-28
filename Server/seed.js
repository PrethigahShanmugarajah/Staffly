// Server / seed.js
import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    const TemporaryPassword = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL || !TemporaryPassword) {
      console.error(
        "Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variable.",
      );
      process.exit(1);
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("User already exists with role:", existingAdmin.role);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

    const admin = await User.create({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin user created");
    console.log("\nemail:", admin.email);
    console.log("password:", TemporaryPassword);
    console.log("\nchange the password after login");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
  }
}

registerAdmin();
