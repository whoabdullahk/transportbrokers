'use strict';
const bcrypt = require('bcryptjs');
const pg = require('pg');

const DATABASE_URL = 'postgresql://postgres.tnvhhkqxvdqdlbmrqwnj:Ahmadchodu%221@35.79.125.133:6543/postgres?sslmode=no-verify';
const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    // 1. Ensure superadmin role
    const rolesResult = await client.query("SELECT id FROM roles WHERE name = 'superadmin' LIMIT 1");
    let roleId;
    if (rolesResult.rows.length === 0) {
      const r = await client.query("INSERT INTO roles (name) VALUES ('superadmin') RETURNING id");
      roleId = r.rows[0].id;
    } else {
      roleId = rolesResult.rows[0].id;
    }

    // 2. Ensure admin user
    const nicholsHash = await bcrypt.hash('Nichols@2026!', 10);
    await client.query(`
      INSERT INTO admin_users (email, password_hash, name, role_id, is_active)
      VALUES ('admin@nicholstransportservices.com', $1, 'Nichols Operations Admin', $2, true)
      ON CONFLICT (email) DO UPDATE SET password_hash = $1, is_active = true;
    `, [nicholsHash, roleId]);
    console.log('✅ Admin user admin@nicholstransportservices.com verified.');

    // 3. Ensure NTS-78432 shipment
    const estDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    await client.query(`
      INSERT INTO shipments (tracking_number, status, origin, destination, carrier_name, estimated_delivery, last_update, pending_fees)
      VALUES ('NTS-78432', 'In Transit • Dispatched', 'Alexandria, LA', 'Dallas, TX', 'Nichols Dedicated Freight Fleet', $1, 'Active corridor transit rolling on I-20', '$500.00')
      ON CONFLICT (tracking_number) DO UPDATE
      SET status = 'In Transit • Dispatched', origin = 'Alexandria, LA', destination = 'Dallas, TX', carrier_name = 'Nichols Dedicated Freight Fleet', last_update = 'Active corridor transit rolling on I-20', pending_fees = '$500.00';
    `, [estDelivery]);
    console.log('✅ Shipment NTS-78432 verified in DB.');

  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
