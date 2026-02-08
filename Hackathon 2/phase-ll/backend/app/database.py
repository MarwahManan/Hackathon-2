from sqlmodel import create_engine, Session, SQLModel
from app.config import settings

# Import models so SQLModel can create tables
from app.models.user import User  # noqa: F401
from app.models.task import Task  # noqa: F401

# Create engine with connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10
)


def create_db_and_tables():
    """Create all database tables"""
    SQLModel.metadata.create_all(engine)


def get_db():
    """Dependency for database sessions"""
    with Session(engine) as session:
        yield session
