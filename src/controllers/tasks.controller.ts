import { Request, Response } from "express";
import { CallTask } from "../models/calltask.model";
import { Log } from "../models/log.model";
import { notifier } from "../services/notifier.service";

export const createCallTask = async (req: Request, res: Response) => {
  const { leadId, assigned_to, scheduledAt, idempotencyKey } = req.body;

  if (idempotencyKey) {
    const exist = await CallTask.findOne({ idempotencyKey }).lean();
    if (exist) return res.status(200).json(exist);
  }

  const task = await CallTask.create({
    lead: leadId,
    assigned_to,
    scheduledAt,
    idempotencyKey,
  });

  await Log.create({ type: "calltask.created", payload: task });
  notifier.notifyAssignment(task).catch(console.error);

  res.status(201).json(task);
};

export const completeCallTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { outcome, note } = req.body;
  const task = await CallTask.findById(id);
  if (!task) return res.status(404).json({ message: "Not found" });
  task.completed = true;
  if (note) {
    task.notes.push({
      text: note,
      createdBy: (req as any).user._id,
      createdAt: new Date(),
    });
  }
  task.outcome = outcome;
  await task.save();
  await Log.create({
    type: "calltask.completed",
    payload: { id: task._id, outcome },
  });
  notifier.notifyCompletion({ _id: task._id.toString(), outcome: task.outcome }).catch(console.error);
  res.json(task);
};
