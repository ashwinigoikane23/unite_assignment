import { Request, Response } from "express";
import { Lead } from "../models/lead.model";
import { Log } from "../models/log.model";

export const createLead = async (req: Request, res: Response) => {
  const { name, phone, email, source, assigned_to } = req.body;
  try {
    const existing = await Lead.findOne({ phone }).lean();
    if (existing) {
      return res
        .status(409)
        .json({ message: "Lead with same phone exists", lead: existing });
    }
    const newLead = await Lead.create({
      name,
      phone,
      email,
      source,
      assigned_to,
    });
    await Log.create({ type: "lead.created", payload: newLead });
    return res.status(201).json(newLead);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const listLeads = async (req: Request, res: Response) => {
  const { status, page = "1", limit = "20" } = req.query;
  const filter: any = {};
  if (status) filter.status = status;
  const leads = await Lead.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .lean();
  res.json({ data: leads });
};

export const getLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lead = await Lead.findById(id).lean();
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json(lead);
};
