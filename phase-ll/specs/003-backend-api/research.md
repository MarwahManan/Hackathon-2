# Research & Technology Decisions: Backend & API

**Feature**: Backend & API for Todo Application
**Date**: 2026-02-08
**Status**: Complete

## Overview

This document captures the technology decisions, best practices, and rationale for the backend API implementation. All decisions align with the project constitution and prioritize security, reliability, and maintainability.

---

## Decision 1: FastAPI Framework

**Decision**: Use FastAPI 0.104+ as the web framework for the REST API.

**Rationale**:
- **Performance**: FastAPI is one of the fastest Python frameworks, built on Starlette and Pydantic
- **Type Safety**: Native support for Python type hints and automatic validation via Pydantic
- **Async Support**: Built-in async/await support for high-concurrency scenarios
- **Auto Documentation**: Automatic OpenAPI/Swagger documentation generation
- **Developer Experience**: Excellent error messages and IDE support
- **Constitution Alignment**: Specified in constitution as required technology

**Alternatives Considered**:
- **Flask**: More mature but lacks native async support and automatic validation
- **Django REST Framework**: Feature-rich but heavier, includes ORM we're not using
- **Rejected because**: FastAPI provides better performance, type safety, and async support while being lightweight

**Best Practices**:
- Use dependency injection for database sessions and authentication
- Leverage Pydantic models for request/response validation
- Organize endpoints using APIRouter for modularity
- Enable CORS middleware for frontend communication
- Use lifespan events for startup/shutdown tasks

---

## Decision 2: SQLModel ORM

**Decision**: Use SQLModel 0.14+ as the ORM for database operations.

**Rationale**:
- **Type Safety**: Combines SQLAlchemy and Pydantic for type-safe database models
- **Validation**: Automatic validation of data before database operations
- **FastAPI Integration**: Seamless integration with FastAPI's Pydantic validation
- **Simplicity**: Single model definition for both database and API schemas
- **Constitution Alignment**: Specified in constitution as required technology

**Alternatives Considered**:
- **SQLAlchemy Core**: More control but requires separate Pydantic models
- **Raw SQL**: Maximum control but loses type safety and validation
- **Rejected because**: SQLModel provides the best balance of type safety, validation, and developer experience

**Best Practices**:
- Define models with proper field types and constraints
- Use UUID for primary keys (better for distributed systems)
- Add indexes on foreign keys and frequently queried fields
- Use `relationship()` for defining associations
- Leverage `Field()` for validation rules and database constraints

---

## Decision 3: JWT Verification with PyJWT

**Decision**: Use PyJWT 2.8+ for JWT token verification in authentication middleware.

**Rationale**:
- **Industry Standard**: PyJWT is the most widely used JWT library for Python
- **Security**: Supports multiple algorithms (HS256, RS256) with proper validation
- **Simplicity**: Clean API for encoding/decoding tokens
- **Active Maintenance**: Well-maintained with regular security updates
- **Better Auth Compatibility**: Works seamlessly with Better Auth's JWT tokens

**Alternatives Considered**:
- **python-jose**: Similar functionality but less actively maintained
- **authlib**: More comprehensive but heavier than needed
- **Rejected because**: PyJWT is simpler, more focused, and sufficient for our needs

**Best Practices**:
- Verify token signature on every request (never trust unverified tokens)
- Check token expiration (`exp` claim)
- Validate issuer (`iss`) and audience (`aud`) if configured
- Extract user ID from `sub` claim
- Handle expired tokens with 401 Unauthorized and TOKEN_EXPIRED error code
- Store JWT secret in environment variable, never in code

---

## Decision 4: Neon PostgreSQL Connection Strategy

**Decision**: Use psycopg2-binary with connection pooling for Neon Serverless PostgreSQL.

**Rationale**:
- **Neon Compatibility**: Neon uses standard PostgreSQL protocol
- **Connection Pooling**: Essential for serverless databases to minimize cold starts
- **SQLModel Support**: SQLModel uses SQLAlchemy which supports psycopg2
- **Performance**: Pooling reduces connection overhead for concurrent requests
- **Constitution Alignment**: Neon specified as required database

**Alternatives Considered**:
- **asyncpg**: Async PostgreSQL driver but requires async SQLAlchemy
- **psycopg3**: Newer version but less mature ecosystem
- **Rejected because**: psycopg2 is stable, well-supported, and sufficient for our scale

**Best Practices**:
- Use SQLAlchemy's `create_engine()` with pooling parameters
- Configure pool size based on Neon's connection limits
- Use `pool_pre_ping=True` to handle stale connections
- Store DATABASE_URL in environment variable
- Use connection string format: `postgresql://user:pass@host/db`
- Handle connection errors gracefully with 500 Internal Server Error

---

## Decision 5: Middleware Pattern for Authentication

**Decision**: Implement JWT verification as FastAPI dependency, not global middleware.

**Rationale**:
- **Flexibility**: Some endpoints may not require authentication (health checks)
- **Explicit Security**: Each endpoint explicitly declares authentication requirement
- **Testability**: Easier to test endpoints with/without authentication
- **FastAPI Best Practice**: Dependency injection is the recommended pattern
- **Error Handling**: Better control over 401 responses per endpoint

**Alternatives Considered**:
- **Global Middleware**: Applies to all routes, harder to exclude specific endpoints
- **Decorator Pattern**: Less idiomatic in FastAPI, harder to compose
- **Rejected because**: Dependency injection provides better flexibility and testability

**Best Practices**:
- Create `get_current_user()` dependency that verifies JWT and returns user ID
- Use `Depends(get_current_user)` in endpoint signatures
- Raise `HTTPException(401)` for invalid/missing tokens
- Extract user ID from token and pass to endpoint function
- Log authentication failures for security monitoring

---

## Decision 6: Error Handling Strategy

**Decision**: Use FastAPI's HTTPException with consistent error response format.

**Rationale**:
- **Consistency**: All errors follow same JSON structure
- **HTTP Standards**: Proper use of status codes (400, 401, 404, 500)
- **Client-Friendly**: Error codes enable frontend to handle specific cases
- **Debugging**: Detailed messages in development, generic in production
- **Constitution Alignment**: FR-022 requires consistent error format

**Alternatives Considered**:
- **Custom Exception Classes**: More complex, harder to maintain
- **Problem Details (RFC 7807)**: Overkill for simple API
- **Rejected because**: HTTPException is simpler and sufficient for our needs

**Best Practices**:
- Use standard HTTP status codes consistently
- Return JSON: `{"error": "message", "code": "ERROR_CODE"}`
- Error codes: `INVALID_TOKEN`, `TOKEN_EXPIRED`, `VALIDATION_ERROR`, `NOT_FOUND`, `UNAUTHORIZED`
- Log all errors with stack traces for debugging
- Never expose sensitive information (database details, tokens) in error messages
- Use 404 (not 403) when user tries to access another user's task (avoid information leakage)

---

## Decision 7: Logging Strategy

**Decision**: Use Python's built-in `logging` module with structured logging.

**Rationale**:
- **Standard Library**: No additional dependencies required
- **Flexibility**: Configurable log levels and handlers
- **Structured Logs**: JSON format for easy parsing and monitoring
- **Performance**: Minimal overhead with proper log levels
- **Constitution Alignment**: FR-023 and FR-024 require comprehensive logging

**Alternatives Considered**:
- **loguru**: Simpler API but adds dependency
- **structlog**: More features but overkill for our scale
- **Rejected because**: Built-in logging is sufficient and reduces dependencies

**Best Practices**:
- Log all API requests: timestamp, method, path, user_id, status_code, duration
- Log all errors with stack traces
- Use log levels appropriately: DEBUG (development), INFO (requests), ERROR (failures)
- Include correlation IDs for request tracing
- Never log sensitive data (passwords, tokens, PII)
- Configure log rotation for production

---

## Decision 8: Request/Response Validation

**Decision**: Use Pydantic models for all request bodies and response schemas.

**Rationale**:
- **Type Safety**: Automatic validation of incoming data
- **Documentation**: Auto-generated OpenAPI schemas
- **Error Messages**: Clear validation errors for clients
- **FastAPI Integration**: Native support in FastAPI
- **Constitution Alignment**: FR-014 requires validation with clear error messages

**Alternatives Considered**:
- **Manual Validation**: Error-prone and verbose
- **Marshmallow**: Separate library, less FastAPI integration
- **Rejected because**: Pydantic is built into FastAPI and provides best experience

**Best Practices**:
- Define separate schemas for Create, Update, and Response
- Use `Field()` for validation rules (min_length, max_length, regex)
- Return 400 Bad Request with validation errors
- Include field names in error messages
- Validate title: required, 1-200 characters
- Validate description: optional, max 2000 characters

---

## Decision 9: Database Session Management

**Decision**: Use FastAPI dependency injection for database sessions with automatic cleanup.

**Rationale**:
- **Resource Management**: Automatic session cleanup after request
- **Testability**: Easy to mock database sessions in tests
- **FastAPI Pattern**: Recommended approach in FastAPI documentation
- **Safety**: Prevents connection leaks

**Alternatives Considered**:
- **Global Session**: Risk of connection leaks and thread safety issues
- **Context Managers**: More verbose, less idiomatic in FastAPI
- **Rejected because**: Dependency injection is safer and more maintainable

**Best Practices**:
- Create `get_db()` dependency that yields session
- Use `try/finally` to ensure session cleanup
- Commit transactions explicitly after successful operations
- Rollback on errors
- Use `with` statement for nested transactions if needed

---

## Decision 10: CORS Configuration

**Decision**: Configure CORS middleware to allow frontend origin with credentials.

**Rationale**:
- **Frontend Integration**: Frontend runs on different port (3000) than backend (8000)
- **Security**: Restrict origins to known frontend URL
- **Credentials**: Allow Authorization header for JWT tokens
- **Constitution Alignment**: FR-029 requires CORS configuration

**Alternatives Considered**:
- **Wildcard Origins**: Insecure, allows any origin
- **No CORS**: Frontend requests would fail
- **Rejected because**: Specific origin restriction is most secure

**Best Practices**:
- Allow specific origin: `http://localhost:3000` (development)
- Allow credentials: `allow_credentials=True`
- Allow methods: `["GET", "POST", "PUT", "DELETE"]`
- Allow headers: `["Authorization", "Content-Type"]`
- Use environment variable for production frontend URL

---

## Summary

All technology decisions align with the project constitution and prioritize:
- **Security**: JWT verification, parameterized queries, user isolation
- **Reliability**: Proper error handling, validation, logging
- **Performance**: Connection pooling, async support, efficient queries
- **Maintainability**: Type safety, clear structure, best practices

Next steps: Proceed to Phase 1 (data-model.md, contracts/, quickstart.md)
