# Console Todo Application - Phase I

A clean, fully in-memory Python console Todo application demonstrating specification-driven development principles.

## Features

- **Add Tasks**: Create new tasks with descriptions
- **View Tasks**: Display all tasks with IDs and completion status
- **Mark Complete**: Mark tasks as complete to track progress
- **Update Tasks**: Modify task descriptions
- **Delete Tasks**: Remove tasks that are no longer needed

## Requirements

- Python 3.13 or higher
- UV package manager

## Installation

1. Install UV package manager:
   ```bash
   # macOS/Linux
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # Windows (PowerShell)
   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

2. Install dependencies:
   ```bash
   uv sync
   ```

## Usage

Run the application:
```bash
uv run python main.py
```

### Available Commands

- `add <description>` - Add a new task
- `view` - View all tasks
- `complete <id>` - Mark task as complete
- `update <id> <description>` - Update task description
- `delete <id>` - Delete a task
- `help` - Show help message
- `exit` - Exit the application

### Example Session

```
> add Write unit tests
✓ Task added successfully (ID: 1)

> add Review pull request
✓ Task added successfully (ID: 2)

> view
Tasks:
  [1] [ ] Write unit tests
  [2] [ ] Review pull request

> complete 1
✓ Task 1 marked as complete

> view
Tasks:
  [1] [✓] Write unit tests
  [2] [ ] Review pull request

> exit
Goodbye! All tasks have been cleared from memory.
```

## Development

### Run Tests

```bash
uv run pytest
```

### Run Tests with Coverage

```bash
uv run pytest --cov=src --cov-report=term-missing
```

### Code Quality

```bash
# Linting
uv run ruff check src/ tests/

# Formatting
uv run ruff format src/ tests/

# Type checking
uv run mypy src/
```

## Project Structure

```
console-todo-app/
├── main.py                      # Application entry point
├── src/
│   ├── domain/
│   │   └── todo.py              # Todo entity
│   ├── repository/
│   │   └── todo_repository.py   # In-memory storage
│   ├── services/
│   │   └── todo_service.py      # Business logic
│   ├── cli/
│   │   ├── parser.py            # Command parsing
│   │   └── formatter.py         # Output formatting
│   └── utils/
│       ├── validators.py        # Input validation
│       └── errors.py            # Custom exceptions
├── tests/
│   ├── unit/                    # Unit tests
│   └── integration/             # Integration tests
└── pyproject.toml               # Project configuration
```

## Important Notes

⚠️ **All data is stored in memory only**. When you exit the application, all tasks are permanently lost.

## Architecture

The application follows clean architecture principles with strict layer separation:

- **CLI Layer**: Command parsing and output formatting
- **Service Layer**: Business logic and validation
- **Repository Layer**: In-memory data storage
- **Domain Layer**: Todo entity definition

## License

[Add license information]

## Contributors

[Add contributor information]
