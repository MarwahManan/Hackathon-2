"""
Verify database migration status
Checks if calendar fields were added to tasks table
"""
import os
from dotenv import load_dotenv
import psycopg

# Load environment variables
load_dotenv()

def verify_migration():
    """Check if the calendar fields migration was applied"""
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("ERROR: DATABASE_URL not found")
        return False

    print("Connecting to Neon database...")
    try:
        conn = psycopg.connect(database_url)
        cursor = conn.cursor()

        # Check for new columns
        print("\nChecking for calendar columns...")
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'tasks'
            AND column_name IN ('due_date', 'recurrence_pattern', 'recurrence_end_date')
            ORDER BY column_name;
        """)

        columns = cursor.fetchall()
        if columns:
            print("\n[SUCCESS] Calendar columns found:")
            for col in columns:
                print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")
        else:
            print("\n[WARNING] Calendar columns NOT found")
            cursor.close()
            conn.close()
            return False

        # Check for index
        print("\nChecking for due_date index...")
        cursor.execute("""
            SELECT indexname, indexdef
            FROM pg_indexes
            WHERE tablename = 'tasks'
            AND indexname = 'idx_tasks_due_date';
        """)

        indexes = cursor.fetchall()
        if indexes:
            print("[SUCCESS] Index found:")
            for idx in indexes:
                print(f"  - {idx[0]}")
        else:
            print("[WARNING] Index NOT found")

        # Check for constraints
        print("\nChecking for constraints...")
        cursor.execute("""
            SELECT conname, pg_get_constraintdef(oid)
            FROM pg_constraint
            WHERE conrelid = 'tasks'::regclass
            AND conname IN ('chk_recurrence_pattern', 'chk_recurrence_end_date');
        """)

        constraints = cursor.fetchall()
        if constraints:
            print("[SUCCESS] Constraints found:")
            for con in constraints:
                print(f"  - {con[0]}")
        else:
            print("[WARNING] Constraints NOT found")

        cursor.close()
        conn.close()

        print("\n[SUCCESS] Migration verification complete!")
        return True

    except Exception as e:
        print(f"\n[ERROR] Verification failed: {e}")
        return False


if __name__ == "__main__":
    verify_migration()
