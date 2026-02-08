from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional


class Task(SQLModel, table=True):
    """Task entity - todo items owned by users"""

    __tablename__ = "tasks"

    # Primary Key
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        nullable=False,
        description="Unique task identifier"
    )

    # Foreign Key
    user_id: UUID = Field(
        foreign_key="users.id",
        nullable=False,
        index=True,
        description="Owner user ID (foreign key to users.id)"
    )

    # Task Fields
    title: str = Field(
        nullable=False,
        min_length=1,
        max_length=200,
        description="Task title (required, 1-200 characters)"
    )

    description: Optional[str] = Field(
        default=None,
        nullable=True,
        max_length=2000,
        description="Task description (optional, max 2000 characters)"
    )

    is_completed: bool = Field(
        default=False,
        nullable=False,
        description="Task completion status (default: false)"
    )

    # Timestamps
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Task creation timestamp"
    )

    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"onupdate": datetime.utcnow},
        description="Last update timestamp"
    )
