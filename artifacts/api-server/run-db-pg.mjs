import postgres from 'postgres';
const sql = postgres('postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify');
const res = await sql`SELECT tracking_number FROM shipments`;
console.log(res);
await sql.end();
