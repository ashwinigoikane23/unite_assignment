import mongoose from "mongoose";

export default async function setup() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/unite_test";
  await mongoose.connect(uri, {});
  return async () => {
    try {
      await mongoose.connection.db.dropDatabase();
    } catch (e) {}
    await mongoose.disconnect();
  };
}
