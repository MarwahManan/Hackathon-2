# Tasks: In-Memory Python Console Todo Application

**Input**: Design documents from `/specs/001-console-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below use single project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize UV project with Python 3.13+ using `uv init`
- [ ] T002 Create pyproject.toml with project metadata and dev dependencies (pytest, pytest-cov, ruff, mypy)
- [ ] T003 [P] Create directory structure: src/{domain,repository,services,cli,utils}/ with __init__.py files
- [ ] T004 [P] Create tests/{unit,integration}/ directories
- [ ] T005 [P] Configure ruff in pyproject.toml (line-length=100, target-version=py313, select rules)
- [ ] T006 [P] Configure mypy in pyproject.toml (strict=true, python_version=3.13)
- [ ] T007 [P] Configure pytest in pyproject.toml (testpaths, python_files)
- [ ] T008 [P] Create .gitignore for Python (venv, __pycache__, .pytest_cache, .mypy_cache, .ruff_cache)
- [ ] T009 [P] Create README.md with project overview and setup instructions

**Checkpoint**: Project structure ready - foundational code can now begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 [P] Create custom exception classes in src/utils/errors.py (TodoError, TaskNotFoundError, InvalidInputError)
- [ ] T011 [P] Implement validate_description function in src/utils/validators.py (1-500 chars, not empty)
- [ ] T012 [P] Implement validate_task_id function in src/utils/validators.py (positive integer check)
- [ ] T013 Create Todo entity dataclass in src/domain/todo.py (id: int, description: str, completed: bool, frozen=True)
- [ ] T014 Add __post_init__ validation to Todo entity in src/domain/todo.py (validate id > 0, description not empty, length <= 500)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 & 2 - View and Add Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to add tasks and view all tasks - this is the minimum viable product

**Independent Test**: User can add a task with description and see it in the task list with ID and status

### Implementation for User Story 1 & 2

- [ ] T015 Create TodoRepository class in src/repository/todo_repository.py with __init__ (empty list, next_id=1)
- [ ] T016 [US1] Implement get_all method in src/repository/todo_repository.py (return list of all todos)
- [ ] T017 [US2] Implement add method in src/repository/todo_repository.py (create Todo with auto-generated ID, append to list, increment next_id)
- [ ] T018 Create TodoService class in src/services/todo_service.py with __init__ (accept repository)
- [ ] T019 [US1] Implement view_all_tasks method in src/services/todo_service.py (call repository.get_all, return list)
- [ ] T020 [US2] Implement add_task method in src/services/todo_service.py (validate description, call repository.add, return tuple[Todo|None, str])
- [ ] T021 [P] [US1] Create Formatter class in src/cli/formatter.py with format_task_list method (display tasks with [ID] [✓/  ] description)
- [ ] T022 [P] [US1] Implement format_empty_list method in src/cli/formatter.py (display "No tasks found" message)
- [ ] T023 [P] Create Parser class in src/cli/parser.py with parse_command method (extract command and args from input)
- [ ] T024 [US1] Implement handle_view_command in src/cli/parser.py (call service.view_all_tasks, format output)
- [ ] T025 [US2] Implement handle_add_command in src/cli/parser.py (extract description, call service.add_task, display result)
- [ ] T026 [P] Implement handle_help_command in src/cli/parser.py (display all available commands with examples)
- [ ] T027 [P] Implement handle_exit_command in src/cli/parser.py (display goodbye message, return exit flag)
- [ ] T028 Create main.py with CLI loop (initialize repository and service, loop for user input, call parser, handle exit)

**Checkpoint**: At this point, User Stories 1 & 2 (MVP) should be fully functional - users can add and view tasks

---

## Phase 4: User Story 3 - Mark Task Complete (Priority: P2)

**Goal**: Enable users to mark tasks as complete to track progress

**Independent Test**: User can mark an incomplete task as complete and see the status change in the task list

### Implementation for User Story 3

- [ ] T029 [US3] Implement get_by_id method in src/repository/todo_repository.py (find todo by id, return Todo|None)
- [ ] T030 [US3] Implement mark_complete method in src/repository/todo_repository.py (find todo, create new Todo with completed=True, replace in list)
- [ ] T031 [US3] Implement mark_complete method in src/services/todo_service.py (validate id, call repository.mark_complete, return tuple[bool, str])
- [ ] T032 [US3] Add logic to handle already-complete tasks in src/services/todo_service.py (return informational message, not error)
- [ ] T033 [US3] Implement handle_complete_command in src/cli/parser.py (extract id, call service.mark_complete, display result)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 5: User Story 4 - Update Task Description (Priority: P3)

**Goal**: Enable users to update task descriptions to correct mistakes or refine requirements

**Independent Test**: User can update a task's description and see the change reflected in the task list

### Implementation for User Story 4

- [ ] T034 [US4] Implement update method in src/repository/todo_repository.py (find todo, create new Todo with updated description, replace in list)
- [ ] T035 [US4] Implement update_task method in src/services/todo_service.py (validate id and description, call repository.update, return tuple[bool, str])
- [ ] T036 [US4] Implement handle_update_command in src/cli/parser.py (extract id and description, call service.update_task, display result)

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 6: User Story 5 - Delete Task (Priority: P3)

**Goal**: Enable users to delete tasks that are no longer relevant

**Independent Test**: User can delete a task and verify it no longer appears in the task list

### Implementation for User Story 5

- [ ] T037 [US5] Implement delete method in src/repository/todo_repository.py (find todo by id, remove from list, return bool)
- [ ] T038 [US5] Implement delete_task method in src/services/todo_service.py (validate id, call repository.delete, return tuple[bool, str])
- [ ] T039 [US5] Implement handle_delete_command in src/cli/parser.py (extract id, call service.delete_task, display result)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T040 [P] Add error handling for invalid commands in src/cli/parser.py (display "Unknown command" with help suggestion)
- [ ] T041 [P] Add error handling for missing arguments in src/cli/parser.py (display usage information)
- [ ] T042 [P] Add input trimming and whitespace handling in src/cli/parser.py (normalize user input)
- [ ] T043 [P] Add success/error message formatting in src/cli/formatter.py (✓ for success, ✗ for error, ℹ for info)
- [ ] T044 [P] Add graceful Ctrl+C handling in main.py (catch KeyboardInterrupt, display goodbye message)
- [ ] T045 [P] Run ruff format on all source files (format code to PEP-8 standards)
- [ ] T046 [P] Run ruff check on all source files (fix linting issues)
- [ ] T047 [P] Run mypy on src/ directory (fix type checking issues)
- [ ] T048 Update README.md with complete usage examples and command reference
- [ ] T049 Validate against success criteria from spec.md (all 10 criteria must pass)
- [ ] T050 Run manual console testing following quickstart.md example session

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 & 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (MVP)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Requires repository.get_by_id but independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Requires repository.get_by_id but independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Independently testable

### Within Each User Story

- Repository methods before service methods
- Service methods before CLI handlers
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T009)
- All Foundational tasks marked [P] can run in parallel (T010-T012)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Within User Story 1 & 2: T021-T023 can run in parallel (formatter and parser setup)
- Polish tasks marked [P] can run in parallel (T040-T047)

---

## Parallel Example: User Story 1 & 2 (MVP)

```bash
# After Foundational phase completes, these can run in parallel:
Task T021: Create Formatter class (different file from Parser)
Task T022: Implement format_empty_list (same file as T021, sequential)
Task T023: Create Parser class (different file from Formatter)

# Then these run sequentially within their respective stories:
Task T024: Implement handle_view_command (depends on T023)
Task T025: Implement handle_add_command (depends on T023)
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T014) - CRITICAL, blocks all stories
3. Complete Phase 3: User Stories 1 & 2 (T015-T028)
4. **STOP and VALIDATE**: Test MVP independently
   - Can add tasks with descriptions
   - Can view all tasks with IDs and status
   - Error handling works (empty description, invalid input)
   - Help command displays correctly
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Stories 1 & 2 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 → Test independently → Deploy/Demo
4. Add User Story 4 → Test independently → Deploy/Demo
5. Add User Story 5 → Test independently → Deploy/Demo
6. Add Polish → Final validation → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T014)
2. Once Foundational is done:
   - Developer A: User Stories 1 & 2 (T015-T028) - MVP
   - Developer B: User Story 3 (T029-T033)
   - Developer C: User Story 4 (T034-T036)
   - Developer D: User Story 5 (T037-T039)
3. Stories complete and integrate independently
4. Team completes Polish together (T040-T050)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are NOT included as they were not requested in the specification

---

## Task Count Summary

- **Total Tasks**: 50
- **Setup Phase**: 9 tasks (T001-T009)
- **Foundational Phase**: 5 tasks (T010-T014)
- **User Story 1 & 2 (P1 - MVP)**: 14 tasks (T015-T028)
- **User Story 3 (P2)**: 5 tasks (T029-T033)
- **User Story 4 (P3)**: 3 tasks (T034-T036)
- **User Story 5 (P3)**: 3 tasks (T037-T039)
- **Polish Phase**: 11 tasks (T040-T050)

**Parallel Opportunities**: 15 tasks can run in parallel (marked with [P])

**MVP Scope**: Phases 1-3 (T001-T028) = 28 tasks for minimum viable product

**Independent Test Criteria**:
- MVP (US1 & US2): User can add tasks and view them in a list
- US3: User can mark tasks complete and see status change
- US4: User can update task descriptions and see changes
- US5: User can delete tasks and verify removal
