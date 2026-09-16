import { config } from "dotenv";
config();
import { db, adminUsersTable } from "./lib/db/src/index.js";

async function main() {
  try {
    const users = await db.select().from(adminUsersTable);
    console.log("Admin Users:");
    console.log(users);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
main();
