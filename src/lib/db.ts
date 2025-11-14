// app/lib/db.ts

import { seedAdmin } from "@/utils/SeedAdmin";
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  if (mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    await seedAdmin();
    console.log("MongoDB connected");

    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
