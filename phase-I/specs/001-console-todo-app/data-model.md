# Data Model: In-Memory Python Console Todo Application

**Feature**: 001-console-todo-app
**Date**: 2026-02-06
**Phase**: Phase 1 - Domain Model Design

## Overview

This document defines the domain model for the Phase I console todo application. The model is intentionally simple and designed to be forward-compatible with Phase II database requirements.

## Entities

### Todo

The core entity representing a single todo item.

**Attributes**:

| Attribute | Type | Required | Default | Constraints | Description |
|-----------|------|----------|---------|-------------|-------------|
| id | int | Yes | Auto-generated | > 0, unique | Unique identifier assigned by repository |
| description | str | Yes | None | 1-500 characters | Task description text |
| completed | bool | Yes | False | True or False | Completion status |

**Implementation**:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Todo:
    """
    Immutable todo item entity.

    Attributes:
        id: Unique identifier (positive integer)
        description: Task description (1-500 characters)
        completed: Completion status (default: False)
    """
    id: int
    description: str
    completed: bool = False

    def __post_init__(self) -> None:
        """Validate entity invariants."""
        if self.id <= 0:
            raise ValueError("Todo ID must be positive")
        if not self.description or len(self.description.strip()) == 0:
            raise ValueError("Todo description cannot be empty")
        if len(self.description) > 500:
            raise ValueError("Todo description cannot exceed 500 characters")
```

**Invariants**:
- ID must always be positive (> 0)
- Description must never be empty or whitespace-only
- Description must not exceed 500 characters
- Completed status is always boolean (no null/undefined)
- Entity is immutable (frozen dataclass)

**State Transitions**:

```
[Created] → completed=False
    ↓
[Mark Complete] → completed=True
    ↓
[No further transitions in Phase I]
```

Note: In Phase I, marking complete is one-way. Phase II may add "uncomplete" functionality.

## Validation Rules

### Description Validation

**Rule**: Description must be between 1 and 500 characters (after trimming whitespace)

**Implementation Location**: `src/utils/validators.py`

```python
def validate_description(description: str) -> tuple[bool, str]:
    """
    Validate todo description.

    Args:
        description: The description to validate

    Returns:
        Tuple of (is_valid, error_message)
        If valid, error_message is empty string
    """
    if not description or len(description.strip()) == 0:
        return False, "Task description cannot be empty"

    if len(description) > 500:
        return False, "Task description cannot exceed 500 characters"

    return True, ""
```

**Error Messages**:
- Empty/whitespace: "Task description cannot be empty"
- Too long: "Task description cannot exceed 500 characters"

### ID Validation

**Rule**: Task ID must be a positive integer

**Implementation Location**: `src/utils/validators.py`

```python
def validate_task_id(task_id: int) -> tuple[bool, str]:
    """
    Validate task ID.

    Args:
        task_id: The ID to validate

    Returns:
        Tuple of (is_valid, error_message)
        If valid, error_message is empty string
    """
    if task_id <= 0:
        return False, "Task ID must be a positive integer"

    return True, ""
```

**Error Messages**:
- Invalid: "Task ID must be a positive integer"

## Repository Contract

The repository provides data access operations for Todo entities.

**Interface**:

```python
class TodoRepository:
    """In-memory repository for Todo entities."""

    def add(self, description: str) -> Todo:
        """
        Create and store a new todo.

        Args:
            description: Task description (validated by caller)

        Returns:
            Created Todo with auto-generated ID
        """
        ...

    def get_by_id(self, task_id: int) -> Todo | None:
        """
        Retrieve todo by ID.

        Args:
            task_id: The task ID to find

        Returns:
            Todo if found, None otherwise
        """
        ...

    def get_all(self) -> list[Todo]:
        """
        Retrieve all todos.

        Returns:
            List of all todos in creation order
        """
        ...

    def update(self, task_id: int, description: str) -> Todo | None:
        """
        Update todo description.

        Args:
            task_id: The task ID to update
            description: New description (validated by caller)

        Returns:
            Updated Todo if found, None otherwise
        """
        ...

    def delete(self, task_id: int) -> bool:
        """
        Delete todo by ID.

        Args:
            task_id: The task ID to delete

        Returns:
            True if deleted, False if not found
        """
        ...

    def mark_complete(self, task_id: int) -> Todo | None:
        """
        Mark todo as complete.

        Args:
            task_id: The task ID to mark complete

        Returns:
            Updated Todo if found, None otherwise
        """
        ...
```

**Storage Implementation**:
- In-memory list: `self._todos: list[Todo] = []`
- ID counter: `self._next_id: int = 1`
- IDs are sequential and never reused within a session
- Updates create new Todo instances (immutability)

## Service Layer Contract

The service layer provides business logic operations.

**Interface**:

```python
class TodoService:
    """Business logic for todo operations."""

    def add_task(self, description: str) -> tuple[Todo | None, str]:
        """
        Add a new task.

        Args:
            description: Task description

        Returns:
            Tuple of (created_todo, message)
            If validation fails, todo is None and message contains error
        """
        ...

    def view_all_tasks(self) -> list[Todo]:
        """
        Get all tasks.

        Returns:
            List of all todos
        """
        ...

    def update_task(self, task_id: int, description: str) -> tuple[bool, str]:
        """
        Update task description.

        Args:
            task_id: The task ID to update
            description: New description

        Returns:
            Tuple of (success, message)
        """
        ...

    def delete_task(self, task_id: int) -> tuple[bool, str]:
        """
        Delete a task.

        Args:
            task_id: The task ID to delete

        Returns:
            Tuple of (success, message)
        """
        ...

    def mark_complete(self, task_id: int) -> tuple[bool, str]:
        """
        Mark task as complete.

        Args:
            task_id: The task ID to mark complete

        Returns:
            Tuple of (success, message)
        """
        ...
```

**Business Rules**:
1. All descriptions are validated before storage
2. All IDs are validated before operations
3. Operations return user-friendly messages
4. Marking already-complete task returns informational message (not error)
5. Operations on non-existent IDs return "Task not found" message

## Phase II Migration Path

### Database Schema (Future)

When migrating to Phase II with SQLModel and PostgreSQL:

```python
from sqlmodel import SQLModel, Field
from datetime import datetime

class Todo(SQLModel, table=True):
    """SQLModel version for Phase II."""
    id: int | None = Field(default=None, primary_key=True)
    description: str = Field(max_length=500)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: int | None = Field(default=None, foreign_key="user.id")  # Phase III
```

**Migration Strategy**:
1. Add `created_at` and `updated_at` timestamps
2. Change ID generation from manual counter to database auto-increment
3. Add indexes on `user_id` and `completed` for query performance
4. Repository methods become async database queries
5. Service layer adds async/await but logic remains the same

### Backward Compatibility

**Guaranteed**:
- Core attributes (id, description, completed) remain unchanged
- Validation rules remain the same
- Service layer interface remains compatible
- Business logic remains identical

**Changes Required**:
- Add timestamp handling in repository
- Add async/await keywords
- Add database connection management
- Add migration scripts for schema changes

## Error Handling

### Custom Exceptions

**Implementation Location**: `src/utils/errors.py`

```python
class TodoError(Exception):
    """Base exception for todo operations."""
    pass

class TaskNotFoundError(TodoError):
    """Raised when task ID does not exist."""
    def __init__(self, task_id: int):
        self.task_id = task_id
        super().__init__(f"Task with ID {task_id} not found")

class InvalidInputError(TodoError):
    """Raised when input validation fails."""
    def __init__(self, message: str):
        super().__init__(message)
```

**Usage**:
- Service layer catches exceptions and converts to user messages
- CLI layer displays messages without exposing stack traces
- Repository layer raises exceptions for error conditions

## Summary

**Entities**: 1 (Todo)
**Attributes**: 3 (id, description, completed)
**Validation Rules**: 2 (description length, ID format)
**State Transitions**: 1 (incomplete → complete)
**Phase II Compatibility**: Full (add timestamps and user_id)

The data model is intentionally minimal for Phase I while maintaining forward compatibility with Phase II database requirements.
