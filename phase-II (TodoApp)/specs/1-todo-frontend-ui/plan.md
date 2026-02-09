# Implementation Plan: Frontend & UI for Todo Application

**Branch**: `1-todo-frontend-ui` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/1-todo-frontend-ui/spec.md`

**Note**: This plan follows the `/sp.plan` command workflow for architectural design and implementation strategy.

## Summary

Build a responsive Next.js 16+ frontend application that integrates with FastAPI backend via RESTful APIs. Implement Better Auth for authentication with JWT token management, ensuring secure token storage and automatic attachment to API requests. Deliver all CRUD operations for task management with proper error handling, loading states, and responsive design across mobile, tablet, and desktop devices.

## Technical Context

**Language/Version**: JavaScript/TypeScript with Next.js 16+ (App Router)
**Primary Dependencies**: Next.js 16+, React 18+, Better Auth, Tailwind CSS (or CSS Modules), Axios/Fetch API
**Storage**: N/A (frontend consumes backend API; JWT token stored in HttpOnly cookies or secure localStorage)
**Testing**: Jest + React Testing Library (component tests), Playwright/Cypress (E2E tests - optional for MVP)
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge) on mobile (375px+), tablet (768px+), desktop (1024px+)
**Project Type**: Web application (frontend only, part of full-stack system)
**Performance Goals**: Initial page load < 3s, API response handling < 500ms, smooth 60fps UI interactions
**Constraints**:
- Must remain fully decoupled from backend (API-only communication)
- JWT tokens must be securely stored and automatically attached to requests
- Responsive design mandatory (mobile-first approach)
- No manual coding outside Spec-Kit workflow
**Scale/Scope**: ~10-15 pages/components, 7 user stories (4 P1, 2 P2, 1 P3), authentication + full CRUD operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Functional Completeness ✅ PASS
- **Requirement**: All 5 basic features (Add, View, Edit, Delete, Mark Complete/Incomplete) implemented
- **Status**: Spec includes all 5 features across user stories (US2: View, US3: Create, US4: Toggle, US5: Edit, US6: Delete)
- **Verification**: Each feature has acceptance scenarios and independent tests defined

### II. Security-First ✅ PASS
- **Requirement**: JWT authentication, user isolation, stateless backend interaction
- **Status**:
  - US1 implements Better Auth with JWT token generation
  - FR-004: JWT token stored securely (HttpOnly cookies or secure localStorage)
  - FR-005: JWT token attached to Authorization header for all API requests
  - FR-016: 401 Unauthorized handling (clear token, redirect to login)
  - FR-022: XSS prevention through input sanitization
- **Verification**: Security requirements explicitly defined in spec

### III. Reliability & Correctness ✅ PASS
- **Requirement**: API contracts followed, error handling for all failure modes
- **Status**:
  - FR-015: User-friendly error messages for validation, API failures, auth errors
  - FR-016: 401 Unauthorized handling
  - FR-017: 404 Not Found handling
  - Edge cases documented (token expiration, network failures, unauthorized access)
- **Verification**: Error handling requirements cover 401, 404, validation, network failures

### IV. Responsiveness ✅ PASS
- **Requirement**: Mobile, tablet, desktop support with adaptive layouts
- **Status**:
  - US7 (P3): Responsive UI across devices
  - FR-019: Responsive CSS units (rem, %, vw/vh)
  - FR-020: Flexbox/grid for adaptive layouts
  - FR-021: Minimum 44x44px touch targets
  - SC-005: Responsive testing at 375px, 768px, 1440px
- **Verification**: Responsive design requirements explicitly defined with measurable criteria

### V. Spec-Driven Development ✅ PASS
- **Requirement**: Spec → Plan → Tasks → Implementation workflow
- **Status**:
  - Spec.md created and approved
  - Plan.md in progress (this document)
  - Tasks.md will follow after plan completion
  - Implementation via specialized agents (nextjs-ui-dev)
- **Verification**: Following mandated workflow

### Constitution Compliance Summary
**Overall Status**: ✅ ALL GATES PASSED

No violations detected. All constitutional requirements are addressed in the specification and will be enforced during implementation.

## Project Structure

### Documentation (this feature)

```text
specs/1-todo-frontend-ui/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (next step)
├── data-model.md        # Phase 1 output (client-side state models)
├── quickstart.md        # Phase 1 output (setup and run instructions)
└── contracts/           # Phase 1 output (API integration contracts)
    ├── auth-api.md      # Authentication endpoints
    ├── tasks-api.md     # Task CRUD endpoints
    └── error-responses.md # Error handling contracts
```

### Source Code (repository root)

```text
frontend/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (protected)/    # Protected route group (requires auth)
│   │   ├── tasks/
│   │   │   ├── page.tsx           # Task list
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # Create task
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Task detail
│   │   │       └── edit/
│   │   │           └── page.tsx   # Edit task
│   │   └── layout.tsx  # Protected layout with auth check
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home/landing page
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   ├── tasks/         # Task-specific components
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   └── DeleteConfirmDialog.tsx
│   ├── auth/          # Auth-specific components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── LogoutButton.tsx
│   └── layout/        # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
├── lib/               # Utilities and configurations
│   ├── api/          # API client
│   │   ├── client.ts          # Axios/Fetch wrapper with JWT interceptor
│   │   ├── auth.ts            # Auth API calls
│   │   └── tasks.ts           # Task API calls
│   ├── auth/         # Auth utilities
│   │   ├── better-auth.ts     # Better Auth configuration
│   │   ├── token.ts           # JWT token management
│   │   └── protected-route.tsx # Route protection HOC
│   ├── hooks/        # Custom React hooks
│   │   ├── useAuth.ts         # Auth state hook
│   │   ├── useTasks.ts        # Tasks data hook
│   │   └── useApi.ts          # API call hook with loading/error states
│   └── utils/        # Helper functions
│       ├── validation.ts      # Form validation
│       └── formatting.ts      # Date/text formatting
├── types/            # TypeScript type definitions
│   ├── auth.ts       # Auth types (User, Token, etc.)
│   ├── task.ts       # Task types
│   └── api.ts        # API response types
├── public/           # Static assets
│   ├── images/
│   └── icons/
├── __tests__/        # Tests (optional for MVP)
│   ├── components/
│   └── integration/
├── .env.local        # Environment variables (not committed)
├── .env.example      # Environment variables template
├── next.config.js    # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies
```

**Structure Decision**: Web application structure (Option 2 from template) with Next.js App Router. Using route groups for authentication and protected routes. Component organization follows atomic design principles (ui → feature-specific → layout). API client layer abstracts backend communication with JWT token management.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. This section is not applicable.

---

## Phase 0: Research & Technology Decisions ✅ COMPLETED

**Status**: Completed on 2026-02-09

**Research Tasks Completed**:
1. ✅ Better Auth integration with Next.js 16+ App Router - Decision: Use Better Auth v1.x with API routes
2. ✅ JWT token storage best practices - Decision: HttpOnly cookies (primary), localStorage fallback
3. ✅ API client configuration - Decision: Axios with request/response interceptors
4. ✅ Responsive design patterns - Decision: Tailwind CSS with mobile-first approach
5. ✅ Error boundary implementation - Decision: App Router error.tsx convention
6. ✅ Protected route patterns - Decision: Middleware for route protection

**Output**: ✅ `research.md` - Complete with decisions, rationale, alternatives, and implementation approaches

**Key Decisions**:
- **Authentication**: Better Auth v1.x (lightweight, JWT-focused, Next.js optimized)
- **Token Storage**: HttpOnly cookies (XSS protection, automatic transmission)
- **API Client**: Axios with interceptors (centralized error handling, token attachment)
- **Styling**: Tailwind CSS (mobile-first, utility-first, excellent Next.js integration)
- **Error Handling**: App Router error.tsx (built-in error boundaries)
- **Route Protection**: Middleware (efficient, centralized, runs before rendering)

---

## Phase 1: Design & Contracts ✅ COMPLETED

**Status**: Completed on 2026-02-08

**Design Tasks Completed**:
1. ✅ Client-side state models (User, Task, AuthState, TasksState, FormState, UIState)
2. ✅ API contract definitions (auth endpoints, task CRUD endpoints, error responses)
3. ✅ Component hierarchy and data flow (Context API structure, optimistic updates)
4. ✅ Form validation rules (email, password, title, description constraints)
5. ✅ Error handling strategy (centralized Axios interceptor, user-friendly messages)

**Outputs**:
- ✅ `data-model.md` - Complete client-side state models with TypeScript definitions
- ✅ `contracts/auth-api.md` - Authentication endpoints (signup, login, logout, getCurrentUser)
- ✅ `contracts/tasks-api.md` - Task CRUD endpoints (get, create, update, delete)
- ✅ `contracts/error-responses.md` - Standardized error format and handling
- ✅ `quickstart.md` - Complete setup and run instructions

**Key Artifacts**:
- **Data Models**: User, Task, AuthState, TasksState, FormState, LoadingState, ModalState
- **API Contracts**: 4 auth endpoints, 5 task endpoints, standardized error responses
- **State Management**: React Context API with useState/useReducer
- **Validation Rules**: Email format, password length, title/description constraints
- **Error Codes**: 20+ error codes covering auth, validation, not found, conflict, server errors

---

## Next Steps

1. ✅ Constitution Check completed - ALL GATES PASSED
2. ✅ Execute Phase 0: Research - COMPLETED
3. ✅ Execute Phase 1: Design - COMPLETED
4. ⏳ Generate tasks.md via `/sp.tasks` command
5. ⏳ Execute implementation via `/sp.implement` command

**Ready for Task Breakdown**: All planning artifacts complete. Run `/sp.tasks` to generate implementation tasks.
