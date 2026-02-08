"""Output formatting for CLI display."""

from src.domain.todo import Todo


class Formatter:
    """Handles output formatting for the CLI."""

    @staticmethod
    def format_task_list(todos: list[Todo]) -> str:
        """
        Format a list of tasks for display.

        Args:
            todos: List of Todo entities

        Returns:
            Formatted string with task list
        """
        if not todos:
            return Formatter.format_empty_list()

        lines = ["Tasks:"]
        for todo in todos:
            status = "[✓]" if todo.completed else "[ ]"
            lines.append(f"  [{todo.id}] {status} {todo.description}")

        return "\n".join(lines)

    @staticmethod
    def format_empty_list() -> str:
        """
        Format message for empty task list.

        Returns:
            Message indicating no tasks found
        """
        return "No tasks found. Use 'add' to create a task."

    @staticmethod
    def format_success(message: str) -> str:
        """
        Format success message.

        Args:
            message: Success message text

        Returns:
            Formatted success message
        """
        return message

    @staticmethod
    def format_error(message: str) -> str:
        """
        Format error message.

        Args:
            message: Error message text

        Returns:
            Formatted error message
        """
        return message

    @staticmethod
    def format_help() -> str:
        """
        Format help message with all available commands.

        Returns:
            Formatted help text
        """
        return """Console Todo Application - Phase I

Available Commands:
  add <description>     Add a new task
  view                  View all tasks
  update <id> <desc>    Update task description
  delete <id>           Delete a task
  complete <id>         Mark task as complete
  help                  Show this help message
  exit                  Exit the application

Examples:
  add Write unit tests
  view
  update 1 Write integration tests
  complete 1
  delete 1

For more information, see README.md"""
