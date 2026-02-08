# Feature Specification: Backend & API for Todo Application

**Feature Branch**: `003-backend-api`
**Created**: 2026-02-08
**Status**: Draft
**Input**: Backend & API for Todo Full-Stack Web Application - RESTful API endpoints for task management with Neon PostgreSQL integration and JWT-based user isolation

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Retrieve User's Tasks (Priority: P1) 🎯 MVP

The system must provide an API endpoint that returns all tasks belonging to the authenticated user, enabling the frontend to display the user's task list.

**Why this priority**: This is the foundational read operation. Without the ability to retrieve tasks, users cannot see their data. This is essential for MVP and blocks all other features.

**Independent Test**: Can be fully tested by making an authenticated API request to GET /api/tasks and verifying that only the authenticated user's tasks are returned with correct data structure.

**Acceptance Scenarios**:

1. **Given** user is authenticated with valid JWT token, **When** user requests GET /api/tasks, **Then** system returns 200 OK with array of user's tasks
2. **Given** user is authenticated and has no tasks, **When** user requests GET /api/tasks, **Then** system returns 200 OK with empty array
3. **Given** user is not authenticated (no token), **When** user requests GET /api/tasks, **Then** system returns 401 Unauthorized
4. **Given** user is authenticated, **When** user requests GET /api/tasks, **Then** system returns only tasks where userId matches authenticated user
5. **Given** user has 100 tasks, **When** user requests GET /api/tasks, **Then** system returns all 100 tasks within 2 seconds

---

### User Story 2 - Create New Task (Priority: P1) 🎯 MVP

The system must provide an API endpoint that allows authenticated users to create new tasks with title and optional description.

**Why this priority**: Creating tasks is essential for a todo application. Without this, users cannot add data to the system. This is required for MVP.

**Independent Test**: Can be fully tested by making an authenticated POST request to /api/tasks with task data and verifying the task is created with correct userId and returned in subsequent GET requests.

**Acceptance Scenarios**:

1. **Given** user is authenticated, **When** user posts valid task data (title + description) to /api/tasks, **Then** system returns 201 Created with created task including generated ID
2. **Given** user is authenticated, **When** user posts task with only title (no description), **Then** system returns 201 Created with task where description is null
3. **Given** user is authenticated, **When** user posts task without title, **Then** system returns 400 Bad Request with validation error
4. **Given** user is not authenticated, **When** user posts task data, **Then** system returns 401 Unauthorized
5. **Given** user is authenticated, **When** task is created, **Then** task is automatically associated with authenticated user's ID

---

### User Story 3 - Update Existing Task (Priority: P1) 🎯 MVP

The system must provide an API endpoint that allows authenticated users to update their own tasks' title and description.

**Why this priority**: Editing tasks is important for maintaining accurate information. This is core CRUD functionality required for MVP.

**Independent Test**: Can be fully tested by creating a task, then making an authenticated PUT request to /api/tasks/{id} with updated data, and verifying the changes persist.

**Acceptance Scenarios**:

1. **Given** user owns task with ID 123, **When** user sends PUT /api/tasks/123 with updated title, **Then** system returns 200 OK with updated task
2. **Given** user owns task, **When** user updates only description (not title), **Then** system returns 200 OK with updated description
3. **Given** user tries to update task owned by another user, **When** user sends PUT request, **Then** system returns 404 Not Found
4. **Given** user sends update with empty title, **When** user sends PUT request, **Then** system returns 400 Bad Request with validation error
5. **Given** task does not exist, **When** user sends PUT request, **Then** system returns 404 Not Found

---

### User Story 4 - Delete Task (Priority: P1) 🎯 MVP

The system must provide an API endpoint that allows authenticated users to permanently delete their own tasks.

**Why this priority**: Deleting tasks is essential for task list maintenance. This completes the core CRUD operations required for MVP.

**Independent Test**: Can be fully tested by creating a task, making an authenticated DELETE request to /api/tasks/{id}, and verifying the task no longer appears in GET requests.

**Acceptance Scenarios**:

1. **Given** user owns task with ID 123, **When** user sends DELETE /api/tasks/123, **Then** system returns 200 OK and task is permanently deleted
2. **Given** user tries to delete task owned by another user, **When** user sends DELETE request, **Then** system returns 404 Not Found
3. **Given** task does not exist, **When** user sends DELETE request, **Then** system returns 404 Not Found
4. **Given** user is not authenticated, **When** user sends DELETE request, **Then** system returns 401 Unauthorized
5. **Given** task is deleted, **When** user requests GET /api/tasks, **Then** deleted task does not appear in results

---

### User Story 5 - Toggle Task Completion (Priority: P1) 🎯 MVP

The system must provide an API endpoint that allows authenticated users to toggle the completion status of their own tasks.

**Why this priority**: Marking tasks as complete/incomplete is a core feature of todo applications. This provides immediate value and is essential for MVP.

**Independent Test**: Can be fully tested by creating a task, making an authenticated PUT request to /api/tasks/{id} with isCompleted flag, and verifying the status persists.

**Acceptance Scenarios**:

1. **Given** user owns incomplete task, **When** user sends PUT /api/tasks/{id} with isCompleted=true, **Then** system returns 200 OK with updated task showing isCompleted=true
2. **Given** user owns complete task, **When** user sends PUT /api/tasks/{id} with isCompleted=false, **Then** system returns 200 OK with updated task showing isCompleted=false
3. **Given** user tries to toggle task owned by another user, **When** user sends PUT request, **Then** system returns 404 Not Found
4. **Given** task does not exist, **When** user sends toggle request, **Then** system returns 404 Not Found
5. **Given** task completion is toggled, **When** user requests GET /api/tasks, **Then** task shows updated completion status

---

### User Story 6 - Retrieve Single Task (Priority: P2)

The system must provide an API endpoint that returns a specific task by ID, but only if it belongs to the authenticated user.

**Why this priority**: Retrieving individual tasks is useful for task detail views and edit forms, but users can work around this by filtering the full task list. This is a valuable enhancement after MVP.

**Independent Test**: Can be fully tested by creating a task, making an authenticated GET request to /api/tasks/{id}, and verifying the correct task data is returned.

**Acceptance Scenarios**:

1. **Given** user owns task with ID 123, **When** user requests GET /api/tasks/123, **Then** system returns 200 OK with task data
2. **Given** user tries to access task owned by another user, **When** user requests GET /api/tasks/{id}, **Then** system returns 404 Not Found
3. **Given** task does not exist, **When** user requests GET /api/tasks/{id}, **Then** system returns 404 Not Found
4. **Given** user is not authenticated, **When** user requests GET /api/tasks/{id}, **Then** system returns 401 Unauthorized

---

### Edge Cases

- What happens when JWT token expires during an API request?
  - System should detect expired token, return 401 Unauthorized with error code TOKEN_EXPIRED, and frontend should redirect to login.

- How does system handle malformed JWT tokens?
  - System should return 401 Unauthorized with error code INVALID_TOKEN without exposing token details.

- What happens when user tries to create task with extremely long title (>200 characters)?
  - System should return 400 Bad Request with validation error specifying max length constraint.

- How does system handle database connection failures?
  - System should return 500 Internal Server Error with generic error message (not exposing database details) and log detailed error for debugging.

- What happens when user tries to access another user's task via direct ID manipulation?
  - System should return 404 Not Found (not 403 Forbidden) to avoid leaking information about task existence.

- How does system handle concurrent updates to the same task?
  - System should use database-level locking or timestamps; last write wins (acceptable for MVP).

- What happens when database query takes too long (>10 seconds)?
  - System should timeout and return 500 Internal Server Error with appropriate error message.

- How does system handle special characters in task title/description?
  - System should properly escape and store all valid UTF-8 characters; validate and sanitize input to prevent SQL injection.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide GET /api/tasks endpoint that returns all tasks for authenticated user
- **FR-002**: System MUST provide GET /api/tasks/{id} endpoint that returns specific task if owned by authenticated user
- **FR-003**: System MUST provide POST /api/tasks endpoint that creates new task associated with authenticated user
- **FR-004**: System MUST provide PUT /api/tasks/{id} endpoint that updates task if owned by authenticated user
- **FR-005**: System MUST provide DELETE /api/tasks/{id} endpoint that deletes task if owned by authenticated user
- **FR-006**: System MUST verify JWT token on every API request to protected endpoints
- **FR-007**: System MUST extract user ID from verified JWT token for all database queries
- **FR-008**: System MUST filter all task queries by authenticated user's ID (enforce user isolation)
- **FR-009**: System MUST return 401 Unauthorized for requests without valid JWT token
- **FR-010**: System MUST return 404 Not Found when user tries to access task owned by another user
- **FR-011**: System MUST validate task title is required and not empty
- **FR-012**: System MUST validate task title does not exceed 200 characters
- **FR-013**: System MUST validate task description does not exceed 2000 characters if provided
- **FR-014**: System MUST return 400 Bad Request with validation errors for invalid input
- **FR-015**: System MUST return 201 Created with created task data for successful POST requests
- **FR-016**: System MUST return 200 OK with updated task data for successful PUT requests
- **FR-017**: System MUST return 200 OK for successful DELETE requests
- **FR-018**: System MUST automatically set userId field when creating tasks (from JWT token)
- **FR-019**: System MUST automatically set createdAt timestamp when creating tasks
- **FR-020**: System MUST automatically update updatedAt timestamp when modifying tasks
- **FR-021**: System MUST set isCompleted to false by default for new tasks
- **FR-022**: System MUST return consistent error response format with error message and code
- **FR-023**: System MUST log all API requests with timestamp, endpoint, user ID, and response status
- **FR-024**: System MUST log all errors with stack trace for debugging
- **FR-025**: System MUST handle database connection errors gracefully with 500 Internal Server Error
- **FR-026**: System MUST use parameterized queries to prevent SQL injection
- **FR-027**: System MUST return JSON responses for all endpoints
- **FR-028**: System MUST accept JSON request bodies for POST and PUT endpoints
- **FR-029**: System MUST set appropriate CORS headers to allow frontend origin
- **FR-030**: System MUST use shared secret from environment variable for JWT verification

### Key Entities

- **Task**: Represents a todo item with title, description, completion status, timestamps, and owner
  - Attributes: id (UUID), userId (UUID), title (string, required), description (string, optional), isCompleted (boolean), createdAt (timestamp), updatedAt (timestamp)
  - Relationships: Belongs to one User (via userId foreign key)

- **User**: Represents an authenticated user (defined in authentication spec, referenced here)
  - Attributes: id (UUID), email (string), createdAt (timestamp), updatedAt (timestamp)
  - Relationships: Has many Tasks

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All API endpoints respond within 500ms for requests with fewer than 100 tasks
- **SC-002**: System correctly enforces user isolation - users can only access their own tasks (verified by security testing with multiple user accounts)
- **SC-003**: System handles 100 concurrent API requests without errors or degradation
- **SC-004**: All validation errors return appropriate 400 status codes with clear error messages
- **SC-005**: All unauthorized access attempts return 401 status codes
- **SC-006**: All attempts to access non-existent or other users' tasks return 404 status codes
- **SC-007**: System successfully creates, retrieves, updates, and deletes tasks via API (verified by integration tests)
- **SC-008**: JWT token verification correctly identifies and rejects invalid/expired tokens (100% success rate in testing)
- **SC-009**: All database queries use parameterized statements (verified by code review - no SQL injection vulnerabilities)
- **SC-010**: System logs all API requests and errors for debugging and monitoring purposes
