# Tasks: Backend & API for Todo Application

**Input**: Design documents from `/specs/003-backend-api/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Backend code: `backend/app/`
- Tests: `backend/tests/`
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend directory structure: backend/app/{models,schemas,middleware,routers,utils}, backend/tests/
- [X] T002 Create requirements.txt with FastAPI 0.104+, SQLModel 0.14+, Pydantic 2.0+, PyJWT 2.8+, psycopg2-binary 2.9+, python-dotenv 1.0+, uvicorn, pytest, httpx
- [X] T003 [P] Create .env.example with DATABASE_URL, JWT_SECRET, JWT_ALGORITHM, ENVIRONMENT, LOG_LEVEL, FRONTEND_URL, HOST, PORT
- [X] T004 [P] Create .gitignore with .env, venv/, __pycache__/, *.pyc
- [X] T005 [P] Create backend/README.md with setup instructions from quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create app/config.py with Settings class using pydantic-settings to load environment variables
- [X] T007 Create app/database.py with SQLAlchemy engine, create_db_and_tables(), and get_db() dependency for session management
- [X] T008 [P] Create app/models/__init__.py (empty module initializer)
- [X] T009 Create app/models/user.py with User SQLModel (id UUID, email str unique indexed, created_at, updated_at)
- [X] T010 [P] Create app/schemas/__init__.py (empty module initializer)
- [X] T011 [P] Create app/schemas/error.py with ErrorResponse schema (error: str, code: str, details: Optional[List])
- [X] T012 [P] Create app/utils/__init__.py (empty module initializer)
- [X] T013 Create app/utils/jwt.py with verify_token(token: str) -> UUID function using PyJWT to decode and validate JWT tokens
- [X] T014 [P] Create app/utils/logging.py with logging configuration (JSON format, log levels, request/error logging)
- [X] T015 [P] Create app/middleware/__init__.py (empty module initializer)
- [X] T016 Create app/middleware/auth.py with get_current_user() dependency using HTTPBearer and verify_token()
- [X] T017 [P] Create app/routers/__init__.py (empty module initializer)
- [X] T018 Create app/__init__.py (empty module initializer)
- [X] T019 Create app/main.py with FastAPI app initialization, CORS middleware configuration, health check endpoint, and startup event for create_db_and_tables()

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Retrieve User's Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to retrieve all their tasks via GET /api/tasks

**Independent Test**: Make authenticated GET request to /api/tasks with valid JWT token and verify only authenticated user's tasks are returned with correct structure

### Implementation for User Story 1

- [X] T020 [P] [US1] Create app/models/task.py with Task SQLModel (id UUID, user_id UUID FK, title str, description Optional[str], is_completed bool default False, created_at, updated_at)
- [X] T021 [P] [US1] Create app/schemas/task.py with TaskResponse schema (id, user_id, title, description, is_completed, created_at, updated_at) with from_attributes=True
- [X] T022 [US1] Create app/routers/tasks.py with APIRouter and GET /api/tasks endpoint that queries Task filtered by current_user, returns List[TaskResponse]
- [X] T023 [US1] Add tasks router to app/main.py with app.include_router(tasks.router)

**Checkpoint**: User Story 1 complete - users can retrieve their tasks independently

---

## Phase 4: User Story 2 - Create New Task (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to create new tasks via POST /api/tasks

**Independent Test**: Make authenticated POST request to /api/tasks with task data and verify task is created with correct user_id and returned in subsequent GET requests

### Implementation for User Story 2

- [X] T024 [US2] Add TaskCreate schema to app/schemas/task.py (title str 1-200 chars required, description Optional[str] max 2000 chars) with field validators for title_not_empty and description_strip
- [X] T025 [US2] Add POST /api/tasks endpoint to app/routers/tasks.py that creates Task with user_id from current_user, returns TaskResponse with 201 status

**Checkpoint**: User Stories 1 AND 2 complete - users can retrieve and create tasks independently

---

## Phase 5: User Story 3 & 5 - Update Task & Toggle Completion (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to update task title, description, and completion status via PUT /api/tasks/{id}

**Independent Test**: Create a task, make authenticated PUT request with updated data, verify changes persist and only task owner can update

**Note**: User Story 3 (Update Task) and User Story 5 (Toggle Completion) share the same PUT endpoint implementation

### Implementation for User Stories 3 & 5

- [X] T026 [US3] Add TaskUpdate schema to app/schemas/task.py (title Optional[str], description Optional[str], is_completed Optional[bool]) with field validator for title_not_empty
- [X] T027 [US3] Add PUT /api/tasks/{id} endpoint to app/routers/tasks.py that queries Task by id and user_id, updates provided fields, returns TaskResponse with 200 status or 404 if not found

**Checkpoint**: User Stories 1, 2, 3, AND 5 complete - users can retrieve, create, update, and toggle task completion independently

---

## Phase 6: User Story 4 - Delete Task (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to permanently delete their tasks via DELETE /api/tasks/{id}

**Independent Test**: Create a task, make authenticated DELETE request, verify task no longer appears in GET requests

### Implementation for User Story 4

- [X] T028 [US4] Add DELETE /api/tasks/{id} endpoint to app/routers/tasks.py that queries Task by id and user_id, deletes task, returns success message with 200 status or 404 if not found

**Checkpoint**: All P1 MVP user stories complete (US1-5) - full CRUD functionality operational

---

## Phase 7: User Story 6 - Retrieve Single Task (Priority: P2)

**Goal**: Enable authenticated users to retrieve a specific task by ID via GET /api/tasks/{id}

**Independent Test**: Create a task, make authenticated GET request to /api/tasks/{id}, verify correct task data returned and 404 for non-existent or other users' tasks

### Implementation for User Story 6

- [X] T029 [US6] Add GET /api/tasks/{id} endpoint to app/routers/tasks.py that queries Task by id and user_id, returns TaskResponse with 200 status or 404 if not found

**Checkpoint**: All user stories complete (US1-6) - full API functionality operational

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T030 [P] Add comprehensive error handling to all endpoints with consistent ErrorResponse format
- [X] T031 [P] Add request/response logging to all endpoints using app/utils/logging.py
- [X] T032 [P] Add input validation error messages with field-specific details for all endpoints
- [X] T033 [P] Verify CORS configuration allows frontend origin with credentials
- [X] T034 [P] Add database connection error handling with 500 Internal Server Error responses
- [X] T035 [P] Verify all database queries use parameterized statements (SQLModel handles this automatically)
- [X] T036 [P] Add updated_at timestamp auto-update on Task modifications
- [X] T037 Run backend server with uvicorn and verify all endpoints via Swagger UI at http://localhost:8000/docs
- [X] T038 Verify health check endpoint returns {"status": "healthy"} at http://localhost:8000/health

**Status**: All tasks complete! Database tables created successfully in Neon PostgreSQL.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 stories → P2 stories)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 & 5 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 6 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before endpoints (Task model needed for queries)
- Schemas before endpoints (validation schemas needed for request/response)
- All P1 stories are independent and can be implemented in any order after Foundational phase

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005)
- All Foundational tasks marked [P] can run in parallel within their dependencies:
  - T008, T010, T011, T012, T014, T015, T017, T018 (module initializers and utilities)
- Once Foundational phase completes, ALL user stories can start in parallel (if team capacity allows):
  - US1, US2, US3/5, US4, US6 are fully independent
- Within US1: T020 and T021 can run in parallel (model and schema in different files)
- All Polish tasks marked [P] can run in parallel (T030-T036)

---

## Parallel Example: After Foundational Phase

```bash
# Launch all P1 MVP user stories in parallel (if team has capacity):
Task: "Create Task model in app/models/task.py" (US1)
Task: "Add TaskCreate schema to app/schemas/task.py" (US2)
Task: "Add TaskUpdate schema to app/schemas/task.py" (US3)
Task: "Add DELETE endpoint to app/routers/tasks.py" (US4)

# Or work sequentially through user stories:
# Complete US1 → Test independently → Complete US2 → Test independently → etc.
```

---

## Implementation Strategy

### MVP First (P1 User Stories Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T019) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T020-T023) - Retrieve tasks
4. Complete Phase 4: User Story 2 (T024-T025) - Create tasks
5. Complete Phase 5: User Story 3 & 5 (T026-T027) - Update tasks & toggle completion
6. Complete Phase 6: User Story 4 (T028) - Delete tasks
7. **STOP and VALIDATE**: Test all P1 stories independently
8. Complete Phase 8: Polish (T030-T038)
9. Deploy/demo MVP with full CRUD functionality

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (read-only MVP)
3. Add User Story 2 → Test independently → Deploy/Demo (can create tasks)
4. Add User Story 3 & 5 → Test independently → Deploy/Demo (can update tasks)
5. Add User Story 4 → Test independently → Deploy/Demo (full CRUD MVP!)
6. Add User Story 6 → Test independently → Deploy/Demo (enhanced with single task retrieval)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T019)
2. Once Foundational is done:
   - Developer A: User Story 1 (T020-T023)
   - Developer B: User Story 2 (T024-T025)
   - Developer C: User Story 3 & 5 (T026-T027)
   - Developer D: User Story 4 (T028)
3. Stories complete and integrate independently
4. Team completes Polish together (T030-T038)

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- User Story 3 and User Story 5 share the same PUT endpoint implementation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All endpoints require JWT authentication via Authorization header
- User isolation enforced at database query level (WHERE user_id = current_user)
- Use 404 (not 403) when user tries to access another user's task (security best practice)
- SQLModel automatically handles parameterized queries (SQL injection prevention)
- FastAPI automatically generates OpenAPI documentation at /docs

---

## Task Summary

- **Total Tasks**: 38
- **Setup Tasks**: 5 (T001-T005)
- **Foundational Tasks**: 14 (T006-T019)
- **User Story 1 Tasks**: 4 (T020-T023)
- **User Story 2 Tasks**: 2 (T024-T025)
- **User Story 3 & 5 Tasks**: 2 (T026-T027)
- **User Story 4 Tasks**: 1 (T028)
- **User Story 6 Tasks**: 1 (T029)
- **Polish Tasks**: 9 (T030-T038)

**Parallelizable Tasks**: 18 tasks marked with [P]

**MVP Scope** (P1 stories only): Tasks T001-T028 + T030-T038 = 37 tasks

**Full Feature Scope** (including P2): All 38 tasks
