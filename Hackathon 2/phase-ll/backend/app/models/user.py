from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional


class User(SQLModel, table=True):
    """User entity - created and managed by Better Auth"""

    __tablename__ = "users"

    # Primary Key
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        nullable=False,
        description="Unique user identifier"
    )

    # Authentication Fields
    email: str = Field(
        nullable=False,
        unique=True,
        max_length=255,
        index=True,
        description="User email address (unique)"
    )

    password_hash: str = Field(
        nullable=False,
        description="Hashed password"
    )

    # Timestamps
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="User creation timestamp"
    )

    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"onupdate": datetime.utcnow},
        description="Last update timestamp"
    )
