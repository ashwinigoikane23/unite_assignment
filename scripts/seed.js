/**
 * Seed script (JS) to run inside Docker container easily.
 */
const mongoose = require("mongoose");
async function main() {
  const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/unite";
  console.log("Connecting to", MONGO);
  await mongoose.connect(MONGO);
  const User = mongoose.model(
    "User",
    new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      passwordHash: String,
      role: String,
      createdAt: Date,
    })
  );
  const Lead = mongoose.model(
    "Lead",
    new mongoose.Schema({
      name: String,
      phone: String,
      email: String,
      status: String,
      createdAt: Date,
    })
  );

  const bcrypt = require("bcrypt");
  const now = new Date();
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: "admin",
      createdAt: now,
    },
    {
      name: "Manager User",
      email: "manager@example.com",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: "manager",
      createdAt: now,
    },
    {
      name: "Agent User",
      email: "agent@example.com",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: "agent",
      createdAt: now,
    },
  ];
  const leads = [
    {
      name: "Lead One",
      phone: "9000000001",
      email: "lead1@example.com",
      status: "new",
      createdAt: now,
    },
    {
      name: "Lead Two",
      phone: "9000000002",
      email: "lead2@example.com",
      status: "contacted",
      createdAt: now,
    },
    {
      name: "Lead Three",
      phone: "9000000003",
      email: "lead3@example.com",
      status: "qualified",
      createdAt: now,
    },
  ];

  for (const u of users) {
    await User.updateOne({ email: u.email }, { $set: u }, { upsert: true });
    console.log("Seeded user", u.email);
  }
  for (const l of leads) {
    await Lead.updateOne({ phone: l.phone }, { $set: l }, { upsert: true });
    console.log("Seeded lead", l.phone);
  }

  try {
    const fs = require("fs");
    const src = "/mnt/data/Senior_Backend_Developer_Assignment_Unite.pdf";
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, "./Senior_Backend_Developer_Assignment_Unite.pdf");
      console.log("Copied assignment brief to project root");
    } else {
      console.log("No uploaded assignment brief found at", src);
    }
  } catch (e) {
    console.warn("copy failed", e.message);
  }

  await mongoose.disconnect();
  console.log("Seeding complete");
  process.exit(0);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
