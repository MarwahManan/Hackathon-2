# Implementation Plan: In-Memory Python Console Todo Application

**Branch**: `001-console-todo-app` | **Date**: 2026-02-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-console-todo-app/spec.md`

## Summary

Build a clean, fully in-memory Python console Todo application that demonstrates specification-driven development principles. The application provides five core features (Add, View, Update, Delete, Mark Complete) through a command-line interface with strict separation between business logic and presentation layers. All data exists only in memory during the session, with no persistence. The architecture is designed to be forward-compatible with Phase II web application requirements.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: UV (package manager), pytest (testing only)
**Storage**: In-memory list-based repository (no persistence)
**Testing**: pytest with >80% coverage for business logic
**Target Platform**: Cross-platform console (Windows, macOS, Linux)
**Project Type**: Single project (console application)
**Performance Goals**: <1 second response for all operations with up to 1000 tasks
**Constraints**: No external dependencies for core functionality, standard library only
**Scale/Scope**: Single-user, single-session, up to 1000 tasks in memory

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Phase I Requirements Compliance

✅ **In-Memory Only**: Architecture uses list-based repository with no file or database persistence
✅ **Clear CLI**: Dedicated CLI module with command parsing and help system
✅ **Testable Business Logic**: Service and domain layers independent of CLI
✅ **PEP-8**: Will enforce via linting tools in project setup
✅ **Type Hints**: All function signatures and class attributes will use type hints
✅ **Test Coverage**: pytest with >80% coverage target for business logic

### Core Principles Compliance

✅ **Simplicity and Correctness**: Single project structure, minimal dependencies, clear data flow
✅ **Clean, Modular Architecture**: Five distinct modules (domain, repository, services, cli, utils)
✅ **Progressive Enhancement**: Domain models designed to be reusable in Phase II (FastAPI + SQLModel)
✅ **Production-Oriented**: Proper error handling, validation, and user feedback from the start
✅ **Separation of Concerns**: CLI → Service → Repository → Domain (no layer violations)

### Gates Status

**Pre-Research Gate**: ✅ PASSED
- No constitution violations
- Architecture aligns with Phase I standards
- Clear separation of concerns established

**Post-Design Gate**: Will re-evaluate after Phase 1 design artifacts

## Project Structure

### Documentation (this feature)

```text
specs/001-console-todo-app/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (technology decisions)
├── data-model.md        # Phase 1 output (domain model)
├── quickstart.md        # Phase 1 output (setup and usage)
├── contracts/           # Phase 1 output (CLI command contracts)
│   └── commands.md      # Command interface specifications
└── checklists/
    └── requirements.md  # Specification quality checklist (completed)
```

### Source Code (repository root)

```text
# Single project structure (Phase I)
main.py                  # Application entry point and CLI loop

src/
├── domain/
│   ├── __init__.py
│   └── todo.py          # Todo entity (id, description, completed)
├── repository/
│   ├── __init__.py
│   └── todo_repository.py  # In-memory list-based storage
├── services/
│   ├── __init__.py
│   └── todo_service.py  # Business logic (add, view, update, delete, complete)
├── cli/
│   ├── __init__.py
│   ├── parser.py        # Command parsing and routing
│   └── formatter.py     # Output formatting and display
└── utils/
    ├── __init__.py
    ├── validators.py    # Input validation
    └── errors.py        # Custom exception classes

tests/
├── unit/
│   ├── test_todo.py
│   ├── test_todo_repository.py
│   ├── test_todo_service.py
│   └── test_validators.py
└── integration/
    └── test_cli_integration.py

pyproject.toml           # UV project configuration
README.md                # Setup and usage instructions
.gitignore               # Python-specific ignores
```

**Structure Decision**: Single project structure is appropriate for Phase I console application. The five-module architecture (domain, repository, services, cli, utils) provides clear separation of concerns while remaining simple. This structure maps cleanly to Phase II where:
- `domain/` → SQLModel models
- `repository/` → Database repositories
- `services/` → FastAPI service layer
- `cli/` → Removed or kept for CLI client
- `utils/` → Shared utilities

## Complexity Tracking

No constitution violations. Complexity is minimal and justified:

| Decision | Rationale | Alternatives Considered |
|----------|-----------|-------------------------|
| Five-module structure | Clear separation of concerns required by constitution | Single-file approach rejected (violates modularity principle) |
| Repository pattern | Abstracts storage for Phase II compatibility | Direct list access rejected (violates separation of concerns) |
| Service layer | Centralizes business logic independent of UI | Logic in CLI rejected (violates testability requirement) |

## Architecture

### Component Responsibilities

**main.py**
- Application entry point
- Initialize dependencies (repository, service)
- Start CLI loop
- Handle graceful shutdown

**domain/todo.py**
- Todo entity definition
- Immutable data class with id, description, completed
- No business logic (pure data)

**repository/todo_repository.py**
- In-memory storage using Python list
- CRUD operations: add, get_by_id, get_all, update, delete
- ID generation (sequential integers)
- No business logic (pure data access)

**services/todo_service.py**
- Business logic layer
- Operations: add_task, view_all_tasks, update_task, delete_task, mark_complete
- Input validation coordination
- Error handling and user feedback
- Depends on repository, not CLI

**cli/parser.py**
- Command parsing from user input
- Command routing to service methods
- Help command implementation
- No business logic

**cli/formatter.py**
- Output formatting for task lists
- Success/error message display
- User-friendly presentation
- No business logic

**utils/validators.py**
- Input validation functions
- Description length checks
- ID format validation
- Reusable across layers

**utils/errors.py**
- Custom exception classes
- TaskNotFoundError
- InvalidInputError
- Clear error messages

### Data Flow

```
User Input
    ↓
CLI Parser (cli/parser.py)
    ↓
Todo Service (services/todo_service.py)
    ↓
Validators (utils/validators.py)
    ↓
Todo Repository (repository/todo_repository.py)
    ↓
Todo Domain (domain/todo.py)
    ↓
[In-Memory List Storage]
    ↓
Todo Domain (domain/todo.py)
    ↓
Todo Repository (repository/todo_repository.py)
    ↓
Todo Service (services/todo_service.py)
    ↓
CLI Formatter (cli/formatter.py)
    ↓
User Output
```

### Layer Boundaries

**Strict Rules**:
1. CLI never imports repository (must go through service)
2. Service never imports CLI (must return data, not format output)
3. Repository never imports service or CLI
4. Domain never imports anything except standard library
5. Utils can be imported by any layer

**Dependency Direction**: CLI → Service → Repository → Domain

## Phase 0: Research

### Research Questions

1. **Python 3.13+ Features**: What new features can we leverage for cleaner code?
2. **UV Package Manager**: Best practices for project setup and dependency management
3. **Type Hints**: Advanced typing patterns for domain models and service layer
4. **pytest Best Practices**: Structuring tests for >80% coverage
5. **PEP-8 Enforcement**: Recommended linting tools (ruff, black, mypy)

### Research Findings

**Python 3.13+ Features**:
- Decision: Use dataclasses with frozen=True for immutable Todo entities
- Rationale: Provides immutability, automatic __init__, __repr__, and type safety
- Alternatives: NamedTuple (less flexible), regular class (more boilerplate)

**UV Package Manager**:
- Decision: Use UV for project initialization and dependency management
- Rationale: Fast, modern Python package manager with excellent developer experience
- Commands: `uv init`, `uv add`, `uv run`
- Alternatives: pip + venv (slower, more manual), poetry (heavier)

**Type Hints**:
- Decision: Use strict typing with Optional, List, Protocol for interfaces
- Rationale: Catches errors early, improves IDE support, documents intent
- Tools: mypy for static type checking
- Alternatives: No type hints (rejected per constitution)

**pytest Best Practices**:
- Decision: Separate unit and integration tests, use fixtures for setup
- Rationale: Clear test organization, reusable test data, fast feedback
- Structure: tests/unit/ for isolated tests, tests/integration/ for CLI tests
- Coverage: pytest-cov plugin for coverage reporting

**PEP-8 Enforcement**:
- Decision: Use ruff (linter + formatter) and mypy (type checker)
- Rationale: Ruff is fast and comprehensive, mypy ensures type safety
- Configuration: pyproject.toml with strict settings
- Alternatives: black + flake8 (slower, more tools)

## Phase 1: Design & Contracts

### Data Model

See [data-model.md](./data-model.md) for complete domain model specification.

**Summary**:
- **Todo Entity**: id (int), description (str), completed (bool)
- **Validation Rules**: Description 1-500 chars, ID > 0
- **State Transitions**: incomplete → complete (one-way in Phase I)

### CLI Command Contracts

See [contracts/commands.md](./contracts/commands.md) for complete command specifications.

**Summary**:
- `add <description>` - Add new task
- `view` - View all tasks
- `update <id> <description>` - Update task description
- `delete <id>` - Delete task
- `complete <id>` - Mark task complete
- `help` - Show command help

### Quickstart

See [quickstart.md](./quickstart.md) for setup and usage instructions.

## Implementation Phases

### Phase 0: Project Setup
1. Initialize UV project with Python 3.13+
2. Configure pyproject.toml with dependencies and tools
3. Setup directory structure (src/, tests/)
4. Configure linting (ruff, mypy) and testing (pytest)

### Phase 1: Domain Layer
1. Implement Todo entity (domain/todo.py)
2. Write unit tests for Todo entity
3. Validate immutability and type safety

### Phase 2: Repository Layer
1. Implement TodoRepository (repository/todo_repository.py)
2. In-memory list storage with CRUD operations
3. ID generation logic
4. Write unit tests for repository

### Phase 3: Service Layer
1. Implement TodoService (services/todo_service.py)
2. Business logic for all five operations
3. Integration with validators
4. Write unit tests for service

### Phase 4: Utils Layer
1. Implement validators (utils/validators.py)
2. Implement custom errors (utils/errors.py)
3. Write unit tests for validators

### Phase 5: CLI Layer
1. Implement command parser (cli/parser.py)
2. Implement output formatter (cli/formatter.py)
3. Write integration tests for CLI

### Phase 6: Application Entry Point
1. Implement main.py with CLI loop
2. Dependency injection setup
3. Manual console testing

### Phase 7: Documentation & Polish
1. Write README.md with setup and usage
2. Verify >80% test coverage
3. Run linting and type checking
4. Final validation against success criteria

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-engineering for Phase I | Medium | Keep implementation simple, add complexity only when needed |
| Poor layer separation | High | Enforce dependency rules via code review and testing |
| Insufficient test coverage | Medium | Write tests alongside implementation, use coverage reporting |
| Type hint complexity | Low | Start simple, add advanced types only where beneficial |
| UV adoption learning curve | Low | Follow official UV documentation, keep setup minimal |

## Success Criteria Validation

Mapping implementation to success criteria from spec.md:

- **SC-001**: Service layer operations complete in <1s ✓
- **SC-002**: Repository handles 1000 tasks efficiently ✓
- **SC-003**: Service returns updated data immediately ✓
- **SC-004**: Service returns updated data immediately ✓
- **SC-005**: Repository removes task, service confirms ✓
- **SC-006**: Help command in CLI parser ✓
- **SC-007**: Error handling in service and utils ✓
- **SC-008**: No external dependencies (standard library only) ✓
- **SC-009**: Service layer independently testable ✓
- **SC-010**: Clear structure and README ✓

## Next Steps

1. ✅ Specification complete (spec.md)
2. ✅ Implementation plan complete (plan.md)
3. ⏭️ Run `/sp.tasks` to generate task breakdown
4. ⏭️ Implement following task order
5. ⏭️ Validate against success criteria
6. ⏭️ Prepare for Phase II migration
