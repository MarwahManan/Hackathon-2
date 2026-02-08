# Tasks: Authentication & Security

**Input**: Design documents from `/specs/004-auth-security/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Frontend code: `frontend/`
- Backend code: `backend/app/`
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Environment configuration and dependency installation

- [x] T001 Generate secure JWT secret using `openssl rand -base64 32` and save for environment configuration
- [x] T002 [P] Create frontend/.env.local with BETTER_AUTH_SECRET, BETTER_AUTH_URL, DATABASE_URL, NEXT_PUBLIC_API_URL
- [x] T003 [P] Update backend/.env to add BETTER_AUTH_SECRET (same value as frontend)
- [x] T004 Update backend/app/config.py to add BETTER_AUTH_SECRET field to Settings class
- [x] T005 Install Better Auth dependencies in frontend: `npm install better-auth` (JWT plugin is built-in)

**Checkpoint**: Environment configured - user story implementation can now begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create frontend/lib/auth.ts with Better Auth configuration (database, emailAndPassword, JWT plugin with 7-day expiration)
- [x] T007 Create frontend/app/api/auth/[...all]/route.ts with Better Auth handler (GET, POST exports)
- [x] T008 [P] Create frontend/lib/auth-client.ts with Better Auth client setup
- [x] T009 [P] Create frontend/lib/api-client.ts with apiRequest function that injects JWT from session into Authorization header
- [x] T010 Update backend/app/utils/jwt.py to use BETTER_AUTH_SECRET for token verification (replace JWT_SECRET)
- [x] T011 Update backend/app/middleware/auth.py to verify JWT tokens issued by Better Auth
- [x] T012 Verify backend/app/config.py loads BETTER_AUTH_SECRET from environment

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Signup (Priority: P1) 🎯 MVP

**Goal**: Enable new users to create accounts and receive JWT tokens

**Independent Test**: Submit signup form with valid email/password, verify account creation in database, confirm JWT token is returned and user is redirected to dashboard

### Implementation for User Story 1

- [x] T013 [US1] Create frontend/app/(auth)/signup/page.tsx with signup form (email, password fields)
- [x] T014 [US1] Implement client-side validation in signup page (email format, password min 8 chars)
- [x] T015 [US1] Implement signup form submission using authClient.signUp.email() in signup page
- [x] T016 [US1] Add error handling and display error messages in signup page
- [x] T017 [US1] Implement redirect to /dashboard after successful signup
- [x] T018 [US1] Add link to signin page from signup page

**Checkpoint**: User Story 1 complete - users can create accounts and receive JWT tokens independently

---

## Phase 4: User Story 2 - User Signin (Priority: P1) 🎯 MVP

**Goal**: Enable existing users to authenticate and receive JWT tokens

**Independent Test**: Submit signin form with valid credentials, verify JWT token is returned with correct user information, confirm user can access protected endpoints

### Implementation for User Story 2

- [x] T019 [US2] Create frontend/app/(auth)/signin/page.tsx with signin form (email, password fields)
- [x] T020 [US2] Implement signin form submission using authClient.signIn.email() in signin page
- [x] T021 [US2] Add error handling and display error messages for invalid credentials in signin page
- [x] T022 [US2] Implement redirect to /dashboard after successful signin
- [x] T023 [US2] Add link to signup page from signin page
- [x] T024 [US2] Verify authentication state persists across page navigation (handled by Better Auth)

**Checkpoint**: User Stories 1 AND 2 complete - users can signup and signin independently

---

## Phase 5: User Story 3 - Protected API Access with JWT (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to access backend API with JWT tokens and enforce user isolation

**Independent Test**: Make API requests with valid JWT (succeeds with user's data), invalid JWT (returns 401), no JWT (returns 401), verify user isolation by attempting to access another user's task

### Implementation for User Story 3

- [x] T025 [US3] Update all frontend API calls to use apiRequest() function from lib/api-client.ts (automatically injects JWT)
- [ ] T026 [US3] Test GET /api/tasks with valid JWT returns only authenticated user's tasks (MANUAL TEST)
- [ ] T027 [US3] Test POST /api/tasks with valid JWT creates task with authenticated user's ID (MANUAL TEST)
- [ ] T028 [US3] Test PUT /api/tasks/{id} with valid JWT updates only authenticated user's tasks (MANUAL TEST)
- [ ] T029 [US3] Test DELETE /api/tasks/{id} with valid JWT deletes only authenticated user's tasks (MANUAL TEST)
- [ ] T030 [US3] Test all /api/tasks endpoints with invalid JWT return 401 Unauthorized (MANUAL TEST)
- [ ] T031 [US3] Test all /api/tasks endpoints with no JWT return 401 Unauthorized (MANUAL TEST)
- [ ] T032 [US3] Test cross-user access attempt returns 404 Not Found (not 403) (MANUAL TEST)

**Checkpoint**: User Stories 1, 2, AND 3 complete - full authentication and authorization flow operational

---

## Phase 6: User Story 4 - Token Expiration Handling (Priority: P2)

**Goal**: Enforce token expiration and handle expired tokens gracefully

**Independent Test**: Create JWT with short expiration, wait for expiration, attempt to use it, verify 401 response with "TOKEN_EXPIRED" error code

### Implementation for User Story 4

- [x] T034 [US4] Verify backend JWT verification validates exp claim and returns 401 with TOKEN_EXPIRED code for expired tokens (already implemented in backend/app/utils/jwt.py)
- [x] T035 [US4] Implement frontend error handling to detect 401 TOKEN_EXPIRED responses (implemented in api-client.ts)
- [x] T036 [US4] Implement automatic redirect to signin page when token expires (implemented in api-client.ts)
- [ ] T037 [US4] Add optional frontend warning message when token is about to expire (within 5 minutes) (OPTIONAL - not implemented)

**Checkpoint**: All user stories complete (US1-4) - full authentication system operational with token expiration

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T038 [P] Add loading states to signup and signin forms (implemented in page components)
- [x] T039 [P] Add responsive styling to signup and signin pages (mobile, tablet, desktop) (implemented with Tailwind CSS)
- [x] T040 [P] Implement logout functionality (signout button, clear JWT, redirect to signin) (created LogoutButton component)
- [x] T041 [P] Add protected route middleware to redirect unauthenticated users to signin page (created useProtectedRoute hook)
- [x] T042 [P] Add redirect logic to prevent authenticated users from accessing signin/signup pages (created useAuthRedirect hook)
- [x] T043 [P] Verify all error messages are user-friendly and consistent (implemented in all forms)
- [ ] T044 [P] Add request/response logging for authentication endpoints (OPTIONAL - not implemented)
- [x] T045 Verify CORS configuration allows frontend origin with credentials (already configured in backend/app/main.py)
- [ ] T046 Test complete authentication flow end-to-end (signup → signin → API access → logout) (MANUAL TEST REQUIRED)
- [ ] T047 Test user isolation with multiple users (user A cannot access user B's tasks) (MANUAL TEST REQUIRED)
- [ ] T048 Verify JWT secret mismatch detection (frontend and backend use same secret) (MANUAL TEST REQUIRED)

**Status**: Implementation complete - manual testing required

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 stories → P2 stories)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (backend middleware already exists)
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Frontend pages before API integration (signup/signin pages before API calls)
- Better Auth configuration before page implementation
- Backend JWT verification before protected endpoint testing
- All P1 stories are independent and can be implemented in any order after Foundational phase

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel within their dependencies:
  - T008, T009 (frontend client setup)
- Once Foundational phase completes, ALL user stories can start in parallel (if team capacity allows):
  - US1, US2, US3, US4 are fully independent
- Within US1: T013 and T014 can run in parallel (page creation and validation)
- All Polish tasks marked [P] can run in parallel (T038-T044)

---

## Parallel Example: After Foundational Phase

```bash
# Launch all P1 MVP user stories in parallel (if team has capacity):
Task: "Create signup page in frontend/app/(auth)/signup/page.tsx" (US1)
Task: "Create signin page in frontend/app/(auth)/signin/page.tsx" (US2)
Task: "Update frontend API calls to use apiRequest() with JWT injection" (US3)

# Or work sequentially through user stories:
# Complete US1 → Test independently → Complete US2 → Test independently → etc.
```

---

## Implementation Strategy

### MVP First (P1 User Stories Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T012) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T013-T018) - User signup
4. Complete Phase 4: User Story 2 (T019-T024) - User signin
5. Complete Phase 5: User Story 3 (T025-T033) - Protected API access
6. **STOP and VALIDATE**: Test all P1 stories independently
7. Complete Phase 7: Polish (T038-T048)
8. Deploy/demo MVP with full authentication and authorization

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (users can signup)
3. Add User Story 2 → Test independently → Deploy/Demo (users can signin)
4. Add User Story 3 → Test independently → Deploy/Demo (full auth MVP!)
5. Add User Story 4 → Test independently → Deploy/Demo (enhanced with token expiration)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T012)
2. Once Foundational is done:
   - Developer A: User Story 1 (T013-T018)
   - Developer B: User Story 2 (T019-T024)
   - Developer C: User Story 3 (T025-T033)
   - Developer D: User Story 4 (T034-T037)
3. Stories complete and integrate independently
4. Team completes Polish together (T038-T048)

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All endpoints require JWT authentication via Authorization header
- User isolation enforced at database query level (WHERE user_id = current_user)
- Use 404 (not 403) when user tries to access another user's resource (security best practice)
- Backend JWT verification middleware already exists from specs/003-backend-api, just needs update for BETTER_AUTH_SECRET
- Frontend uses Better Auth for authentication, backend uses PyJWT for verification
- Shared BETTER_AUTH_SECRET environment variable for signing and verification

---

## Task Summary

- **Total Tasks**: 48
- **Setup Tasks**: 5 (T001-T005)
- **Foundational Tasks**: 7 (T006-T012)
- **User Story 1 Tasks**: 6 (T013-T018)
- **User Story 2 Tasks**: 6 (T019-T024)
- **User Story 3 Tasks**: 9 (T025-T033)
- **User Story 4 Tasks**: 4 (T034-T037)
- **Polish Tasks**: 11 (T038-T048)

**Parallelizable Tasks**: 12 tasks marked with [P]

**MVP Scope** (P1 stories only): Tasks T001-T033 + T038-T048 = 44 tasks

**Full Feature Scope** (including P2): All 48 tasks
