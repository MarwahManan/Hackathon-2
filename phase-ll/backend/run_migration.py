"""
Database Migration Runner
Executes SQL migration files against the Neon PostgreSQL database
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import psycopg

# Load environment variables
load_dotenv()

def run_migration(migration_file: str):
    """
    Execute a SQL migration file against the database

    Args:
        migration_file: Path to the SQL migration file
    """
    # Get database URL from environment
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("ERROR: DATABASE_URL not found in environment variables")
        sys.exit(1)

    # Read migration file
    migration_path = Path(migration_file)
    if not migration_path.exists():
        print(f"ERROR: Migration file not found: {migration_file}")
        sys.exit(1)

    print(f"Reading migration file: {migration_path.name}")
    with open(migration_path, 'r') as f:
        migration_sql = f.read()

    # Connect to database and execute migration
    print(f"Connecting to Neon database...")
    conn = None
    try:
        conn = psycopg.connect(database_url)
        conn.autocommit = False  # Use transaction
        cursor = conn.cursor()

        print(f"Executing migration: {migration_path.name}")
        cursor.execute(migration_sql)

        # Commit transaction
        conn.commit()
        print("[SUCCESS] Migration executed successfully!")

        # Verify the changes
        print("\nVerifying changes...")
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'tasks'
            AND column_name IN ('due_date', 'recurrence_pattern', 'recurrence_end_date')
            ORDER BY column_name;
        """)

        columns = cursor.fetchall()
        if columns:
            print("\nNew columns added:")
            for col in columns:
                print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")

        # Verify indexes
        cursor.execute("""
            SELECT indexname, indexdef
            FROM pg_indexes
            WHERE tablename = 'tasks'
            AND indexname = 'idx_tasks_due_date';
        """)

        indexes = cursor.fetchall()
        if indexes:
            print("\nIndexes created:")
            for idx in indexes:
                print(f"  - {idx[0]}")

        # Verify constraints
        cursor.execute("""
            SELECT conname, pg_get_constraintdef(oid)
            FROM pg_constraint
            WHERE conrelid = 'tasks'::regclass
            AND conname IN ('chk_recurrence_pattern', 'chk_recurrence_end_date');
        """)

        constraints = cursor.fetchall()
        if constraints:
            print("\nConstraints added:")
            for con in constraints:
                print(f"  - {con[0]}")

        cursor.close()
        conn.close()

        print("\n[SUCCESS] Migration completed successfully!")

    except psycopg.Error as e:
        print(f"\n[ERROR] Migration failed!")
        print(f"Error: {e}")
        if conn:
            conn.rollback()
            conn.close()
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERROR] Unexpected error!")
        print(f"Error: {e}")
        if conn:
            conn.rollback()
            conn.close()
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python run_migration.py <migration_file>")
        print("Example: python run_migration.py migrations/001_add_calendar_fields.sql")
        sys.exit(1)

    migration_file = sys.argv[1]
    run_migration(migration_file)
