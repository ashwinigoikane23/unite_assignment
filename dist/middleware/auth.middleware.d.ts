import { Request, Response, NextFunction } from "express";
export interface AuthedRequest extends Request {
  user?: any;
}
export declare const authMiddleware: (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const requireRole: (
  roles: string[]
) => (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | undefined;
