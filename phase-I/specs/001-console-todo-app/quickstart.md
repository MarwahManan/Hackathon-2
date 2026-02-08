# Quickstart Guide: Console Todo Application

**Feature**: 001-console-todo-app
**Date**: 2026-02-06
**Phase**: Phase I - In-Memory Python Console App

## Overview

This guide provides setup instructions and usage examples for the Phase I console todo application. The application is a simple, in-memory task manager that runs in your terminal.

## Prerequisites

- **Python**: Version 3.13 or higher
- **UV**: Python package manager (installation instructions below)
- **Operating System**: Windows, macOS, or Linux

## Installation

### 1. Install UV Package Manager

**macOS/Linux**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell)**:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Verify Installation**:
```bash
uv --version
```

### 2. Clone Repository

```bash
git clone <repository-url>
cd console-todo-app
git checkout 001-console-todo-app
```

### 3. Install Dependencies

UV automatically manages the virtual environment and dependencies:

```bash
uv sync
```

This installs:
- Development dependencies (pytest, ruff, mypy)
- No runtime dependencies (standard library only)

## Running the Application

### Start the Application

```bash
uv run python main.py
```

You'll see the welcome prompt:

```
Console Todo Application - Phase I
Type 'help' for available commands

>
```

### Basic Usage

**Add a task**:
```
> add Write unit tests
✓ Task added successfully (ID: 1)
```

**View all tasks**:
```
> view
Tasks:
  [1] [ ] Write unit tests
```

**Mark task complete**:
```
> complete 1
✓ Task 1 marked as complete

> view
Tasks:
  [1] [✓] Write unit tests
```

**Update task description**:
```
> update 1 Write integration tests
✓ Task 1 updated successfully
```

**Delete a task**:
```
> delete 1
✓ Task 1 deleted successfully
```

**Get help**:
```
> help
[Displays all available commands]
```

**Exit application**:
```
> exit
Goodbye! All tasks have been cleared from memory.
```

## Command Reference

| Command | Syntax | Description |
|---------|--------|-------------|
| add | `add <description>` | Add a new task |
| view | `view` | View all tasks |
| update | `update <id> <description>` | Update task description |
| delete | `delete <id>` | Delete a task |
| complete | `complete <id>` | Mark task as complete |
| help | `help` | Show help message |
| exit | `exit` | Exit application |

## Example Session

Here's a complete example session demonstrating all features:

```
> add Write unit tests
✓ Task added successfully (ID: 1)

> add Review pull request
✓ Task added successfully (ID: 2)

> add Update documentation
✓ Task added successfully (ID: 3)

> view
Tasks:
  [1] [ ] Write unit tests
  [2] [ ] Review pull request
  [3] [ ] Update documentation

> complete 1
✓ Task 1 marked as complete

> complete 2
✓ Task 2 marked as complete

> view
Tasks:
  [1] [✓] Write unit tests
  [2] [✓] Review pull request
  [3] [ ] Update documentation

> update 3 Update README documentation
✓ Task 3 updated successfully

> view
Tasks:
  [1] [✓] Write unit tests
  [2] [✓] Review pull request
  [3] [ ] Update README documentation

> delete 1
✓ Task 1 deleted successfully

> view
Tasks:
  [2] [✓] Review pull request
  [3] [ ] Update README documentation

> exit
Goodbye! All tasks have been cleared from memory.
```

## Development

### Project Structure

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
├── pyproject.toml               # Project configuration
└── README.md                    # Project documentation
```

### Running Tests

**Run all tests**:
```bash
uv run pytest
```

**Run with coverage**:
```bash
uv run pytest --cov=src --cov-report=term-missing
```

**Run specific test file**:
```bash
uv run pytest tests/unit/test_todo_service.py
```

**Run tests in watch mode** (requires pytest-watch):
```bash
uv run ptw
```

### Code Quality

**Run linter**:
```bash
uv run ruff check src/ tests/
```

**Auto-fix linting issues**:
```bash
uv run ruff check --fix src/ tests/
```

**Format code**:
```bash
uv run ruff format src/ tests/
```

**Type checking**:
```bash
uv run mypy src/
```

**Run all quality checks**:
```bash
uv run ruff check src/ tests/ && \
uv run ruff format --check src/ tests/ && \
uv run mypy src/ && \
uv run pytest --cov=src
```

## Important Notes

### Data Persistence

⚠️ **All data is stored in memory only**. When you exit the application, all tasks are permanently lost. This is intentional for Phase I.

**What this means**:
- No files are created
- No database is used
- Closing the terminal loses all data
- Each session starts fresh

**Phase II** will add database persistence with PostgreSQL.

### Task IDs

- Task IDs are sequential integers starting from 1
- IDs are never reused within a session
- Deleting task 1 doesn't change other task IDs
- After deleting task 1, the next new task gets the next available ID (not 1)

### Input Validation

- Task descriptions must be 1-500 characters
- Empty or whitespace-only descriptions are rejected
- Task IDs must be positive integers
- Invalid commands show helpful error messages

### Error Handling

The application handles errors gracefully:
- Invalid commands suggest using `help`
- Missing arguments show usage information
- Non-existent task IDs show "Task not found"
- Validation errors explain what's wrong

## Troubleshooting

### "Command not found: uv"

**Solution**: Install UV package manager (see Installation section)

### "Python version 3.13 required"

**Solution**: Install Python 3.13+ from [python.org](https://www.python.org/downloads/)

### "Module not found" errors

**Solution**: Run `uv sync` to install dependencies

### Application doesn't start

**Solution**: Ensure you're in the correct directory and branch:
```bash
git branch --show-current  # Should show: 001-console-todo-app
uv run python main.py
```

### Tests fail

**Solution**: Ensure all dependencies are installed:
```bash
uv sync
uv run pytest -v  # Verbose output to see which tests fail
```

## Next Steps

After completing Phase I:

1. **Validate Success Criteria**: Ensure all requirements from spec.md are met
2. **Review Code Quality**: Check test coverage >80%, PEP-8 compliance
3. **Prepare for Phase II**: Review data model for database compatibility
4. **Documentation**: Update README.md with any changes

## Phase II Preview

Phase II will add:
- **Web Interface**: Next.js frontend
- **REST API**: FastAPI backend
- **Database**: PostgreSQL (Neon) for persistence
- **Authentication**: User accounts and login
- **Multi-user**: Task isolation per user

The current architecture is designed to migrate smoothly to Phase II with minimal changes to business logic.

## Support

For issues or questions:
- Check the [spec.md](./spec.md) for requirements
- Review [plan.md](./plan.md) for architecture details
- See [data-model.md](./data-model.md) for domain model
- Check [contracts/commands.md](./contracts/commands.md) for command specifications

## License

[Add license information]

## Contributors

[Add contributor information]
