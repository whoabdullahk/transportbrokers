'use strict';
const { createRequire } = require('module');
const r = createRequire(require('url').pathToFileURL(__filename).href);
const pg = r('C:\\Users\\iabdu\\Downloads\\chodulogistics\\node_modules\\.pnpm\\pg@8.22.0\\node_modules\\pg');

const DATABASE_URL = 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify';
const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    // List all tables
    const tables = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`);
    console.log('Tables:', tables.rows.map(r => r.table_name));

    // Try to count rate_confirmations
    try {
      const rc = await client.query('SELECT COUNT(*) FROM rate_confirmations');
      console.log('rate_confirmations count:', rc.rows[0].count);
    } catch(e) {
      console.log('rate_confirmations table error:', e.message);
    }
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch(e => { console.error(e.message); process.exit(1); });
