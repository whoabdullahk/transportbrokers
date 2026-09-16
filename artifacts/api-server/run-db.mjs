import pg from 'pg';
const { Client } = pg;
const client = new Client({ connectionString: 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify' });
await client.connect();
const res = await client.query('SELECT "tracking_number" FROM shipments');
console.log(res.rows);
await client.end();
