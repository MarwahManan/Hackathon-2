"""In-memory repository for Todo entities."""

from src.domain.todo import Todo


class TodoRepository:
    """In-memory repository for Todo entities."""

    def __init__(self) -> None:
        """Initialize repository with empty list and ID counter."""
        self._todos: list[Todo] = []
        self._next_id: int = 1

    def get_all(self) -> list[Todo]:
        """
        Retrieve all todos.

        Returns:
            List of all todos in creation order
        """
        return self._todos.copy()

    def add(self, description: str) -> Todo:
        """
        Create and store a new todo.

        Args:
            description: Task description (validated by caller)

        Returns:
            Created Todo with auto-generated ID
        """
        todo = Todo(id=self._next_id, description=description, completed=False)
        self._todos.append(todo)
        self._next_id += 1
        return todo

    def get_by_id(self, task_id: int) -> Todo | None:
        """
        Retrieve todo by ID.

        Args:
            task_id: The task ID to find

        Returns:
            Todo if found, None otherwise
        """
        for todo in self._todos:
            if todo.id == task_id:
                return todo
        return None

    def update(self, task_id: int, description: str) -> Todo | None:
        """
        Update todo description.

        Args:
            task_id: The task ID to update
            description: New description (validated by caller)

        Returns:
            Updated Todo if found, None otherwise
        """
        for i, todo in enumerate(self._todos):
            if todo.id == task_id:
                updated_todo = Todo(id=todo.id, description=description, completed=todo.completed)
                self._todos[i] = updated_todo
                return updated_todo
        return None

    def delete(self, task_id: int) -> bool:
        """
        Delete todo by ID.

        Args:
            task_id: The task ID to delete

        Returns:
            True if deleted, False if not found
        """
        for i, todo in enumerate(self._todos):
            if todo.id == task_id:
                self._todos.pop(i)
                return True
        return False

    def mark_complete(self, task_id: int) -> Todo | None:
        """
        Mark todo as complete.

        Args:
            task_id: The task ID to mark complete

        Returns:
            Updated Todo if found, None otherwise
        """
        for i, todo in enumerate(self._todos):
            if todo.id == task_id:
                completed_todo = Todo(id=todo.id, description=todo.description, completed=True)
                self._todos[i] = completed_todo
                return completed_todo
        return None
