import mongoose from "mongoose";
const LogSchema = new mongoose.Schema({
  type: String,
  payload: mongoose.Schema.Types.Mixed,
  meta: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});
export const Log = mongoose.model("Log", LogSchema);
