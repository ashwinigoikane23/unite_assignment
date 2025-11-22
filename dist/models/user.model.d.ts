import mongoose from "mongoose";
export type Role = "admin" | "manager" | "agent";
export declare const User: mongoose.Model<
  {
    email: string;
    role: "admin" | "manager" | "agent";
    createdAt: Date;
    name?: string | undefined;
    passwordHash?: string | undefined;
    phone?: string | undefined;
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      email: string;
      role: "admin" | "manager" | "agent";
      createdAt: Date;
      name?: string | undefined;
      passwordHash?: string | undefined;
      phone?: string | undefined;
    }
  > & {
    email: string;
    role: "admin" | "manager" | "agent";
    createdAt: Date;
    name?: string | undefined;
    passwordHash?: string | undefined;
    phone?: string | undefined;
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
      email: string;
      role: "admin" | "manager" | "agent";
      createdAt: Date;
      name?: string | undefined;
      passwordHash?: string | undefined;
      phone?: string | undefined;
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        email: string;
        role: "admin" | "manager" | "agent";
        createdAt: Date;
        name?: string | undefined;
        passwordHash?: string | undefined;
        phone?: string | undefined;
      }>
    > &
      mongoose.FlatRecord<{
        email: string;
        role: "admin" | "manager" | "agent";
        createdAt: Date;
        name?: string | undefined;
        passwordHash?: string | undefined;
        phone?: string | undefined;
      }> & {
        _id: mongoose.Types.ObjectId;
      }
  >
>;
