import Queue from "bull";
import dotenv from "dotenv";
dotenv.config();
const REDIS = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const q = new Queue("csv:import", REDIS);
console.log("CSV worker starting, listening to queue csv:import at", REDIS);

q.process(async (job: any) => {
  console.log("Processing job:", job.id, job.data);
  await new Promise((r) => setTimeout(r, 1000));
  return { ok: true, processed: 0 };
});

q.on("completed", (job, res) => console.log("Job completed", job.id, res));
q.on("failed", (job, err) => console.error("Job failed", job.id, err));
