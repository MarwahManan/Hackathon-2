import pg from 'pg';
const { Pool } = pg;

async function checkDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const client = await pool.connect();

    console.log('📊 Checking database tables...\n');

    // Get all tables
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('Tables found:');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    // Check for Better Auth specific tables
    const authTables = ['user', 'session', 'account', 'verification'];
    const missingTables = authTables.filter(table =>
      !result.rows.some(row => row.table_name === table)
    );

    if (missingTables.length > 0) {
      console.log('\n⚠️  Missing Better Auth tables:', missingTables.join(', '));
      console.log('Better Auth will create these automatically on first signup.');
    } else {
      console.log('\n✅ All Better Auth tables exist!');
    }

    client.release();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkDatabase();
