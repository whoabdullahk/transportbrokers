'use strict';
const { createRequire } = require('module');
const r = createRequire(require('url').pathToFileURL(__filename).href);

// Use pg from pnpm virtual store
const pg = r('C:\\Users\\iabdu\\Downloads\\chodulogistics\\node_modules\\.pnpm\\pg@8.22.0\\node_modules\\pg');
const bcrypt = r('C:\\Users\\iabdu\\Downloads\\chodulogistics\\node_modules\\.pnpm\\bcryptjs@3.0.3\\node_modules\\bcryptjs');

const DATABASE_URL = 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify';
const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    // Check existing users
    const existing = await client.query('SELECT id, email, is_active FROM admin_users');
    console.log('\n📋 Existing admin users:');
    console.log(existing.rows);

    // Ensure superadmin role
    let roleId;
    const rolesRes = await client.query("SELECT id FROM roles WHERE name = 'superadmin' LIMIT 1");
    if (rolesRes.rows.length === 0) {
      const r = await client.query("INSERT INTO roles (name, permissions) VALUES ('superadmin', '{\"*\": \"write\"}'::jsonb) RETURNING id");
      roleId = r.rows[0].id;
      console.log('✅ Created superadmin role');
    } else {
      roleId = rolesRes.rows[0].id;
      console.log('✅ Found superadmin role id:', roleId);
    }

    // Upsert winston admin
    const winstonHash = await bcrypt.hash('Dispatch@007722', 10);
    await client.query(`
      INSERT INTO admin_users (email, password_hash, name, role_id, is_active)
      VALUES ('winston@brokeragecompanyofamericaninc.com', $1, 'Winston Admin', $2, true)
      ON CONFLICT (email) DO UPDATE SET password_hash = $1, is_active = true;
    `, [winstonHash, roleId]);
    console.log('✅ Upserted: winston@brokeragecompanyofamericaninc.com / Dispatch@007722');

    // Upsert nichols admin
    const nicholsHash = await bcrypt.hash('Nichols@2026!', 10);
    await client.query(`
      INSERT INTO admin_users (email, password_hash, name, role_id, is_active)
      VALUES ('admin@nicholstransportservices.com', $1, 'Nichols Operations Admin', $2, true)
      ON CONFLICT (email) DO UPDATE SET password_hash = $1, is_active = true;
    `, [nicholsHash, roleId]);
    console.log('✅ Upserted: admin@nicholstransportservices.com / Nichols@2026!');

    console.log('\n✅ Both admin users are ready!');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
