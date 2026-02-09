---
description: "Task list for Todo Frontend UI implementation"
---

# Tasks: Todo Frontend UI (Professional & Advanced)

**Input**: Design documents from `/specs/1-todo-frontend-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the specification, so test tasks are excluded from this implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js web application with paths:
- `frontend/app/` - Next.js App Router pages
- `frontend/components/` - React components
- `frontend/lib/` - Utilities and API client
- `frontend/types/` - TypeScript type definitions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 16+ project with TypeScript and App Router in frontend/
- [ ] T002 Install core dependencies: react@18+, next@16+, typescript@5+, tailwindcss@3+
- [ ] T003 [P] Install API dependencies: axios, better-auth, js-cookie
- [ ] T004 [P] Install form dependencies: react-hook-form, zod, @hookform/resolvers
- [ ] T005 [P] Install utility dependencies: date-fns, clsx
- [ ] T006 Configure Tailwind CSS in frontend/tailwind.config.js with custom design system
- [ ] T007 Create global styles in frontend/app/globals.css with Tailwind directives
- [ ] T008 Configure TypeScript in frontend/tsconfig.json with strict mode and path aliases
- [ ] T009 Create environment template in frontend/.env.example with required variables
- [ ] T010 Configure Next.js in frontend/next.config.js with API proxy and security headers
- [ ] T011 Create project folder structure: app/, components/, lib/, types/, public/

**Checkpoint**: Project scaffolding complete - ready for foundational infrastructure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T012 [P] Create TypeScript types for User in frontend/types/auth.ts
- [ ] T013 [P] Create TypeScript types for Task in frontend/types/task.ts
- [ ] T014 [P] Create TypeScript types for API responses in frontend/types/api.ts
- [ ] T015 [P] Create TypeScript types for forms in frontend/types/forms.ts
- [ ] T016 [P] Create TypeScript types for UI state in frontend/types/ui.ts
- [ ] T017 Create Axios client with interceptors in frontend/lib/api/client.ts
- [ ] T018 Create token management utilities in frontend/lib/auth/token.ts
- [ ] T019 Create API error handling utilities in frontend/lib/utils/error-handler.ts
- [ ] T020 Create user-friendly error messages mapping in frontend/lib/utils/error-messages.ts
- [ ] T021 Create form validation schemas with Zod in frontend/lib/utils/validation.ts
- [ ] T022 Create AuthContext with React Context API in frontend/lib/context/AuthContext.tsx
- [ ] T023 Create TasksContext with React Context API in frontend/lib/context/TasksContext.tsx
- [ ] T024 Create useAuth custom hook in frontend/lib/hooks/useAuth.ts
- [ ] T025 Create useTasks custom hook in frontend/lib/hooks/useTasks.ts
- [ ] T026 Create useApi custom hook for API calls in frontend/lib/hooks/useApi.ts
- [ ] T027 Create Next.js middleware for route protection in frontend/middleware.ts
- [ ] T028 Create root layout with providers in frontend/app/layout.tsx
- [ ] T029 Create root error boundary in frontend/app/error.tsx
- [ ] T030 [P] Create base Button component in frontend/components/ui/Button.tsx
- [ ] T031 [P] Create base Input component in frontend/components/ui/Input.tsx
- [ ] T032 [P] Create base Card component in frontend/components/ui/Card.tsx
- [ ] T033 [P] Create base Modal component in frontend/components/ui/Modal.tsx
- [ ] T034 [P] Create base Spinner component in frontend/components/ui/Spinner.tsx
- [ ] T035 [P] Create ErrorMessage component in frontend/components/ui/ErrorMessage.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication and Onboarding (Priority: P1) 🎯 MVP

**Goal**: Users can create accounts and securely sign in to access their personal todo lists

**Independent Test**: Create a new account, sign in, verify JWT token is stored securely, and user is redirected to dashboard

### Implementation for User Story 1

- [ ] T036 [P] [US1] Create auth API client in frontend/lib/api/auth.ts with signup, login, getCurrentUser, logout functions
- [ ] T037 [P] [US1] Create Better Auth configuration in frontend/lib/auth/better-auth.ts
- [ ] T038 [P] [US1] Create LoginForm component in frontend/components/auth/LoginForm.tsx
- [ ] T039 [P] [US1] Create SignupForm component in frontend/components/auth/SignupForm.tsx
- [ ] T040 [P] [US1] Create LogoutButton component in frontend/components/auth/LogoutButton.tsx
- [ ] T041 [US1] Create login page in frontend/app/(auth)/login/page.tsx
- [ ] T042 [US1] Create signup page in frontend/app/(auth)/signup/page.tsx
- [ ] T043 [US1] Create auth route group layout in frontend/app/(auth)/layout.tsx
- [ ] T044 [US1] Implement login logic in AuthContext: validate credentials, call API, store token, redirect
- [ ] T045 [US1] Implement signup logic in AuthContext: validate input, call API, store token, redirect
- [ ] T046 [US1] Implement logout logic in AuthContext: clear token, clear user state, redirect to login
- [ ] T047 [US1] Implement getCurrentUser logic in AuthContext: fetch user data on app load if token exists
- [ ] T048 [US1] Add 401 error handling in Axios interceptor: clear token and redirect to login
- [ ] T049 [US1] Add token expiration handling: detect expired tokens and prompt re-login
- [ ] T050 [US1] Add form validation for login: email format, password requirements
- [ ] T051 [US1] Add form validation for signup: email format, password strength, confirm password match
- [ ] T052 [US1] Add error display for invalid credentials in login form
- [ ] T053 [US1] Add error display for existing email in signup form
- [ ] T054 [US1] Add loading states during authentication operations
- [ ] T055 [US1] Test authentication flow: signup → login → token storage → redirect to dashboard

**Checkpoint**: At this point, User Story 1 should be fully functional - users can signup, login, and be authenticated

---

## Phase 4: User Story 2 - View and Create Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can see their existing tasks in a clean list and quickly add new tasks

**Independent Test**: Login, view task list (empty state), create a new task, see it appear immediately in the list

### Implementation for User Story 2

- [ ] T056 [P] [US2] Create tasks API client in frontend/lib/api/tasks.ts with getAll, getById, create functions
- [ ] T057 [P] [US2] Create TaskCard component in frontend/components/tasks/TaskCard.tsx
- [ ] T058 [P] [US2] Create TaskList component in frontend/components/tasks/TaskList.tsx
- [ ] T059 [P] [US2] Create TaskForm component in frontend/components/tasks/TaskForm.tsx
- [ ] T060 [P] [US2] Create EmptyState component in frontend/components/tasks/EmptyState.tsx
- [ ] T061 [US2] Create tasks dashboard page in frontend/app/(protected)/tasks/page.tsx
- [ ] T062 [US2] Create new task page in frontend/app/(protected)/tasks/new/page.tsx
- [ ] T063 [US2] Create protected route group layout in frontend/app/(protected)/layout.tsx with auth check
- [ ] T064 [US2] Implement fetchTasks logic in TasksContext: call API, update state, handle errors
- [ ] T065 [US2] Implement createTask logic in TasksContext: validate input, call API, update state optimistically
- [ ] T066 [US2] Add task form validation: title required (1-100 chars), description optional (max 500 chars)
- [ ] T067 [US2] Add empty state display when user has no tasks
- [ ] T068 [US2] Add loading state while fetching tasks
- [ ] T069 [US2] Add error handling for failed task fetch
- [ ] T070 [US2] Add error handling for failed task creation
- [ ] T071 [US2] Add success feedback after task creation
- [ ] T072 [US2] Implement automatic redirect to task list after successful creation
- [ ] T073 [US2] Add JWT token to all task API requests via Axios interceptor
- [ ] T074 [US2] Test task viewing: login → see task list → verify only user's tasks shown
- [ ] T075 [US2] Test task creation: create task → verify appears in list → verify persisted to backend

**Checkpoint**: At this point, User Stories 1 AND 2 should work - users can authenticate and manage their task list

---

## Phase 5: User Story 3 - Toggle Task Completion (Priority: P1) 🎯 MVP

**Goal**: Users can mark tasks as complete or incomplete to track their progress

**Independent Test**: Create a task, click completion toggle, verify visual state changes and backend is updated

### Implementation for User Story 3

- [ ] T076 [US3] Add toggle function to tasks API client in frontend/lib/api/tasks.ts
- [ ] T077 [US3] Create CompletionToggle component in frontend/components/tasks/CompletionToggle.tsx
- [ ] T078 [US3] Implement toggleTaskStatus logic in TasksContext: optimistic update, call API, revert on error
- [ ] T079 [US3] Add completion toggle to TaskCard component with visual feedback
- [ ] T080 [US3] Add strikethrough styling for completed tasks
- [ ] T081 [US3] Add color differentiation for complete vs incomplete tasks
- [ ] T082 [US3] Add loading state during toggle operation
- [ ] T083 [US3] Add error handling for failed toggle: revert UI state and show error message
- [ ] T084 [US3] Handle rapid toggle clicks: prevent race conditions with request queuing
- [ ] T085 [US3] Test toggle functionality: toggle incomplete → complete → verify UI and backend
- [ ] T086 [US3] Test toggle functionality: toggle complete → incomplete → verify UI and backend
- [ ] T087 [US3] Test error recovery: simulate API failure → verify UI reverts to previous state

**Checkpoint**: At this point, MVP is complete - users can authenticate, view/create tasks, and toggle completion

---

## Phase 6: User Story 6 - Responsive and Accessible Experience (Priority: P1)

**Goal**: Ensure application works on all devices and is accessible to all users

**Independent Test**: Access application on mobile, tablet, desktop; use keyboard navigation; test with screen reader

### Implementation for User Story 6

- [ ] T088 [P] [US6] Create Header component in frontend/components/layout/Header.tsx with responsive navigation
- [ ] T089 [P] [US6] Create Navigation component in frontend/components/layout/Navigation.tsx with mobile menu
- [ ] T090 [P] [US6] Create Footer component in frontend/components/layout/Footer.tsx
- [ ] T091 [US6] Add responsive breakpoints to Tailwind config: mobile (320px+), tablet (768px+), desktop (1024px+)
- [ ] T092 [US6] Implement mobile-first responsive layouts in all pages using Tailwind responsive utilities
- [ ] T093 [US6] Add responsive grid/flexbox layouts to TaskList component
- [ ] T094 [US6] Ensure all interactive elements have minimum 44x44px touch targets for mobile
- [ ] T095 [US6] Add semantic HTML elements: header, nav, main, article, button, form
- [ ] T096 [US6] Add ARIA labels to all interactive elements without visible text
- [ ] T097 [US6] Add ARIA live regions for dynamic content updates (task creation, deletion)
- [ ] T098 [US6] Implement keyboard navigation: Tab, Enter, Escape, Arrow keys
- [ ] T099 [US6] Add visible focus indicators to all interactive elements with custom styling
- [ ] T100 [US6] Ensure color contrast ratios meet WCAG AA standards (4.5:1 for text, 3:1 for large text)
- [ ] T101 [US6] Add skip-to-content link for keyboard users
- [ ] T102 [US6] Test responsive design at 320px (mobile), 768px (tablet), 1440px (desktop)
- [ ] T103 [US6] Test keyboard navigation: verify all features accessible without mouse
- [ ] T104 [US6] Test with screen reader (NVDA/JAWS/VoiceOver): verify all content announced correctly
- [ ] T105 [US6] Run Lighthouse accessibility audit: target score 90+

**Checkpoint**: Application is now fully responsive and accessible across all devices and user needs

---

## Phase 7: User Story 4 - Edit and Delete Tasks (Priority: P2)

**Goal**: Users can modify existing tasks or remove tasks that are no longer relevant

**Independent Test**: Create a task, edit its details, save changes, then delete the task

### Implementation for User Story 4

- [ ] T106 [US4] Add update and delete functions to tasks API client in frontend/lib/api/tasks.ts
- [ ] T107 [US4] Create DeleteConfirmDialog component in frontend/components/tasks/DeleteConfirmDialog.tsx
- [ ] T108 [US4] Create edit task page in frontend/app/(protected)/tasks/[id]/edit/page.tsx
- [ ] T109 [US4] Implement updateTask logic in TasksContext: validate input, call API, update state
- [ ] T110 [US4] Implement deleteTask logic in TasksContext: show confirmation, call API, remove from state
- [ ] T111 [US4] Add edit button to TaskCard component
- [ ] T112 [US4] Add delete button to TaskCard component
- [ ] T113 [US4] Pre-populate edit form with existing task data
- [ ] T114 [US4] Add form validation for edit: same rules as create (title 1-100 chars, description max 500)
- [ ] T115 [US4] Add confirmation dialog before delete with cancel option
- [ ] T116 [US4] Add loading state during update operation
- [ ] T117 [US4] Add loading state during delete operation
- [ ] T118 [US4] Add error handling for failed update: show error message, keep form populated
- [ ] T119 [US4] Add error handling for failed delete: show error message, keep task in list
- [ ] T120 [US4] Add success feedback after successful update
- [ ] T121 [US4] Implement automatic redirect to task list after successful update
- [ ] T122 [US4] Handle 404 error when editing deleted task: show message and redirect
- [ ] T123 [US4] Test edit functionality: edit task → save → verify changes in list and backend
- [ ] T124 [US4] Test delete functionality: delete task → confirm → verify removed from list and backend
- [ ] T125 [US4] Test delete cancellation: click delete → cancel → verify task remains

**Checkpoint**: Users can now fully manage their tasks with edit and delete capabilities

---

## Phase 8: User Story 5 - Filter and Sort Tasks (Priority: P2)

**Goal**: Users can filter tasks by status and sort by various criteria to organize their task list

**Independent Test**: Create multiple tasks with different statuses and priorities, apply filters and sort options

### Implementation for User Story 5

- [ ] T126 [P] [US5] Create FilterControls component in frontend/components/tasks/FilterControls.tsx
- [ ] T127 [P] [US5] Create SortControls component in frontend/components/tasks/SortControls.tsx
- [ ] T128 [US5] Implement setFilters logic in TasksContext: update filter state, re-fetch tasks
- [ ] T129 [US5] Implement setSortBy logic in TasksContext: update sort state, re-order tasks
- [ ] T130 [US5] Add filter dropdown for status: all, complete, incomplete
- [ ] T131 [US5] Add filter dropdown for priority: all, low, medium, high
- [ ] T132 [US5] Add sort dropdown with options: date-newest, date-oldest, priority-high, priority-low
- [ ] T133 [US5] Implement client-side filtering logic for tasks array
- [ ] T134 [US5] Implement client-side sorting logic for tasks array
- [ ] T135 [US5] Add URL query parameters for filters and sort (for shareable links)
- [ ] T136 [US5] Persist filter/sort preferences in localStorage
- [ ] T137 [US5] Restore filter/sort preferences on page load
- [ ] T138 [US5] Add visual indicator for active filters
- [ ] T139 [US5] Add clear filters button
- [ ] T140 [US5] Optimize filtering/sorting for large task lists (100+ tasks): ensure < 200ms
- [ ] T141 [US5] Test filtering by status: verify only matching tasks shown
- [ ] T142 [US5] Test filtering by priority: verify only matching tasks shown
- [ ] T143 [US5] Test sorting by date: verify correct order (newest/oldest)
- [ ] T144 [US5] Test sorting by priority: verify correct order (high to low)
- [ ] T145 [US5] Test filter persistence: apply filters → refresh page → verify filters restored

**Checkpoint**: Users can now efficiently organize and find tasks with filtering and sorting

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final production readiness

- [ ] T146 [P] Add loading skeleton components for better perceived performance
- [ ] T147 [P] Implement toast notifications for success/error feedback across all operations
- [ ] T148 [P] Add page transitions and smooth animations for better UX
- [ ] T149 [P] Optimize bundle size: implement code splitting and lazy loading for routes
- [ ] T150 [P] Add React.memo to expensive components (TaskList, TaskCard)
- [ ] T151 [P] Implement useMemo for filtered/sorted task lists
- [ ] T152 [P] Implement useCallback for event handlers to prevent unnecessary re-renders
- [ ] T153 [P] Add error boundary for each major section (auth, tasks, layout)
- [ ] T154 [P] Create custom 404 page in frontend/app/not-found.tsx
- [ ] T155 [P] Add meta tags for SEO in layout and page components
- [ ] T156 [P] Configure Content Security Policy headers in next.config.js
- [ ] T157 [P] Add rate limiting indicators for API requests
- [ ] T158 [P] Implement request debouncing for search/filter operations
- [ ] T159 [P] Add favicon and app icons in frontend/public/
- [ ] T160 [P] Create README.md with setup instructions (reference quickstart.md)
- [ ] T161 Run Lighthouse performance audit: target score 85+
- [ ] T162 Run Lighthouse accessibility audit: target score 90+
- [ ] T163 Run Lighthouse best practices audit: target score 90+
- [ ] T164 Run Lighthouse SEO audit: target score 90+
- [ ] T165 Test all user flows end-to-end: signup → login → create task → toggle → edit → delete → logout
- [ ] T166 Verify all error scenarios handled gracefully: network errors, API errors, validation errors
- [ ] T167 Verify responsive design on real devices: iOS, Android, tablets
- [ ] T168 Verify keyboard navigation works for all features
- [ ] T169 Verify screen reader compatibility with NVDA/JAWS/VoiceOver
- [ ] T170 Run quickstart.md validation: follow setup guide and verify all steps work

**Checkpoint**: Application is production-ready with optimized performance, accessibility, and user experience

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - Authentication is required for all other features
- **User Story 2 (Phase 4)**: Depends on Foundational and US1 - Requires authentication to view/create tasks
- **User Story 3 (Phase 5)**: Depends on Foundational, US1, and US2 - Requires tasks to exist to toggle
- **User Story 6 (Phase 6)**: Depends on Foundational, US1, US2, US3 - Applies responsive/accessible patterns to existing features
- **User Story 4 (Phase 7)**: Depends on Foundational, US1, US2 - Requires tasks to exist to edit/delete
- **User Story 5 (Phase 8)**: Depends on Foundational, US1, US2 - Requires tasks to exist to filter/sort
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after US1 - Requires authentication
- **User Story 3 (P1)**: Can start after US2 - Requires tasks to exist
- **User Story 6 (P1)**: Can start after US1, US2, US3 - Applies to existing features
- **User Story 4 (P2)**: Can start after US2 - Requires tasks to exist, independent of US3
- **User Story 5 (P2)**: Can start after US2 - Requires tasks to exist, independent of US3 and US4

### Within Each User Story

- Models/Types before API clients
- API clients before Context logic
- Context logic before Components
- Components before Pages
- Core implementation before error handling
- Error handling before testing
- Story complete before moving to next priority

### Parallel Opportunities

- **Setup (Phase 1)**: T002-T005 (dependencies), T006-T010 (configuration) can run in parallel
- **Foundational (Phase 2)**: T012-T016 (types), T030-T035 (UI components) can run in parallel
- **User Story 1**: T036-T040 (components) can run in parallel after API client is ready
- **User Story 2**: T056-T060 (components) can run in parallel after API client is ready
- **User Story 6**: T088-T090 (layout components) can run in parallel
- **Polish**: Most tasks (T146-T160) can run in parallel as they affect different areas

---

## Parallel Example: User Story 2

```bash
# After T056 (tasks API client) is complete, launch these in parallel:
Task T057: "Create TaskCard component in frontend/components/tasks/TaskCard.tsx"
Task T058: "Create TaskList component in frontend/components/tasks/TaskList.tsx"
Task T059: "Create TaskForm component in frontend/components/tasks/TaskForm.tsx"
Task T060: "Create EmptyState component in frontend/components/tasks/EmptyState.tsx"

# These components don't depend on each other and work on different files
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 Only)

1. Complete Phase 1: Setup (T001-T011)
2. Complete Phase 2: Foundational (T012-T035) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 - Authentication (T036-T055)
4. Complete Phase 4: User Story 2 - View/Create Tasks (T056-T075)
5. Complete Phase 5: User Story 3 - Toggle Completion (T076-T087)
6. Complete Phase 6: User Story 6 - Responsive/Accessible (T088-T105)
7. **STOP and VALIDATE**: Test MVP end-to-end
8. Deploy/demo MVP if ready

**MVP Scope**: 105 tasks covering authentication, basic task management, completion tracking, and responsive/accessible design

### Incremental Delivery

1. Complete Setup + Foundational (T001-T035) → Foundation ready
2. Add User Story 1 (T036-T055) → Test independently → Deploy/Demo (Authentication working!)
3. Add User Story 2 (T056-T075) → Test independently → Deploy/Demo (Task management working!)
4. Add User Story 3 (T076-T087) → Test independently → Deploy/Demo (MVP complete!)
5. Add User Story 6 (T088-T105) → Test independently → Deploy/Demo (Fully responsive and accessible!)
6. Add User Story 4 (T106-T125) → Test independently → Deploy/Demo (Edit/Delete added!)
7. Add User Story 5 (T126-T145) → Test independently → Deploy/Demo (Filtering/Sorting added!)
8. Add Polish (T146-T170) → Test independently → Deploy/Demo (Production ready!)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T035)
2. Once Foundational is done:
   - Developer A: User Story 1 (T036-T055)
   - Developer B: Can start on UI components for US2 (T057-T060) in parallel
3. After US1 complete:
   - Developer A: User Story 2 backend integration (T056, T061-T075)
   - Developer B: User Story 6 layout components (T088-T090)
4. After US2 complete:
   - Developer A: User Story 3 (T076-T087)
   - Developer B: User Story 4 (T106-T125)
   - Developer C: User Story 5 (T126-T145)
5. Polish tasks (T146-T170) can be distributed across team

---

## Notes

- **[P] tasks**: Different files, no dependencies - can run in parallel
- **[Story] label**: Maps task to specific user story for traceability
- **File paths**: All tasks include exact file paths for clarity
- **Independent stories**: Each user story should be independently completable and testable
- **Commit strategy**: Commit after each task or logical group of related tasks
- **Checkpoints**: Stop at any checkpoint to validate story independently before proceeding
- **Tests**: Not included as they were not explicitly requested in the specification
- **Total tasks**: 170 tasks covering complete frontend implementation
- **MVP tasks**: 105 tasks (T001-T105) for minimum viable product
- **Enhancement tasks**: 65 tasks (T106-T170) for additional features and polish

---

## Task Count Summary

- **Phase 1 (Setup)**: 11 tasks
- **Phase 2 (Foundational)**: 24 tasks
- **Phase 3 (US1 - Authentication)**: 20 tasks
- **Phase 4 (US2 - View/Create)**: 20 tasks
- **Phase 5 (US3 - Toggle)**: 12 tasks
- **Phase 6 (US6 - Responsive/Accessible)**: 18 tasks
- **Phase 7 (US4 - Edit/Delete)**: 20 tasks
- **Phase 8 (US5 - Filter/Sort)**: 20 tasks
- **Phase 9 (Polish)**: 25 tasks

**Total**: 170 tasks
**MVP Scope**: 105 tasks (Phases 1-6)
**Enhancements**: 65 tasks (Phases 7-9)
