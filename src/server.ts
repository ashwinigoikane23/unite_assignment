import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app";

const PORT = process.env.PORT || 4000;

async function main() {
  const app = await createApp();
  app.listen(PORT, () => console.log(`Server listening ${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
