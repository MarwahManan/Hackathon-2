import psycopg2
import os

# Database connection
DATABASE_URL = "postgresql://neondb_owner:npg_6vKzhsdt1RBW@ep-royal-darkness-aic0dakv-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

try:
    # Connect to database
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    print("[OK] Connected to database successfully!\n")

    # Check if users table exists
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'users'
        );
    """)
    users_table_exists = cursor.fetchone()[0]

    if users_table_exists:
        print("[OK] Users table exists")

        # Get users table structure
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position;
        """)
        columns = cursor.fetchall()

        print("\nUsers table columns:")
        for col in columns:
            print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")
    else:
        print("[ERROR] Users table does NOT exist!")
        print("\nThis is the problem - the table needs to be created.")

    # Check if tasks table exists
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'tasks'
        );
    """)
    tasks_table_exists = cursor.fetchone()[0]

    if tasks_table_exists:
        print("\n[OK] Tasks table exists")

        # Get tasks table structure
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'tasks'
            ORDER BY ordinal_position;
        """)
        columns = cursor.fetchall()

        print("\nTasks table columns:")
        for col in columns:
            print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")
    else:
        print("\n[ERROR] Tasks table does NOT exist!")

    cursor.close()
    conn.close()

except Exception as e:
    print(f"[ERROR] Error: {e}")
