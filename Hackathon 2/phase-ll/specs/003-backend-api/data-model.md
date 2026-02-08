# Data Model: Backend & API

**Feature**: Backend & API for Todo Application
**Date**: 2026-02-08
**Status**: Complete

## Overview

This document defines the database schema and SQLModel entity definitions for the backend API. All models enforce data integrity through database constraints and validation rules.

---

## Entity: User

**Purpose**: Represents an authenticated user in the system. Users are created by the Better Auth authentication system and referenced by tasks.

**SQLModel Definition**:

```python
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
```

**Database Constraints**:
- Primary key: `id` (UUID)
- Unique constraint: `email`
- Index: `email` (for fast lookups during authentication)
- Not null: `id`, `email`, `created_at`, `updated_at`

**Relationships**:
- Has many `Task` entities (one-to-many via `user_id` foreign key)

**Validation Rules**:
- Email must be valid format (enforced by Better Auth)
- Email must be unique across all users
- Timestamps automatically set on creation and update

**Notes**:
- User creation and authentication handled by Better Auth (separate spec)
- Backend API only reads user data, does not create/modify users
- Password hashing and management handled by Better Auth

---

## Entity: Task

**Purpose**: Represents a todo task belonging to a specific user. Tasks support CRUD operations and completion tracking.

**SQLModel Definition**:

```python
from sqlmodel import SQLModel, Field, Relationship
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

    # Relationships (optional, for ORM convenience)
    # user: Optional["User"] = Relationship(back_populates="tasks")
```

**Database Constraints**:
- Primary key: `id` (UUID)
- Foreign key: `user_id` references `users.id`
- Index: `user_id` (for fast filtering by user)
- Not null: `id`, `user_id`, `title`, `is_completed`, `created_at`, `updated_at`
- Check constraint: `title` length between 1 and 200 characters
- Check constraint: `description` length max 2000 characters (if provided)

**Relationships**:
- Belongs to one `User` entity (many-to-one via `user_id` foreign key)

**Validation Rules**:
- Title: Required, 1-200 characters, cannot be empty string
- Description: Optional, max 2000 characters, can be null
- is_completed: Boolean, defaults to false
- user_id: Must reference existing user (foreign key constraint)
- Timestamps: Automatically set on creation and update

**State Transitions**:
- `is_completed`: Can toggle between `true` and `false` via PUT endpoint
- No other state transitions defined (simple CRUD model)

---

## Pydantic Schemas (Request/Response)

**Purpose**: Separate schemas for API validation, distinct from database models.

### TaskCreate (Request Body for POST /api/tasks)

```python
from pydantic import BaseModel, Field, field_validator

class TaskCreate(BaseModel):
    """Schema for creating a new task"""

    title: str = Field(
        min_length=1,
        max_length=200,
        description="Task title (required, 1-200 characters)"
    )

    description: Optional[str] = Field(
        default=None,
        max_length=2000,
        description="Task description (optional, max 2000 characters)"
    )

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError("Title cannot be empty")
        return v.strip()

    @field_validator('description')
    @classmethod
    def description_strip(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            return v.strip() if v.strip() else None
        return None
```

### TaskUpdate (Request Body for PUT /api/tasks/{id})

```python
class TaskUpdate(BaseModel):
    """Schema for updating an existing task"""

    title: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=200,
        description="Task title (optional, 1-200 characters)"
    )

    description: Optional[str] = Field(
        default=None,
        max_length=2000,
        description="Task description (optional, max 2000 characters)"
    )

    is_completed: Optional[bool] = Field(
        default=None,
        description="Task completion status (optional)"
    )

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and (not v or v.strip() == ""):
            raise ValueError("Title cannot be empty")
        return v.strip() if v else None
```

### TaskResponse (Response Body for all endpoints)

```python
class TaskResponse(BaseModel):
    """Schema for task responses"""

    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Enable ORM mode for SQLModel compatibility
```

---

## Database Indexes

**Purpose**: Optimize query performance for common access patterns.

### Index 1: user_id on tasks table
- **Column**: `tasks.user_id`
- **Type**: B-tree index
- **Rationale**: All task queries filter by user_id (user isolation requirement)
- **Query Pattern**: `SELECT * FROM tasks WHERE user_id = ?`

### Index 2: email on users table
- **Column**: `users.email`
- **Type**: B-tree unique index
- **Rationale**: User lookup during authentication
- **Query Pattern**: `SELECT * FROM users WHERE email = ?`

### Index 3: Composite index (user_id, created_at) - Optional Enhancement
- **Columns**: `tasks.user_id`, `tasks.created_at`
- **Type**: B-tree composite index
- **Rationale**: Support sorting tasks by creation date per user
- **Query Pattern**: `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC`
- **Note**: Implement if sorting performance becomes an issue

---

## Migration Strategy

**Initial Schema Creation**:

```sql
-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on email
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL CHECK (LENGTH(title) >= 1),
    description TEXT CHECK (LENGTH(description) <= 2000),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on user_id for fast filtering
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

-- Create trigger for updated_at (PostgreSQL)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

**Migration Tool**: Use Alembic for schema migrations (SQLModel/SQLAlchemy compatible)

---

## Data Integrity Rules

1. **User Isolation**: All task queries MUST include `WHERE user_id = ?` filter
2. **Referential Integrity**: Tasks cannot exist without a valid user (foreign key constraint)
3. **Cascade Delete**: When user is deleted, all their tasks are deleted (ON DELETE CASCADE)
4. **Validation**: Title and description lengths enforced at database and application level
5. **Timestamps**: Automatically managed by database triggers and SQLModel defaults
6. **UUID Generation**: Use database-generated UUIDs for better performance

---

## Summary

- **2 entities**: User, Task
- **1 relationship**: User has many Tasks (one-to-many)
- **3 Pydantic schemas**: TaskCreate, TaskUpdate, TaskResponse
- **2 primary indexes**: user_id (tasks), email (users)
- **Foreign key constraint**: tasks.user_id → users.id with CASCADE delete
- **Validation**: Title (1-200 chars), Description (max 2000 chars)
- **Timestamps**: Auto-managed via database triggers and SQLModel

Next steps: Create API contracts in contracts/ directory
