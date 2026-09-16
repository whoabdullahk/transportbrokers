import { db, shipmentsTable } from "@workspace/db";
async function run() {
  const shipments = await db.select().from(shipmentsTable);
  console.log(shipments);
}
run();
