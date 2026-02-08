---
id: 001
title: Configure CLAUDE.md for Todo App Stack
stage: general
date: 2026-02-07
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-console-todo-app
user: unknown
command: none
labels: ["configuration", "agents", "stack-setup", "todo-app"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - CLAUDE.md
tests:
---

## Prompt

update the "claude.md" file based on my project requirements.
in this file:
-use Auth Agent for authentication
-use Frontend Agent for frontend development (e.g , Next.js)
-use DB Agent for database design and operations
-use backend agent for FASTAPI development

Below are my project requiremnts:
**** Phase II: Todo Full-Stack Web Application
Basic Level Functionality
Objective: Using Claude Code and Spec-Kit Plus transform the console app into a modern multi-user web application with persistent storage.
💡Development Approach: Use the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via Claude Code. No manual coding allowed. We will review the process, prompts, and iterations to judge each phase and project.
Requirements
Implement all 5 Basic Level features as a web application
Create RESTful API endpoints
Build responsive frontend interface
Store data in Neon Serverless PostgreSQL database
Authentication – Implement user signup/signin using Better Auth
Technology Stack
Layer
Technology
Frontend
Next.js 16+ (App Router)
Backend
Python FastAPI
ORM
SQLModel
Database
Neon Serverless PostgreSQL
Spec-Driven
Claude Code + Spec-Kit Plus
Authentication
Better Auth

Better Auth can be configured to issue JWT (JSON Web Token) tokens when users log in. These tokens are self-contained credentials that include user information and can be verified by any service that knows the secret key.
How It Works
User logs in on Frontend → Better Auth creates a session and issues a JWT token
Frontend makes API call → Includes the JWT token in the Authorization: Bearer <token> header
Backend receives request → Extracts token from header, verifies signature using shared secret
Backend identifies user → Decodes token to get user ID, email, etc. and matches it with the user ID in the URL
Backend filters data → Returns only tasks belonging to that user

## Response snapshot

Updated CLAUDE.md with comprehensive project-specific configuration including:

1. **Technology Stack Table** - Documented all layers (Frontend: Next.js 16+, Backend: FastAPI, ORM: SQLModel, Database: Neon, Auth: Better Auth)

2. **Specialized Agent Usage Guidelines** - Added detailed sections for each agent:
   - Auth Agent (auth-security-architect): JWT tokens, Better Auth integration, authentication middleware
   - Frontend Agent (nextjs-ui-dev): Next.js App Router, React components, API integration
   - Database Agent (neon-db-architect): Schema design, SQLModel models, Neon connection
   - Backend Agent (fastapi-backend-architect): FastAPI endpoints, validation, user filtering

3. **Authentication Architecture** - Documented complete JWT token flow:
   - User login → Better Auth issues JWT
   - API requests → Include Bearer token
   - Token verification → FastAPI middleware validates
   - Data filtering → User-specific queries

4. **Agent Coordination Guidelines** - Defined multi-agent workflow:
   - Start with DB Agent (schema design)
   - Then Auth Agent (authentication setup)
   - Then Backend Agent (API layer)
   - Finally Frontend Agent (UI implementation)

5. **Development Workflow** - Reinforced Spec-Driven Development process:
   - /sp.specify → /sp.plan → /sp.tasks → /sp.implement
   - No manual coding allowed
   - All work delegated to specialized agents

6. **Project Structure** - Defined directory layout for frontend/, backend/, specs/, history/

7. **Environment Variables** - Listed required configuration (DATABASE_URL, JWT_SECRET, BETTER_AUTH_SECRET)

## Outcome

- ✅ Impact: CLAUDE.md now contains complete project-specific configuration for Todo Full-Stack Web Application with clear agent usage guidelines
- 🧪 Tests: None (configuration file)
- 📁 Files: Modified CLAUDE.md (added ~240 lines of project-specific configuration)
- 🔁 Next prompts: Begin spec-driven development with /sp.specify to define first feature
- 🧠 Reflection: Configuration provides clear guidance on which agent to use for each layer, ensuring proper separation of concerns and leveraging specialized expertise

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A (configuration work)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Test agent invocation by starting with /sp.specify for user authentication feature
