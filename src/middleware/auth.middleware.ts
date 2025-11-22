import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface AuthedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  const a = req.headers.authorization as string | undefined;
  if (!a) return res.status(401).json({ message: "Missing auth" });
  const parts = a.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ message: "Invalid auth header" });
  const token = parts[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).send({ message: "Unauthorized" });
    if (!roles.includes(user.role))
      return res.status(403).send({ message: "Forbidden" });
    next();
  };
};
