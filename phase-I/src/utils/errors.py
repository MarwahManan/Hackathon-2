"""Custom exception classes for todo operations."""


class TodoError(Exception):
    """Base exception for todo operations."""

    pass


class TaskNotFoundError(TodoError):
    """Raised when task ID does not exist."""

    def __init__(self, task_id: int) -> None:
        self.task_id = task_id
        super().__init__(f"Task with ID {task_id} not found")


class InvalidInputError(TodoError):
    """Raised when input validation fails."""

    def __init__(self, message: str) -> None:
        super().__init__(message)
