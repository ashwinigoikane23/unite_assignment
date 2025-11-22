"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLead = exports.listLeads = exports.createLead = void 0;
const lead_model_1 = require("../models/lead.model");
const log_model_1 = require("../models/log.model");
const createLead = async (req, res) => {
    const { name, phone, email, source, assigned_to } = req.body;
    try {
        const existing = await lead_model_1.Lead.findOne({ phone }).lean();
        if (existing) {
            return res
                .status(409)
                .json({ message: "Lead with same phone exists", lead: existing });
        }
        const newLead = await lead_model_1.Lead.create({
            name,
            phone,
            email,
            source,
            assigned_to,
        });
        await log_model_1.Log.create({ type: "lead.created", payload: newLead });
        return res.status(201).json(newLead);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.createLead = createLead;
const listLeads = async (req, res) => {
    const { status, page = "1", limit = "20" } = req.query;
    const filter = {};
    if (status)
        filter.status = status;
    const leads = await lead_model_1.Lead.find(filter)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .lean();
    res.json({ data: leads });
};
exports.listLeads = listLeads;
const getLead = async (req, res) => {
    const { id } = req.params;
    const lead = await lead_model_1.Lead.findById(id).lean();
    if (!lead)
        return res.status(404).json({ message: "Not found" });
    res.json(lead);
};
exports.getLead = getLead;
//# sourceMappingURL=leads.controller.js.map