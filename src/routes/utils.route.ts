import { Router } from "express";
import { runSeed } from "./seed-runner";
const r = Router();

r.post("/seed", async (req, res) => {
  try {
    await runSeed();
    res.json({ ok: true, message: "Seeding complete" });
  } catch (err: any) {
    console.error("Seed failed", err);
    res.status(500).json({ ok: false, message: err.message || String(err) });
  }
});

export default r;
