import mongoose from "mongoose";

const CallTaskSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledAt: Date,
  completed: { type: Boolean, default: false },
  notes: [
    {
      text: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: Date,
    },
  ],
  outcome: String,
  idempotencyKey: String,
  createdAt: { type: Date, default: Date.now },
});
CallTaskSchema.index({ idempotencyKey: 1 }, { unique: false });

export const CallTask = mongoose.model("CallTask", CallTaskSchema);
