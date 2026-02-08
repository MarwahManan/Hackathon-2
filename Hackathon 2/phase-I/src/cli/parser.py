"""Command parsing and routing for CLI."""

from src.cli.formatter import Formatter
from src.services.todo_service import TodoService


class Parser:
    """Handles command parsing and routing."""

    def __init__(self, service: TodoService, formatter: Formatter) -> None:
        """
        Initialize parser with service and formatter.

        Args:
            service: TodoService instance
            formatter: Formatter instance
        """
        self._service = service
        self._formatter = formatter

    def parse_command(self, user_input: str) -> tuple[str, bool]:
        """
        Parse and execute user command.

        Args:
            user_input: Raw user input string

        Returns:
            Tuple of (output_message, should_exit)
        """
        # Normalize input
        user_input = user_input.strip()

        if not user_input:
            return "", False

        # Split command and arguments
        parts = user_input.split(maxsplit=1)
        command = parts[0].lower()
        args = parts[1] if len(parts) > 1 else ""

        # Route to appropriate handler
        if command == "add":
            return self.handle_add_command(args), False
        elif command == "view":
            return self.handle_view_command(), False
        elif command == "complete":
            return self.handle_complete_command(args), False
        elif command == "update":
            return self.handle_update_command(args), False
        elif command == "delete":
            return self.handle_delete_command(args), False
        elif command == "help":
            return self.handle_help_command(), False
        elif command == "exit":
            return self.handle_exit_command(), True
        else:
            return f"✗ Error: Unknown command '{command}'\nType 'help' to see available commands", False

    def handle_view_command(self) -> str:
        """
        Handle view command.

        Returns:
            Formatted task list
        """
        todos = self._service.view_all_tasks()
        return self._formatter.format_task_list(todos)

    def handle_add_command(self, args: str) -> str:
        """
        Handle add command.

        Args:
            args: Task description

        Returns:
            Success or error message
        """
        if not args:
            return "✗ Error: Missing required argument\nUsage: add <description>"

        todo, message = self._service.add_task(args)
        return message

    def handle_complete_command(self, args: str) -> str:
        """
        Handle complete command.

        Args:
            args: Task ID

        Returns:
            Success or error message
        """
        if not args:
            return "✗ Error: Missing required argument\nUsage: complete <id>"

        try:
            task_id = int(args)
            success, message = self._service.mark_complete(task_id)
            return message
        except ValueError:
            return "✗ Error: Task ID must be a positive integer"

    def handle_update_command(self, args: str) -> str:
        """
        Handle update command.

        Args:
            args: Task ID and new description

        Returns:
            Success or error message
        """
        if not args:
            return "✗ Error: Missing required arguments\nUsage: update <id> <description>"

        parts = args.split(maxsplit=1)
        if len(parts) < 2:
            return "✗ Error: Missing description\nUsage: update <id> <description>"

        try:
            task_id = int(parts[0])
            description = parts[1]
            success, message = self._service.update_task(task_id, description)
            return message
        except ValueError:
            return "✗ Error: Task ID must be a positive integer"

    def handle_delete_command(self, args: str) -> str:
        """
        Handle delete command.

        Args:
            args: Task ID

        Returns:
            Success or error message
        """
        if not args:
            return "✗ Error: Missing required argument\nUsage: delete <id>"

        try:
            task_id = int(args)
            success, message = self._service.delete_task(task_id)
            return message
        except ValueError:
            return "✗ Error: Task ID must be a positive integer"

    def handle_help_command(self) -> str:
        """
        Handle help command.

        Returns:
            Help message
        """
        return self._formatter.format_help()

    def handle_exit_command(self) -> str:
        """
        Handle exit command.

        Returns:
            Goodbye message
        """
        return "Goodbye! All tasks have been cleared from memory."
