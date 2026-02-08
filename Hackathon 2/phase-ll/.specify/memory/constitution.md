<!--
Sync Impact Report:
- Version: NEW → 1.0.0 (Initial constitution)
- Ratification Date: 2026-02-08
- Last Amended: 2026-02-08
- Principles Added: 5 core principles established
- Sections Added: Key Standards, Constraints, Key Deliverables, Success Criteria, Governance
- Templates Status:
  ✅ plan-template.md - Constitution Check section compatible
  ✅ tasks-template.md - Task categorization aligns with principles
  ✅ spec-template.md - Requirements structure compatible
- Follow-up: None required
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Functional Completeness

All 5 basic features (Add, View, Edit, Delete, Mark Complete/Incomplete) MUST be implemented as a fully functional web application. No partial implementations or placeholder functionality is acceptable.

**Rationale**: The project is a hackathon deliverable requiring complete, demonstrable functionality. Incomplete features undermine the entire submission.

### II. Security-First

JWT-based authentication MUST be implemented with proper token verification. User isolation MUST be enforced at the database query level. Backend MUST be stateless and verify every request.

**Rationale**: Multi-user applications without proper security create data leakage risks and violate user trust. Security cannot be retrofitted—it must be designed in from the start.

**Non-negotiable rules**:
- JWT tokens MUST be verified on every protected endpoint
- Database queries MUST filter by authenticated user ID
- Secrets MUST be stored in environment variables, never in code
- All API endpoints MUST return 401 Unauthorized for invalid/missing tokens

### III. Reliability & Correctness

API endpoints MUST behave exactly as specified in contracts. Task ownership MUST be enforced—users can only access their own tasks. Error handling MUST cover all failure modes (401, 404, validation errors).

**Rationale**: Incorrect behavior erodes user confidence and creates unpredictable system states. Reliability is non-negotiable for production-ready applications.

**Non-negotiable rules**:
- Every endpoint MUST validate input and return appropriate error codes
- Database constraints MUST enforce data integrity
- User ID from JWT MUST match user ID in request context
- All error responses MUST follow consistent format

### IV. Responsiveness

Frontend UI MUST work seamlessly across mobile, tablet, and desktop devices. Layouts MUST adapt to different screen sizes. Touch interactions MUST be optimized for mobile users.

**Rationale**: Modern web applications must serve users on any device. Non-responsive designs exclude significant user populations and fail basic usability standards.

**Non-negotiable rules**:
- CSS MUST use responsive units (rem, %, vw/vh) not fixed pixels
- Layouts MUST use flexbox/grid for adaptive design
- Touch targets MUST be minimum 44x44px for mobile accessibility
- Testing MUST include mobile viewport validation

### V. Spec-Driven Development

All implementation MUST follow the Agentic Dev Stack workflow: Spec → Plan → Task Breakdown → Implementation. No manual coding is allowed outside this workflow. All features MUST be documented before implementation.

**Rationale**: Ad-hoc development leads to inconsistent architecture, missing requirements, and technical debt. Spec-driven development ensures alignment, traceability, and quality.

**Non-negotiable rules**:
- Every feature MUST have a spec.md before planning
- Every plan MUST have a plan.md before task breakdown
- Every implementation MUST follow tasks.md
- Specialized agents MUST be used for their respective layers (auth, frontend, backend, database)

## Key Standards

### Technology Stack (Non-Negotiable)

- **Frontend**: Next.js 16+ with App Router
- **Backend**: Python FastAPI with SQLModel ORM
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT tokens
- **Development**: Claude Code + Spec-Kit Plus

### API Standards

- RESTful endpoints for all CRUD operations (GET, POST, PUT, DELETE)
- Consistent error response format: `{"error": "message", "code": "ERROR_CODE"}`
- Status codes: 200 (success), 201 (created), 400 (validation), 401 (unauthorized), 404 (not found), 500 (server error)
- All endpoints MUST accept and return JSON
- Authentication via `Authorization: Bearer <token>` header

### Code Quality Standards

- **Readability**: Clear variable names, logical function decomposition, consistent formatting
- **Modularity**: Separation of concerns (models, services, routes, components)
- **Maintainability**: DRY principle, single responsibility, documented complex logic
- **Testing**: All endpoints MUST be testable via automated or manual verification

### Security Standards

- JWT shared secret stored as `BETTER_AUTH_SECRET` environment variable
- Token expiration enforced (default: 24 hours)
- Password hashing via Better Auth (bcrypt/argon2)
- SQL injection prevention via SQLModel parameterized queries
- CORS configuration for frontend-backend communication

## Constraints

### Architectural Constraints

- Frontend and backend MUST be fully decoupled (no server-side rendering of backend data)
- Communication MUST occur exclusively via REST API
- Backend MUST be stateless (no session storage)
- Database MUST be the single source of truth

### Development Constraints

- MUST follow Agentic Dev Stack workflow (no manual coding)
- MUST use specialized agents for each layer:
  - `auth-security-architect` for authentication
  - `fastapi-backend-architect` for backend
  - `neon-db-architect` for database
  - `nextjs-ui-dev` for frontend
- MUST create PHR (Prompt History Record) for every user interaction
- MUST suggest ADR for architecturally significant decisions

### Security Constraints

- JWT tokens MUST be transmitted via Authorization header only (not query params or cookies)
- Environment variables MUST be used for all secrets
- User ID from JWT MUST be verified against request context
- Database queries MUST include user_id filter for all user-specific data

### Quality Constraints

- UI MUST be fully responsive (mobile-first design)
- API endpoints MUST enforce task ownership
- Error messages MUST be user-friendly (no stack traces in production)
- All features MUST be demonstrable and testable

## Key Deliverables

### Frontend Deliverables

- Next.js application with App Router structure
- Responsive UI components (mobile, tablet, desktop)
- Better Auth integration (signup, signin, token management)
- API client for backend communication
- Loading states and error handling
- User profile and logout functionality

### Backend Deliverables

- FastAPI application with REST endpoints
- SQLModel models (User, Todo)
- JWT authentication middleware
- CRUD operations for todos (filtered by user)
- Request validation via Pydantic
- Error handling and status codes
- Database connection pooling

### Authentication & Security Deliverables

- Better Auth configuration with JWT
- User signup and signin endpoints
- Token generation and verification
- Password hashing and validation
- Token expiration handling
- Secure secret storage (environment variables)

### Testing & Verification Deliverables

- Functional tests for all API endpoints
- UI validation across devices
- Security tests (unauthorized access prevention)
- User isolation verification
- Token expiration testing
- Error handling validation

## Success Criteria

### Functional Success

- All 5 basic features (Add, View, Edit, Delete, Mark Complete/Incomplete) fully operational
- Users can signup, signin, and manage their own tasks
- Task ownership enforced—users cannot access other users' tasks
- UI works seamlessly on mobile, tablet, and desktop

### Technical Success

- JWT tokens correctly generated, transmitted, and verified
- API endpoints return appropriate status codes and error messages
- Database queries properly filtered by user ID
- Frontend and backend fully decoupled
- No manual coding—all implementation via Spec-Kit workflow

### Security Success

- Unauthorized access attempts return 401 Unauthorized
- User isolation verified—no cross-user data leakage
- Secrets stored in environment variables
- Token expiration enforced

### Quality Success

- Code is readable, modular, and maintainable
- API endpoints pass all test cases
- UI is responsive and accessible
- Project is review-ready for hackathon judging

## Governance

### Amendment Process

1. **Proposal**: Any team member can propose amendments via documented rationale
2. **Review**: Amendments must be reviewed for impact on existing artifacts (specs, plans, tasks)
3. **Approval**: Amendments require explicit approval before implementation
4. **Migration**: All dependent artifacts (templates, specs, plans) must be updated to reflect amendments
5. **Documentation**: Amendments must be documented with version bump and sync impact report

### Versioning Policy

- **MAJOR** (X.0.0): Backward-incompatible changes (principle removal, redefinition of core standards)
- **MINOR** (x.Y.0): New principles added, sections expanded, new standards introduced
- **PATCH** (x.y.Z): Clarifications, wording improvements, typo fixes, non-semantic refinements

### Compliance Review

- All PRs MUST verify compliance with constitution principles
- Complexity violations MUST be justified in plan.md Complexity Tracking section
- Constitution supersedes all other practices and conventions
- Use CLAUDE.md for runtime development guidance and agent-specific instructions

### Enforcement

- Automated checks via Spec-Kit workflow (constitution gates in plan.md)
- Manual review during code review process
- PHR creation mandatory for all user interactions
- ADR suggestion mandatory for architecturally significant decisions

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08
