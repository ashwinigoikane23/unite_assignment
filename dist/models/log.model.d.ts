import mongoose from "mongoose";
export declare const Log: mongoose.Model<
  {
    createdAt: Date;
    type?: string | undefined;
    payload?: any;
    meta?: any;
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      createdAt: Date;
      type?: string | undefined;
      payload?: any;
      meta?: any;
    }
  > & {
    createdAt: Date;
    type?: string | undefined;
    payload?: any;
    meta?: any;
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
      type?: string | undefined;
      payload?: any;
      meta?: any;
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        createdAt: Date;
        type?: string | undefined;
        payload?: any;
        meta?: any;
      }>
    > &
      mongoose.FlatRecord<{
        createdAt: Date;
        type?: string | undefined;
        payload?: any;
        meta?: any;
      }> & {
        _id: mongoose.Types.ObjectId;
      }
  >
>;
