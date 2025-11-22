import { Request, Response } from "express";
export declare const createLead: (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>>>;
export declare const listLeads: (req: Request, res: Response) => Promise<void>;
export declare const getLead: (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>> | undefined>;
