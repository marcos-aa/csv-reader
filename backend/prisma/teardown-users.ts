import client from "./client";

async function deleteUsers() {
  await client.user.deleteMany();
}

deleteUsers().catch((e) => e);
