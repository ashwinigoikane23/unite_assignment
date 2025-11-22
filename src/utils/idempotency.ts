import { Log } from "../models/log.model";
export async function registerIdempotency(key: string, payload: any) {
  const exists = await Log.findOne({ type: "idempotency", "meta.key": key });
  if (exists) return false;
  await Log.create({ type: "idempotency", meta: { key, payload } });
  return true;
}
