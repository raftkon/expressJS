import mongoose from "mongoose";
import { config } from "dotenv";
import { CustomError } from "../lib/custom-error.js";

config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log({ errorInDBConnection: error });
    throw new CustomError(500, "Error connecting to the database");
  }
};
