import { Request, Response } from "express";
export declare const createCallTask: (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const completeCallTask: (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
