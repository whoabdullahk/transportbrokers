const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify'
});

async function run() {
  await client.connect();
  const res = await client.query('SELECT * FROM admin_users');
  console.log(res.rows);
  await client.end();
}
run();
