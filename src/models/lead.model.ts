import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, required: true },
  email: String,
  status: { type: String, default: "new" },
  source: String,
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  s3ImageKey: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

LeadSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $exists: true } } }
);

export const Lead = mongoose.model("Lead", LeadSchema);
