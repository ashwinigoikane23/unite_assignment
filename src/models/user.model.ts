import mongoose from "mongoose";
export type Role = "admin" | "manager" | "agent";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  phone: String,
  role: { type: String, enum: ["admin", "manager", "agent"], default: "agent" },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
