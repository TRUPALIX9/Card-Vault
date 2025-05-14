import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes (no auth required)
import contactRoutes from "./routes/contacts";
import userRoutes from "./routes/user";
import statusRoutes from "./routes/status";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in environment variables");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: "*", // 🔓 Allow any origin for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Public Routes (no auth)
app.use("/api/status", statusRoutes);
app.use("/api/contacts", contactRoutes); // <-- no auth
app.use("/api/user", userRoutes); // <-- no auth

// MongoDB connect & start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
