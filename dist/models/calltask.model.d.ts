import mongoose from "mongoose";
export declare const CallTask: mongoose.Model<
  {
    createdAt: Date;
    assigned_to: mongoose.Types.ObjectId;
    lead: mongoose.Types.ObjectId;
    completed: boolean;
    notes: {
      text?: string | undefined;
      createdAt?: Date | undefined;
      createdBy?: mongoose.Types.ObjectId | undefined;
    }[];
    scheduledAt?: Date | undefined;
    outcome?: string | undefined;
    idempotencyKey?: string | undefined;
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      createdAt: Date;
      assigned_to: mongoose.Types.ObjectId;
      lead: mongoose.Types.ObjectId;
      completed: boolean;
      notes: {
        text?: string | undefined;
        createdAt?: Date | undefined;
        createdBy?: mongoose.Types.ObjectId | undefined;
      }[];
      scheduledAt?: Date | undefined;
      outcome?: string | undefined;
      idempotencyKey?: string | undefined;
    }
  > & {
    createdAt: Date;
    assigned_to: mongoose.Types.ObjectId;
    lead: mongoose.Types.ObjectId;
    completed: boolean;
    notes: {
      text?: string | undefined;
      createdAt?: Date | undefined;
      createdBy?: mongoose.Types.ObjectId | undefined;
    }[];
    scheduledAt?: Date | undefined;
    outcome?: string | undefined;
    idempotencyKey?: string | undefined;
  } & {
    _id: mongoose.Types.ObjectId;
  },
  mongoose.Schema<
    any,
    mongoose.Model<any, any, any, any, any, any>,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    {
      createdAt: Date;
      assigned_to: mongoose.Types.ObjectId;
      lead: mongoose.Types.ObjectId;
      completed: boolean;
      notes: {
        text?: string | undefined;
        createdAt?: Date | undefined;
        createdBy?: mongoose.Types.ObjectId | undefined;
      }[];
      scheduledAt?: Date | undefined;
      outcome?: string | undefined;
      idempotencyKey?: string | undefined;
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        createdAt: Date;
        assigned_to: mongoose.Types.ObjectId;
        lead: mongoose.Types.ObjectId;
        completed: boolean;
        notes: {
          text?: string | undefined;
          createdAt?: Date | undefined;
          createdBy?: mongoose.Types.ObjectId | undefined;
        }[];
        scheduledAt?: Date | undefined;
        outcome?: string | undefined;
        idempotencyKey?: string | undefined;
      }>
    > &
      mongoose.FlatRecord<{
        createdAt: Date;
        assigned_to: mongoose.Types.ObjectId;
        lead: mongoose.Types.ObjectId;
        completed: boolean;
        notes: {
          text?: string | undefined;
          createdAt?: Date | undefined;
          createdBy?: mongoose.Types.ObjectId | undefined;
        }[];
        scheduledAt?: Date | undefined;
        outcome?: string | undefined;
        idempotencyKey?: string | undefined;
      }> & {
        _id: mongoose.Types.ObjectId;
      }
  >
>;
