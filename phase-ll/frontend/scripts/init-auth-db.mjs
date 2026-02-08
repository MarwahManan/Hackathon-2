import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import pg from "pg";

const { Pool } = pg;

async function initAuthDatabase() {
  console.log("🔧 Initializing Better Auth database tables...\n");

  try {
    // Create Better Auth instance
    const auth = betterAuth({
      database: {
        provider: "postgresql",
        url: process.env.DATABASE_URL,
      },
      emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
      },
      plugins: [
        jwt({
          secret: process.env.BETTER_AUTH_SECRET,
          expiresIn: "7d",
          algorithm: "HS256",
        }),
      ],
    });

    console.log("✅ Better Auth configuration loaded");
    console.log("📊 Database URL:", process.env.DATABASE_URL?.substring(0, 50) + "...");

    // Test database connection
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const client = await pool.connect();
    console.log("✅ Database connection successful\n");

    // Check if Better Auth tables exist
    const tableCheck = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('user', 'session', 'account', 'verification')
      ORDER BY table_name;
    `);

    console.log("📋 Existing Better Auth tables:");
    if (tableCheck.rows.length === 0) {
      console.log("   ⚠️  No Better Auth tables found!");
      console.log("\n💡 Better Auth should auto-create tables on first signup attempt.");
      console.log("   If signup fails, check the frontend console for errors.");
    } else {
      tableCheck.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    }

    // Check backend users table
    const usersCheck = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'users';
    `);

    console.log("\n📋 Backend tables:");
    if (usersCheck.rows.length > 0) {
      console.log("   ✓ users (backend table)");
    }

    client.release();
    await pool.end();

    console.log("\n✅ Database check complete!");
    console.log("\n📝 Next steps:");
    console.log("   1. Restart the frontend server");
    console.log("   2. Try signing up at http://localhost:3000/signup");
    console.log("   3. Check browser console (F12) for any errors");
    console.log("   4. Better Auth will auto-create tables on first signup");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error("\n🔍 Troubleshooting:");
    console.error("   - Check DATABASE_URL in frontend/.env.local");
    console.error("   - Verify database is accessible");
    console.error("   - Check BETTER_AUTH_SECRET is set");
  }
}

initAuthDatabase();
