import { Request, Response } from "express";
import { Lead } from "../models/lead.model";
import { Log } from "../models/log.model";
import mongoose from "mongoose";

/**
 * Create a lead.
 */
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
    console.error("createLead error:", err);
    return res.status(500).json({ message: err.message || "Internal error" });
  }
};

/**
 * List leads (simple pagination + optional status filter)
 */
export const listLeads = async (req: Request, res: Response) => {
  const { status, page = "1", limit = "20" } = req.query;
  const filter: any = {};
  if (status) filter.status = status;
  try {
    const leads = await Lead.find(filter)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();
    res.json({ data: leads });
  } catch (err: any) {
    console.error("listLeads error:", err);
    res.status(500).json({ message: err.message || "Internal error" });
  }
};

/**
 * Get single lead by id
 */
export const getLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const lead = await Lead.findById(id).lean();
    if (!lead) return res.status(404).json({ message: "Not found" });
    res.json(lead);
  } catch (err: any) {
    console.error("getLead error:", err);
    res.status(500).json({ message: err.message || "Internal error" });
  }
};

/**
 * Update a lead by id
 * - checks for phone uniqueness if phone is provided/changed
 */
export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: any = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    // If phone is provided, ensure uniqueness (exclude current record)
    if (updates.phone) {
      const conflicted = await Lead.findOne({
        phone: updates.phone,
        _id: { $ne: id },
      }).lean();
      if (conflicted) {
        return res
          .status(409)
          .json({ message: "Another lead with this phone already exists", lead: conflicted });
      }
    }

    updates.updatedAt = new Date();

    const lead = await Lead.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!lead) return res.status(404).json({ message: "Not found" });

    await Log.create({ type: "lead.updated", payload: lead });

    res.json(lead);
  } catch (err: any) {
    console.error("updateLead error:", err);
    res.status(500).json({ message: err.message || "Internal error" });
  }
};

/**
 * Delete lead by id
 */
export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const lead = await Lead.findByIdAndDelete(id).lean();
    if (!lead) return res.status(404).json({ message: "Not found" });

    await Log.create({ type: "lead.deleted", payload: lead });

    res.json({ ok: true });
  } catch (err: any) {
    console.error("deleteLead error:", err);
    res.status(500).json({ message: err.message || "Internal error" });
  }
};
