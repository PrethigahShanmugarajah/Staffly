// Server / middleware / auth.js
import jwt from "jsonwebtoken";

/* -------- Fix JWT authentication error handling -------- */
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required to access this resource.",
      });
    }

    const token = authHeader.split(" ")[1];
    const session = jwt.verify(token, process.env.JWT_SECRET);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required to access this resource.",
      });
    }

    req.session = session;

    next();
  } catch (error) {
    console.error(
      "Authentication Error:",
      error?.stack || error?.message || error,
    );

    return res
      .status(
        error?.name === "JsonWebTokenError" ||
          error?.name === "TokenExpiredError"
          ? 401
          : 500,
      )
      .json({
        success: false,
        message:
          error?.name === "JsonWebTokenError" ||
          error?.name === "TokenExpiredError"
            ? "Invalid or expired authentication token."
            : "An unexpected error occurred while authenticating the request.",
        error: `Authentication Error: ${error?.stack || error?.message || error}`,
      });
  }
};
