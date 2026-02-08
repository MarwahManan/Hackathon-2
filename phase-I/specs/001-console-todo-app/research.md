# Research: In-Memory Python Console Todo Application

**Feature**: 001-console-todo-app
**Date**: 2026-02-06
**Phase**: Phase 0 - Research & Technology Decisions

## Research Questions

This document captures research findings for technology choices and best practices for the Phase I console todo application.

### 1. Python 3.13+ Features

**Question**: What Python 3.13+ features can we leverage for cleaner, more maintainable code?

**Research Findings**:
- **Dataclasses with frozen=True**: Provides immutable entities with automatic `__init__`, `__repr__`, `__eq__`, and type safety
- **Improved type hints**: Better support for generic types and type narrowing
- **Better error messages**: Enhanced traceback information for debugging
- **Performance improvements**: Faster startup and execution times

**Decision**: Use `@dataclass(frozen=True)` for Todo entity

**Rationale**:
- Immutability prevents accidental state changes
- Automatic methods reduce boilerplate
- Type safety catches errors at development time
- Clean, readable code that's easy to understand

**Alternatives Considered**:
- NamedTuple: Less flexible, harder to extend in Phase II
- Regular class: More boilerplate, manual implementation of equality and repr
- Pydantic BaseModel: Overkill for Phase I, adds external dependency

### 2. UV Package Manager

**Question**: How should we structure the project using UV for optimal developer experience?

**Research Findings**:
- UV is a fast, modern Python package manager written in Rust
- Commands: `uv init` (create project), `uv add` (add dependency), `uv run` (run scripts)
- Automatically manages virtual environments
- Compatible with pip and standard Python packaging
- Significantly faster than pip for dependency resolution

**Decision**: Use UV for project initialization and dependency management

**Rationale**:
- Fast dependency resolution and installation
- Automatic virtual environment management
- Modern tooling aligned with Python best practices
- Specified in project requirements

**Project Structure**:
```toml
[project]
name = "console-todo-app"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = []

[project.optional-dependencies]
dev = ["pytest>=8.0.0", "pytest-cov>=4.1.0", "ruff>=0.1.0", "mypy>=1.8.0"]

[tool.ruff]
line-length = 100
target-version = "py313"

[tool.mypy]
python_version = "3.13"
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
```

**Alternatives Considered**:
- pip + venv: Slower, more manual setup, no automatic environment management
- Poetry: Heavier, more complex, slower than UV
- Pipenv: Deprecated, not recommended for new projects

### 3. Type Hints Strategy

**Question**: What type hinting strategy should we use for maximum benefit with minimal complexity?

**Research Findings**:
- Python 3.13+ supports modern type hint syntax (PEP 604: `X | Y` instead of `Union[X, Y]`)
- Type hints improve IDE support, catch errors early, and document intent
- mypy provides static type checking
- Protocol classes enable structural typing for interfaces

**Decision**: Use strict typing with modern syntax

**Type Hint Patterns**:
```python
# Modern union syntax
def get_task(task_id: int) -> Todo | None: ...

# Generic collections
def get_all_tasks() -> list[Todo]: ...

# Protocol for repository interface
from typing import Protocol

class TodoRepositoryProtocol(Protocol):
    def add(self, todo: Todo) -> Todo: ...
    def get_by_id(self, task_id: int) -> Todo | None: ...
```

**Rationale**:
- Constitution requires type hints for all signatures
- Modern syntax is cleaner and more readable
- Protocols enable dependency inversion without inheritance
- mypy catches type errors before runtime

**Alternatives Considered**:
- No type hints: Rejected (violates constitution)
- Partial type hints: Inconsistent, defeats the purpose
- Complex generic types: Overkill for Phase I simplicity

### 4. Testing Strategy

**Question**: How should we structure tests to achieve >80% coverage while maintaining clarity?

**Research Findings**:
- pytest is the de facto standard for Python testing
- Fixtures enable reusable test data and setup
- Separate unit and integration tests for clarity
- pytest-cov provides coverage reporting
- Test organization: tests/unit/ for isolated tests, tests/integration/ for end-to-end

**Decision**: pytest with fixtures, separate unit/integration tests

**Test Structure**:
```
tests/
├── unit/
│   ├── test_todo.py              # Domain entity tests
│   ├── test_todo_repository.py   # Repository tests (with mock data)
│   ├── test_todo_service.py      # Service tests (with mock repository)
│   └── test_validators.py        # Validator tests
└── integration/
    └── test_cli_integration.py   # End-to-end CLI tests
```

**Coverage Target**: >80% for business logic (domain, repository, services, utils)

**Rationale**:
- Clear separation between unit and integration tests
- Fast feedback from unit tests
- Integration tests validate end-to-end behavior
- Fixtures reduce test code duplication

**Alternatives Considered**:
- unittest: More verbose, less Pythonic
- Mixed test organization: Harder to run subsets of tests
- 100% coverage target: Diminishing returns, slows development

### 5. Code Quality Tools

**Question**: What linting and formatting tools should we use to enforce PEP-8 and code quality?

**Research Findings**:
- Ruff: Fast, comprehensive linter and formatter (replaces black, flake8, isort)
- mypy: Static type checker
- Both integrate with VS Code, PyCharm, and other IDEs
- Configuration via pyproject.toml

**Decision**: Ruff for linting/formatting, mypy for type checking

**Configuration**:
```toml
[tool.ruff]
line-length = 100
target-version = "py313"
select = ["E", "F", "I", "N", "W", "UP"]  # Error, pyflakes, isort, naming, warnings, pyupgrade

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

[tool.mypy]
python_version = "3.13"
strict = true
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
```

**Rationale**:
- Ruff is 10-100x faster than black + flake8
- Single tool reduces complexity
- mypy ensures type safety
- Strict settings catch issues early

**Alternatives Considered**:
- black + flake8 + isort: Slower, multiple tools
- pylint: Slower, more opinionated
- No linting: Rejected (violates constitution PEP-8 requirement)

## Architecture Decisions

### Repository Pattern

**Decision**: Use repository pattern to abstract data access

**Rationale**:
- Separates data access from business logic
- Makes service layer testable with mock repositories
- Enables Phase II migration (swap in-memory list for database)
- Follows clean architecture principles

**Implementation**:
```python
class TodoRepository:
    def __init__(self) -> None:
        self._todos: list[Todo] = []
        self._next_id: int = 1

    def add(self, description: str) -> Todo: ...
    def get_by_id(self, task_id: int) -> Todo | None: ...
    def get_all(self) -> list[Todo]: ...
    def update(self, task_id: int, description: str) -> Todo | None: ...
    def delete(self, task_id: int) -> bool: ...
```

### Service Layer

**Decision**: Centralize business logic in service layer

**Rationale**:
- Single source of truth for business rules
- Testable without CLI
- Reusable across interfaces (console, web, API)
- Coordinates validation and repository operations

**Implementation**:
```python
class TodoService:
    def __init__(self, repository: TodoRepository) -> None:
        self._repository = repository

    def add_task(self, description: str) -> tuple[Todo | None, str]: ...
    def view_all_tasks(self) -> list[Todo]: ...
    def update_task(self, task_id: int, description: str) -> tuple[bool, str]: ...
    def delete_task(self, task_id: int) -> tuple[bool, str]: ...
    def mark_complete(self, task_id: int) -> tuple[bool, str]: ...
```

### CLI Separation

**Decision**: Separate command parsing from output formatting

**Rationale**:
- Single responsibility principle
- Parser focuses on input interpretation
- Formatter focuses on output presentation
- Both are independently testable

## Phase II Compatibility

### Forward Compatibility Considerations

**Domain Model**:
- Todo entity maps directly to SQLModel
- Add `created_at`, `updated_at` timestamps in Phase II
- Add `user_id` foreign key in Phase II

**Repository Pattern**:
- Interface remains the same
- Swap in-memory list for database queries
- Add async/await in Phase II

**Service Layer**:
- No changes required
- Add async/await in Phase II
- Business logic remains identical

**CLI Layer**:
- Can be kept as CLI client for API
- Or replaced with web frontend
- Service layer remains reusable

## Summary

All research questions resolved. Technology stack:
- **Language**: Python 3.13+
- **Package Manager**: UV
- **Testing**: pytest + pytest-cov
- **Linting**: ruff
- **Type Checking**: mypy
- **Architecture**: Repository pattern + Service layer + CLI separation

Ready to proceed to Phase 1 design artifacts.
