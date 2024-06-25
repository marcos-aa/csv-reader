import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env.test"),
});

import client from "../prisma/client";

async function deleteUsers() {
  await client.user.deleteMany();
}

deleteUsers().catch((e) => e);
