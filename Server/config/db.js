import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected!"),
    );

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = process.env.PROJECT_NAME;

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set!");
    }

    if (!projectName) {
      throw new Error("PROJECT_NAME environment variable is not set!");
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;
