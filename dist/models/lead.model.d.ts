import mongoose from "mongoose";
export declare const Lead: mongoose.Model<
  {
    phone: string;
    createdAt: Date;
    status: string;
    name?: string | undefined;
    email?: string | undefined;
    source?: string | undefined;
    s3ImageKey?: string | undefined;
    updatedAt?: Date | undefined;
    assigned_to?: mongoose.Types.ObjectId | undefined;
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      phone: string;
      createdAt: Date;
      status: string;
      name?: string | undefined;
      email?: string | undefined;
      source?: string | undefined;
      s3ImageKey?: string | undefined;
      updatedAt?: Date | undefined;
      assigned_to?: mongoose.Types.ObjectId | undefined;
    }
  > & {
    phone: string;
    createdAt: Date;
    status: string;
    name?: string | undefined;
    email?: string | undefined;
    source?: string | undefined;
    s3ImageKey?: string | undefined;
    updatedAt?: Date | undefined;
    assigned_to?: mongoose.Types.ObjectId | undefined;
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
      phone: string;
      createdAt: Date;
      status: string;
      name?: string | undefined;
      email?: string | undefined;
      source?: string | undefined;
      s3ImageKey?: string | undefined;
      updatedAt?: Date | undefined;
      assigned_to?: mongoose.Types.ObjectId | undefined;
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        phone: string;
        createdAt: Date;
        status: string;
        name?: string | undefined;
        email?: string | undefined;
        source?: string | undefined;
        s3ImageKey?: string | undefined;
        updatedAt?: Date | undefined;
        assigned_to?: mongoose.Types.ObjectId | undefined;
      }>
    > &
      mongoose.FlatRecord<{
        phone: string;
        createdAt: Date;
        status: string;
        name?: string | undefined;
        email?: string | undefined;
        source?: string | undefined;
        s3ImageKey?: string | undefined;
        updatedAt?: Date | undefined;
        assigned_to?: mongoose.Types.ObjectId | undefined;
      }> & {
        _id: mongoose.Types.ObjectId;
      }
  >
>;
