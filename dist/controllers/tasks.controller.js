"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeCallTask = exports.createCallTask = void 0;
const calltask_model_1 = require("../models/calltask.model");
const log_model_1 = require("../models/log.model");
const notifier_service_1 = require("../services/notifier.service");
const createCallTask = async (req, res) => {
    const { leadId, assigned_to, scheduledAt, idempotencyKey } = req.body;
    if (idempotencyKey) {
        const exist = await calltask_model_1.CallTask.findOne({ idempotencyKey }).lean();
        if (exist)
            return res.status(200).json(exist);
    }
    const task = await calltask_model_1.CallTask.create({
        lead: leadId,
        assigned_to,
        scheduledAt,
        idempotencyKey,
    });
    await log_model_1.Log.create({ type: "calltask.created", payload: task });
    notifier_service_1.notifier.notifyAssignment(task).catch(console.error);
    res.status(201).json(task);
};
exports.createCallTask = createCallTask;
const completeCallTask = async (req, res) => {
    const { id } = req.params;
    const { outcome, note } = req.body;
    const task = await calltask_model_1.CallTask.findById(id);
    if (!task)
        return res.status(404).json({ message: "Not found" });
    task.completed = true;
    if (note) {
        task.notes.push({
            text: note,
            createdBy: req.user._id,
            createdAt: new Date(),
        });
    }
    task.outcome = outcome;
    await task.save();
    await log_model_1.Log.create({
        type: "calltask.completed",
        payload: { id: task._id, outcome },
    });
    notifier_service_1.notifier.notifyCompletion({ _id: task._id.toString(), outcome: task.outcome }).catch(console.error);
    res.json(task);
};
exports.completeCallTask = completeCallTask;
//# sourceMappingURL=tasks.controller.js.map