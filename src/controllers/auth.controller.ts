import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev_secret";

function parseExpiresIn(raw?: string): jwt.SignOptions["expiresIn"] | undefined {
  if (!raw) return undefined;
  // if raw is purely numeric, return number; else return the string form (e.g. "1h", "30m")
  const n = Number(raw);
  if (!Number.isNaN(n) && raw.trim() !== "") return n;
  return raw as unknown as jwt.SignOptions["expiresIn"];
}

const JWT_EXPIRES_IN = parseExpiresIn(process.env.JWT_EXPIRES_IN);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const u: any = await User.findOne({ email });
  if (!u) return res.status(401).json({ message: "Invalid" });
  const ok = await bcrypt.compare(password, u.passwordHash || "");
  if (!ok) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign(
    { sub: String(u._id), role: u.role },
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({
    token,
    user: { id: u._id, email: u.email, name: u.name, role: u.role },
  });
};
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const u = new User({ name, email, passwordHash, role });
  await u.save();
  res.status(201).json({ id: u._id, email: u.email, name: u.name, role: u.role });
}