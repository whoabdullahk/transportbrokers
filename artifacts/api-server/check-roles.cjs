'use strict';
const { createRequire } = require('module');
const r = createRequire(require('url').pathToFileURL(__filename).href);
const pg = r('C:\\Users\\iabdu\\Downloads\\chodulogistics\\node_modules\\.pnpm\\pg@8.22.0\\node_modules\\pg');

const DATABASE_URL = 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify';
const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    const roles = await client.query('SELECT id, name, permissions FROM roles');
    console.log('Roles:', JSON.stringify(roles.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch(e => { console.error(e.message); process.exit(1); });
