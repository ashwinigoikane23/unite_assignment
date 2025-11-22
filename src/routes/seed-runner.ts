// This runs the same seed logic as scripts/seed.js but programmatically
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function runSeed() {
  const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unite";
  await mongoose.connect(MONGO, {});
  const User = mongoose.model('User', new mongoose.Schema({
    name: String, email: { type: String, unique: true }, passwordHash: String, role: String, createdAt: Date
  }));
  const Lead = mongoose.model('Lead', new mongoose.Schema({
    name: String, phone: String, email: String, status: String, createdAt: Date
  }));
  const CallTask = mongoose.model('CallTask', new mongoose.Schema({
    lead: String, assigned_to: String, scheduledAt: Date, completed: Boolean, outcome: String, idempotencyKey: String
  }));

  const now = new Date();
  const users = [
    { name: 'Admin User', email: 'admin@example.com', passwordHash: await bcrypt.hash('Password123!',10), role: 'admin', createdAt: now },
    { name: 'Manager User', email: 'manager@example.com', passwordHash: await bcrypt.hash('Password123!',10), role: 'manager', createdAt: now },
    { name: 'Agent User', email: 'agent@example.com', passwordHash: await bcrypt.hash('Password123!',10), role: 'agent', createdAt: now }
  ];
  const leads = [
    { name: 'Lead One', phone: '9000000001', email: 'lead1@example.com', status: 'new', createdAt: now },
    { name: 'Lead Two', phone: '9000000002', email: 'lead2@example.com', status: 'contacted', createdAt: now }
  ];

  for(const u of users){
    await User.updateOne({ email: u.email }, { $set: u }, { upsert: true });
  }
  for(const l of leads){
    await Lead.updateOne({ phone: l.phone }, { $set: l }, { upsert: true });
  }
  const lead = await Lead.findOne({ phone: '9000000001' });
  if (lead) {
    await CallTask.updateOne({ idempotencyKey: 'seed-task-1' }, { $set: { lead: lead._id.toString(), assigned_to: 'agent', scheduledAt: new Date(), completed: false, idempotencyKey: 'seed-task-1' } }, { upsert: true });
  }

  await mongoose.disconnect();
}
