"""
Database initialization script
Creates all tables in the Neon PostgreSQL database
"""
import sys
sys.path.insert(0, '.')

from app.database import create_db_and_tables

if __name__ == "__main__":
    print("Creating database tables...")
    try:
        create_db_and_tables()
        print("[SUCCESS] Database tables created successfully!")
        print("\nTables created:")
        print("  - users (id, email, created_at, updated_at)")
        print("  - tasks (id, user_id, title, description, is_completed, created_at, updated_at)")
        print("\nForeign key constraint:")
        print("  - tasks.user_id -> users.id (ON DELETE CASCADE)")
        print("\nIndexes:")
        print("  - users.email (unique)")
        print("  - tasks.user_id")
        print("\n[COMPLETE] Database setup finished!")
    except Exception as e:
        print(f"[ERROR] Error creating tables: {e}")
        sys.exit(1)
