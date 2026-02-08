# CLI Command Contracts

**Feature**: 001-console-todo-app
**Date**: 2026-02-06
**Phase**: Phase 1 - Command Interface Specification

## Overview

This document defines the command-line interface contracts for the console todo application. Each command specifies its syntax, behavior, success/error responses, and examples.

## Command Format

All commands follow this general pattern:

```
<command> [arguments...]
```

- Commands are case-insensitive
- Arguments are space-separated
- Multi-word descriptions must be quoted or entered as prompted
- Invalid commands display error and suggest `help` command

## Commands

### 1. add - Add New Task

**Syntax**:
```
add <description>
```

**Description**: Creates a new task with the given description.

**Arguments**:
- `description` (required): Task description text (1-500 characters)

**Behavior**:
1. Validate description (not empty, ≤500 chars)
2. Create task with auto-generated ID
3. Set completed status to False
4. Store in repository
5. Display success message with task ID

**Success Response**:
```
✓ Task added successfully (ID: 1)
```

**Error Responses**:
```
✗ Error: Task description cannot be empty
✗ Error: Task description cannot exceed 500 characters
```

**Examples**:
```
> add Write unit tests
✓ Task added successfully (ID: 1)

> add
✗ Error: Task description cannot be empty

> add [501 character string]
✗ Error: Task description cannot exceed 500 characters
```

**Edge Cases**:
- Whitespace-only description: Treated as empty
- Leading/trailing whitespace: Trimmed before validation
- Special characters: Allowed in description

---

### 2. view - View All Tasks

**Syntax**:
```
view
```

**Description**: Displays all tasks with their ID, description, and completion status.

**Arguments**: None

**Behavior**:
1. Retrieve all tasks from repository
2. Display in creation order (oldest first)
3. Show ID, description, and status for each task
4. If no tasks exist, display informational message

**Success Response** (with tasks):
```
Tasks:
  [1] [ ] Write unit tests
  [2] [✓] Review pull request
  [3] [ ] Update documentation
```

**Success Response** (no tasks):
```
No tasks found. Use 'add' to create a task.
```

**Format**:
- `[ID]` - Task ID in brackets
- `[ ]` - Incomplete task (empty checkbox)
- `[✓]` - Complete task (checked checkbox)
- Description follows status indicator

**Examples**:
```
> view
Tasks:
  [1] [ ] Write unit tests
  [2] [✓] Review pull request

> view
No tasks found. Use 'add' to create a task.
```

**Edge Cases**:
- Empty task list: Display helpful message
- Long descriptions: Display full text (no truncation in Phase I)
- Many tasks: Display all (no pagination in Phase I)

---

### 3. update - Update Task Description

**Syntax**:
```
update <id> <description>
```

**Description**: Updates the description of an existing task.

**Arguments**:
- `id` (required): Task ID (positive integer)
- `description` (required): New task description (1-500 characters)

**Behavior**:
1. Validate task ID (positive integer)
2. Validate new description (not empty, ≤500 chars)
3. Find task by ID
4. Update description
5. Display success message

**Success Response**:
```
✓ Task 1 updated successfully
```

**Error Responses**:
```
✗ Error: Task not found
✗ Error: Task ID must be a positive integer
✗ Error: Task description cannot be empty
✗ Error: Task description cannot exceed 500 characters
```

**Examples**:
```
> update 1 Write integration tests
✓ Task 1 updated successfully

> update 999 Some description
✗ Error: Task not found

> update 1
✗ Error: Task description cannot be empty

> update abc Some description
✗ Error: Task ID must be a positive integer
```

**Edge Cases**:
- Non-existent ID: Display "Task not found"
- Invalid ID format: Display ID validation error
- Completed task: Can still be updated (status unchanged)

---

### 4. delete - Delete Task

**Syntax**:
```
delete <id>
```

**Description**: Permanently removes a task from the list.

**Arguments**:
- `id` (required): Task ID (positive integer)

**Behavior**:
1. Validate task ID (positive integer)
2. Find task by ID
3. Remove from repository
4. Display success message

**Success Response**:
```
✓ Task 1 deleted successfully
```

**Error Responses**:
```
✗ Error: Task not found
✗ Error: Task ID must be a positive integer
```

**Examples**:
```
> delete 1
✓ Task 1 deleted successfully

> delete 999
✗ Error: Task not found

> delete abc
✗ Error: Task ID must be a positive integer
```

**Edge Cases**:
- Non-existent ID: Display "Task not found"
- Invalid ID format: Display ID validation error
- Deleted task ID is never reused in the session

---

### 5. complete - Mark Task Complete

**Syntax**:
```
complete <id>
```

**Description**: Marks a task as complete.

**Arguments**:
- `id` (required): Task ID (positive integer)

**Behavior**:
1. Validate task ID (positive integer)
2. Find task by ID
3. Check current completion status
4. If incomplete: Mark as complete, display success
5. If already complete: Display informational message (not error)

**Success Response**:
```
✓ Task 1 marked as complete
```

**Informational Response**:
```
ℹ Task 1 is already complete
```

**Error Responses**:
```
✗ Error: Task not found
✗ Error: Task ID must be a positive integer
```

**Examples**:
```
> complete 1
✓ Task 1 marked as complete

> complete 1
ℹ Task 1 is already complete

> complete 999
✗ Error: Task not found

> complete abc
✗ Error: Task ID must be a positive integer
```

**Edge Cases**:
- Already complete: Informational message (not error)
- Non-existent ID: Display "Task not found"
- Invalid ID format: Display ID validation error

---

### 6. help - Display Help

**Syntax**:
```
help
```

**Description**: Displays all available commands with usage examples.

**Arguments**: None

**Behavior**:
1. Display application title and version
2. List all commands with syntax
3. Provide brief description for each
4. Show example usage

**Response**:
```
Console Todo Application - Phase I

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

For more information, see README.md
```

**Examples**:
```
> help
[Displays help text as shown above]
```

---

### 7. exit - Exit Application

**Syntax**:
```
exit
```

**Description**: Exits the application gracefully.

**Arguments**: None

**Behavior**:
1. Display goodbye message
2. Terminate application
3. All data is lost (in-memory only)

**Response**:
```
Goodbye! All tasks have been cleared from memory.
```

**Examples**:
```
> exit
Goodbye! All tasks have been cleared from memory.
[Application terminates]
```

**Edge Cases**:
- Unsaved data warning: Not needed (user aware of in-memory nature)
- Ctrl+C: Should also exit gracefully with same message

---

## Error Handling

### Invalid Command

**Behavior**: When user enters unrecognized command

**Response**:
```
✗ Error: Unknown command 'xyz'
Type 'help' to see available commands
```

### Missing Arguments

**Behavior**: When required arguments are not provided

**Response**:
```
✗ Error: Missing required argument
Type 'help' to see command usage
```

### Too Many Arguments

**Behavior**: When extra arguments are provided (for commands that don't accept them)

**Response**:
```
✗ Error: Too many arguments
Type 'help' to see command usage
```

## Input Parsing Rules

1. **Command Extraction**: First word is the command (case-insensitive)
2. **Argument Extraction**: Remaining words are arguments
3. **Whitespace Handling**: Multiple spaces treated as single separator
4. **Empty Input**: Prompt again (no error)
5. **Special Characters**: Allowed in descriptions, no escaping needed

## Output Formatting

### Symbols

- `✓` - Success indicator (green if terminal supports colors)
- `✗` - Error indicator (red if terminal supports colors)
- `ℹ` - Information indicator (blue if terminal supports colors)
- `[ ]` - Incomplete task checkbox
- `[✓]` - Complete task checkbox

### Message Structure

```
[Symbol] [Message Type]: [Message Text]
```

Examples:
- `✓ Task added successfully (ID: 1)`
- `✗ Error: Task not found`
- `ℹ Task 1 is already complete`

## Phase II Compatibility

These CLI commands will remain available in Phase II as a CLI client for the REST API:

**Migration Path**:
1. CLI commands call API endpoints instead of service layer directly
2. Command syntax remains identical
3. Add authentication (login/logout commands)
4. Add network error handling
5. Add offline mode detection

**New Commands in Phase II**:
- `login` - Authenticate user
- `logout` - End session
- `sync` - Sync with server (if offline mode added)

## Testing Contracts

Each command must have:
1. **Unit tests**: Parser correctly extracts command and arguments
2. **Integration tests**: End-to-end command execution with expected output
3. **Error tests**: All error conditions produce correct messages
4. **Edge case tests**: Boundary conditions and special inputs

## Summary

**Total Commands**: 7 (add, view, update, delete, complete, help, exit)
**Required Arguments**: 3 commands (add, update, delete, complete)
**No Arguments**: 3 commands (view, help, exit)
**Error Types**: 4 (invalid command, missing args, validation errors, not found)

All commands follow consistent patterns for success/error messaging and argument handling.
