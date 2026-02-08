"""Console Todo Application - Phase I entry point."""

from src.cli.formatter import Formatter
from src.cli.parser import Parser
from src.repository.todo_repository import TodoRepository
from src.services.todo_service import TodoService


def main() -> None:
    """Main application entry point."""
    # Initialize dependencies
    repository = TodoRepository()
    service = TodoService(repository)
    formatter = Formatter()
    parser = Parser(service, formatter)

    # Display welcome message
    print("Console Todo Application - Phase I")
    print("Type 'help' for available commands\n")

    # Main CLI loop
    try:
        while True:
            user_input = input("> ")
            output, should_exit = parser.parse_command(user_input)

            if output:
                print(output)

            if should_exit:
                break

    except KeyboardInterrupt:
        # Handle Ctrl+C gracefully
        print("\nGoodbye! All tasks have been cleared from memory.")
    except EOFError:
        # Handle Ctrl+D gracefully
        print("\nGoodbye! All tasks have been cleared from memory.")


if __name__ == "__main__":
    main()
