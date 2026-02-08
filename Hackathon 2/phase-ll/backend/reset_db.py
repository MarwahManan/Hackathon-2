"""
Drop and recreate database tables with updated schema
"""
from app.database import engine
from app.models.user import User
from app.models.task import Task
from sqlmodel import SQLModel

if __name__ == "__main__":
    print("Dropping existing tables...")
    SQLModel.metadata.drop_all(engine)
    print("Tables dropped successfully!")

    print("\nCreating tables with updated schema...")
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully!")

    print("\n[SUCCESS] Database schema updated!")
    print("\nTables now include:")
    print("  - users (id, email, password_hash, created_at, updated_at)")
    print("  - tasks (id, user_id, title, description, is_completed, created_at, updated_at)")
