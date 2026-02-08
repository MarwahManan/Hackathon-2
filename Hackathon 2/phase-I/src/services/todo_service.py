"""Business logic for todo operations."""

from src.domain.todo import Todo
from src.repository.todo_repository import TodoRepository
from src.utils.validators import validate_description, validate_task_id


class TodoService:
    """Business logic for todo operations."""

    def __init__(self, repository: TodoRepository) -> None:
        """
        Initialize service with repository.

        Args:
            repository: TodoRepository instance
        """
        self._repository = repository

    def view_all_tasks(self) -> list[Todo]:
        """
        Get all tasks.

        Returns:
            List of all todos
        """
        return self._repository.get_all()

    def add_task(self, description: str) -> tuple[Todo | None, str]:
        """
        Add a new task.

        Args:
            description: Task description

        Returns:
            Tuple of (created_todo, message)
            If validation fails, todo is None and message contains error
        """
        is_valid, error_msg = validate_description(description)
        if not is_valid:
            return None, f"✗ Error: {error_msg}"

        todo = self._repository.add(description.strip())
        return todo, f"✓ Task added successfully (ID: {todo.id})"

    def update_task(self, task_id: int, description: str) -> tuple[bool, str]:
        """
        Update task description.

        Args:
            task_id: The task ID to update
            description: New description

        Returns:
            Tuple of (success, message)
        """
        is_valid_id, error_msg = validate_task_id(task_id)
        if not is_valid_id:
            return False, f"✗ Error: {error_msg}"

        is_valid_desc, error_msg = validate_description(description)
        if not is_valid_desc:
            return False, f"✗ Error: {error_msg}"

        updated_todo = self._repository.update(task_id, description.strip())
        if updated_todo is None:
            return False, "✗ Error: Task not found"

        return True, f"✓ Task {task_id} updated successfully"

    def delete_task(self, task_id: int) -> tuple[bool, str]:
        """
        Delete a task.

        Args:
            task_id: The task ID to delete

        Returns:
            Tuple of (success, message)
        """
        is_valid, error_msg = validate_task_id(task_id)
        if not is_valid:
            return False, f"✗ Error: {error_msg}"

        deleted = self._repository.delete(task_id)
        if not deleted:
            return False, "✗ Error: Task not found"

        return True, f"✓ Task {task_id} deleted successfully"

    def mark_complete(self, task_id: int) -> tuple[bool, str]:
        """
        Mark task as complete.

        Args:
            task_id: The task ID to mark complete

        Returns:
            Tuple of (success, message)
        """
        is_valid, error_msg = validate_task_id(task_id)
        if not is_valid:
            return False, f"✗ Error: {error_msg}"

        # Check if task exists and is already complete
        existing_todo = self._repository.get_by_id(task_id)
        if existing_todo is None:
            return False, "✗ Error: Task not found"

        if existing_todo.completed:
            return True, f"ℹ Task {task_id} is already complete"

        completed_todo = self._repository.mark_complete(task_id)
        if completed_todo is None:
            return False, "✗ Error: Task not found"

        return True, f"✓ Task {task_id} marked as complete"
