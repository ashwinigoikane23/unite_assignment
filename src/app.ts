import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import leadsRoutes from "./routes/leads.route";
import tasksRoutes from "./routes/tasks.route";
import dotenv from "dotenv";
dotenv.config();

export async function createApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/unite";
  await mongoose.connect(MONGO);

  app.use("/auth", authRoutes);
  app.use("/leads", leadsRoutes);
  app.use("/tasks", tasksRoutes);

  app.get("/health", (req, res) => res.json({ ok: true }));
  return app;
}
