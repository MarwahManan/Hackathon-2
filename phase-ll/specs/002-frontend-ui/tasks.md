`---

description: "Task list for Frontend & UI implementation"
---

# Tasks: Frontend & UI for Todo Application

**Input**: Design documents from `/specs/002-frontend-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification. Focus is on functional implementation and manual testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` at repository root
- All paths shown below use `frontend/` prefix

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js 16+ project with TypeScript and App Router in frontend/ directory
- [ ] T002 Install dependencies: axios, better-auth, tailwindcss in frontend/
- [ ] T003 [P] Create .env.local with NEXT_PUBLIC_API_URL and BETTER_AUTH_SECRET in frontend/
- [ ] T004 [P] Configure next.config.js with API rewrites in frontend/next.config.js
- [ ] T005 [P] Configure tailwind.config.js with responsive breakpoints in frontend/tailwind.config.js
- [ ] T006 [P] Configure tsconfig.json with path aliases in frontend/tsconfig.json
- [ ] T007 Create directory structure (app, components, lib, types) in frontend/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 [P] Create User interface in frontend/types/auth.ts
- [ ] T009 [P] Create Task interface in frontend/types/task.ts
- [ ] T010 [P] Create AuthState and TasksState interfaces in frontend/types/auth.ts and frontend/types/task.ts
- [ ] T011 [P] Create FormState and LoadingState interfaces in frontend/types/ui.ts
- [ ] T012 [P] Create ErrorResponse and ErrorCode types in frontend/types/api.ts
- [ ] T013 Create Axios client with base configuration in frontend/lib/api/client.ts
- [ ] T014 Add request interceptor for JWT token attachment in frontend/lib/api/client.ts
- [ ] T015 Add response interceptor for error handling in frontend/lib/api/client.ts
- [ ] T016 Create middleware for route protection in frontend/middleware.ts
- [ ] T017 [P] Create Button component in frontend/components/ui/Button.tsx
- [ ] T018 [P] Create Input component in frontend/components/ui/Input.tsx
- [ ] T019 [P] Create Card component in frontend/components/ui/Card.tsx
- [ ] T020 [P] Create Spinner component in frontend/components/ui/Spinner.tsx
- [ ] T021 [P] Create ErrorMessage component in frontend/components/ui/ErrorMessage.tsx
- [ ] T022 [P] Create FormField component in frontend/components/ui/FormField.tsx
- [ ] T023 Create validation utility functions in frontend/lib/utils/validation.ts
- [ ] T024 [P] Create root layout with global styles in frontend/app/layout.tsx
- [ ] T025 [P] Create error boundary in frontend/app/error.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authentication Flow (Priority: P1) 🎯 MVP

**Goal**: Users can signup, login, and logout with JWT token management

**Independent Test**: Navigate to signup page, create account, logout, login again. Verify JWT token is issued and protected routes are accessible.

### Implementation for User Story 1

- [ ] T026 Create AuthContext with state and actions in frontend/lib/context/AuthContext.tsx
- [ ] T027 Create Better Auth configuration in frontend/lib/auth/better-auth.ts
- [ ] T028 Create auth API functions (signup, login, logout, getCurrentUser) in frontend/lib/api/auth.ts
- [ ] T029 Create useAuth custom hook in frontend/lib/hooks/useAuth.ts
- [ ] T030 Create auth route group layout in frontend/app/(auth)/layout.tsx
- [ ] T031 Create SignupForm component in frontend/components/auth/SignupForm.tsx
- [ ] T032 Create signup page in frontend/app/(auth)/signup/page.tsx
- [ ] T033 Create LoginForm component in frontend/components/auth/LoginForm.tsx
- [ ] T034 Create login page in frontend/app/(auth)/login/page.tsx
- [ ] T035 Create LogoutButton component in frontend/components/auth/LogoutButton.tsx
- [ ] T036 Add form validation for email and password in SignupForm and LoginForm
- [ ] T037 Add error handling for 401, 409, 400 responses in auth forms
- [ ] T038 Implement redirect to /tasks after successful login/signup
- [ ] T039 Implement redirect to /login for unauthenticated users accessing protected routes

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Task List (Priority: P1) 🎯 MVP

**Goal**: Users can view all their tasks with title, description, and completion status

**Independent Test**: Login and verify task list page displays all user-specific tasks. Verify empty state when no tasks exist.

### Implementation for User Story 2

- [ ] T040 Create TasksContext with state and actions in frontend/lib/context/TasksContext.tsx
- [ ] T041 Create tasks API functions (getTasks) in frontend/lib/api/tasks.ts
- [ ] T042 Create useTasks custom hook in frontend/lib/hooks/useTasks.ts
- [ ] T043 Create protected route group layout in frontend/app/(protected)/layout.tsx
- [ ] T044 Create TaskCard component in frontend/components/tasks/TaskCard.tsx
- [ ] T045 Create TaskList component in frontend/components/tasks/TaskList.tsx
- [ ] T046 Create EmptyState component in frontend/components/tasks/EmptyState.tsx
- [ ] T047 Create task list page in frontend/app/(protected)/tasks/page.tsx
- [ ] T048 Add loading state with Spinner during task fetch
- [ ] T049 Add error handling with retry option for failed API calls
- [ ] T050 Add visual distinction for completed vs incomplete tasks in TaskCard

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Create New Task (Priority: P1) 🎯 MVP

**Goal**: Users can create new tasks with title and optional description

**Independent Test**: Click "Add Task" button, fill form, submit, and verify new task appears in list.

### Implementation for User Story 3

- [ ] T051 Create createTask API function in frontend/lib/api/tasks.ts
- [ ] T052 Add createTask action to TasksContext in frontend/lib/context/TasksContext.tsx
- [ ] T053 Create TaskForm component in frontend/components/tasks/TaskForm.tsx
- [ ] T054 Create new task page in frontend/app/(protected)/tasks/new/page.tsx
- [ ] T055 Add form validation (title required, max lengths) in TaskForm
- [ ] T056 Add "Add Task" button to task list page in frontend/app/(protected)/tasks/page.tsx
- [ ] T057 Implement redirect to /tasks after successful task creation
- [ ] T058 Add error handling with form data preservation on API failure
- [ ] T059 Add cancel button that returns to task list without creating task

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Mark Task Complete/Incomplete (Priority: P1) 🎯 MVP

**Goal**: Users can toggle task completion status with visual feedback

**Independent Test**: Click completion checkbox on a task, verify visual state changes, reload page and verify status persists.

### Implementation for User Story 4

- [ ] T060 Create updateTask API function in frontend/lib/api/tasks.ts
- [ ] T061 Create toggleTaskCompletion helper function in frontend/lib/api/tasks.ts
- [ ] T062 Add toggleTaskCompletion action to TasksContext in frontend/lib/context/TasksContext.tsx
- [ ] T063 Add completion checkbox to TaskCard component in frontend/components/tasks/TaskCard.tsx
- [ ] T064 Implement optimistic UI update for completion toggle
- [ ] T065 Add visual feedback (strikethrough, color change) for completed tasks in TaskCard
- [ ] T066 Implement revert on API failure with error message
- [ ] T067 Ensure completion status persists after page reload

**Checkpoint**: All P1 (MVP) user stories should now be independently functional

---

## Phase 7: User Story 5 - Edit Existing Task (Priority: P2)

**Goal**: Users can edit task title and description with changes saved to backend

**Independent Test**: Click "Edit" button on a task, modify title/description, save, and verify updates appear in task list.

### Implementation for User Story 5

- [ ] T068 Add updateTask action to TasksContext (if not already added in Phase 6) in frontend/lib/context/TasksContext.tsx
- [ ] T069 Create edit task page with dynamic route in frontend/app/(protected)/tasks/[id]/edit/page.tsx
- [ ] T070 Fetch task data and pre-fill TaskForm in edit page
- [ ] T071 Add "Edit" button to TaskCard component in frontend/components/tasks/TaskCard.tsx
- [ ] T072 Implement save functionality that calls updateTask API
- [ ] T073 Add form validation (title required) in edit mode
- [ ] T074 Implement redirect to /tasks after successful update
- [ ] T075 Add cancel button that returns to task list without saving changes
- [ ] T076 Add error handling with form data preservation on API failure

**Checkpoint**: User Stories 1-5 should all be independently functional

---

## Phase 8: User Story 6 - Delete Task (Priority: P2)

**Goal**: Users can permanently delete tasks with confirmation prompt

**Independent Test**: Click "Delete" button on a task, confirm deletion, and verify task is removed from list.

### Implementation for User Story 6

- [ ] T077 Create deleteTask API function in frontend/lib/api/tasks.ts
- [ ] T078 Add deleteTask action to TasksContext in frontend/lib/context/TasksContext.tsx
- [ ] T079 Create DeleteConfirmDialog component in frontend/components/tasks/DeleteConfirmDialog.tsx
- [ ] T080 Add "Delete" button to TaskCard component in frontend/components/tasks/TaskCard.tsx
- [ ] T081 Implement confirmation dialog before deletion
- [ ] T082 Implement task removal from UI after successful deletion
- [ ] T083 Add error handling with task restoration on API failure
- [ ] T084 Ensure deleted task does not reappear after page reload

**Checkpoint**: User Stories 1-6 should all be independently functional

---

## Phase 9: User Story 7 - Responsive UI Across Devices (Priority: P3)

**Goal**: UI adapts seamlessly to mobile, tablet, and desktop screen sizes

**Independent Test**: Access app on different devices/screen sizes and verify layouts adapt correctly, buttons are accessible, and all features remain functional.

### Implementation for User Story 7

- [ ] T085 [P] Update tailwind.config.js with custom breakpoints (xs: 375px, md: 768px, lg: 1024px) in frontend/tailwind.config.js
- [ ] T086 [P] Add responsive classes to Button component (min-h-touch, min-w-touch) in frontend/components/ui/Button.tsx
- [ ] T087 [P] Add responsive classes to Input component in frontend/components/ui/Input.tsx
- [ ] T088 [P] Add responsive layout to TaskCard component (single column on mobile) in frontend/components/tasks/TaskCard.tsx
- [ ] T089 [P] Add responsive layout to TaskList component in frontend/components/tasks/TaskList.tsx
- [ ] T090 [P] Add responsive layout to TaskForm component in frontend/components/tasks/TaskForm.tsx
- [ ] T091 [P] Add responsive layout to auth forms (SignupForm, LoginForm) in frontend/components/auth/
- [ ] T092 [P] Add responsive navigation header in frontend/components/layout/Header.tsx
- [ ] T093 Test UI on mobile viewport (375px) and verify touch targets are 44x44px minimum
- [ ] T094 Test UI on tablet viewport (768px) and verify appropriate spacing
- [ ] T095 Test UI on desktop viewport (1024px+) and verify max-width constraints

**Checkpoint**: All user stories should now work across all device sizes

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T096 [P] Create Header component with navigation and user info in frontend/components/layout/Header.tsx
- [ ] T097 [P] Create Footer component in frontend/components/layout/Footer.tsx
- [ ] T098 Add Header to root layout in frontend/app/layout.tsx
- [ ] T099 [P] Add loading skeletons for task list in frontend/components/tasks/TaskListSkeleton.tsx
- [ ] T100 [P] Improve error messages with user-friendly text across all components
- [ ] T101 [P] Add toast notifications for success/error messages in frontend/lib/utils/toast.ts
- [ ] T102 Add home/landing page in frontend/app/page.tsx
- [ ] T103 Add 404 not found page in frontend/app/not-found.tsx
- [ ] T104 Run manual testing checklist from quickstart.md
- [ ] T105 Verify all acceptance scenarios from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 (requires authentication) - Can start after US1 complete
- **User Story 3 (P1)**: Depends on User Story 2 (requires task list context) - Can start after US2 complete
- **User Story 4 (P1)**: Depends on User Story 2 (requires TaskCard component) - Can start after US2 complete
- **User Story 5 (P2)**: Depends on User Story 2 (requires task list and TaskCard) - Can start after US2 complete
- **User Story 6 (P2)**: Depends on User Story 2 (requires task list and TaskCard) - Can start after US2 complete
- **User Story 7 (P3)**: Can start after any user story is complete - Applies responsive design to existing components

### Within Each User Story

- API functions before Context actions
- Context before components that use it
- Base components before page components
- Core implementation before error handling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Within User Story 7, all responsive updates marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members (after dependencies met)

---

## Parallel Example: User Story 1

```bash
# Launch foundational type definitions together:
Task: "Create User interface in frontend/types/auth.ts"
Task: "Create Task interface in frontend/types/task.ts"
Task: "Create AuthState and TasksState interfaces"

# Launch base UI components together:
Task: "Create Button component in frontend/components/ui/Button.tsx"
Task: "Create Input component in frontend/components/ui/Input.tsx"
Task: "Create Card component in frontend/components/ui/Card.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1-4 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. Complete Phase 4: User Story 2 (View Tasks)
5. Complete Phase 5: User Story 3 (Create Task)
6. Complete Phase 6: User Story 4 (Toggle Completion)
7. **STOP and VALIDATE**: Test all P1 features independently
8. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Auth working!)
3. Add User Story 2 → Test independently → Deploy/Demo (Can view tasks!)
4. Add User Story 3 → Test independently → Deploy/Demo (Can create tasks!)
5. Add User Story 4 → Test independently → Deploy/Demo (MVP complete!)
6. Add User Story 5 → Test independently → Deploy/Demo (Can edit tasks!)
7. Add User Story 6 → Test independently → Deploy/Demo (Can delete tasks!)
8. Add User Story 7 → Test independently → Deploy/Demo (Fully responsive!)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
3. Once US1 is done:
   - Developer A: User Story 3 (Create Task)
   - Developer B: User Story 4 (Toggle Completion)
4. Once US2 is done:
   - Developer C: User Story 5 (Edit Task)
   - Developer D: User Story 6 (Delete Task)
5. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are NOT included as they were not requested in the specification
- Focus on functional implementation and manual testing per quickstart.md

---

## Task Summary

**Total Tasks**: 105 tasks
**Setup**: 7 tasks
**Foundational**: 18 tasks (BLOCKING)
**User Story 1 (P1)**: 14 tasks (Authentication)
**User Story 2 (P1)**: 11 tasks (View Tasks)
**User Story 3 (P1)**: 9 tasks (Create Task)
**User Story 4 (P1)**: 8 tasks (Toggle Completion)
**User Story 5 (P2)**: 9 tasks (Edit Task)
**User Story 6 (P2)**: 8 tasks (Delete Task)
**User Story 7 (P3)**: 11 tasks (Responsive UI)
**Polish**: 10 tasks

**MVP Scope** (Recommended): Phases 1-6 (User Stories 1-4) = 67 tasks
**Full Feature**: All phases = 105 tasks

**Parallel Opportunities**: 35+ tasks marked [P] can run in parallel within their phases
