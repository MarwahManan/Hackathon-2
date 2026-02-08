# Backend Implementation - Verification Guide

## Setup Instructions

### 1. Create Environment File

Copy `.env.example` to `.env` and update with your actual values:

```bash
cd backend
cp .env.example .env
```

Update the `.env` file with:
- Your Neon PostgreSQL connection string for `DATABASE_URL`
- A secure JWT secret for `JWT_SECRET` (must match Better Auth configuration)
- Frontend URL for CORS (default: `http://localhost:3000`)

### 2. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Verification Checklist

### T037: Verify API Endpoints via Swagger UI

1. Open browser to: http://localhost:8000/docs
2. Verify all endpoints are listed:
   - `GET /api/tasks` - Get all tasks
   - `GET /api/tasks/{task_id}` - Get single task
   - `POST /api/tasks` - Create task
   - `PUT /api/tasks/{task_id}` - Update task
   - `DELETE /api/tasks/{task_id}` - Delete task
   - `GET /health` - Health check

3. Test authentication:
   - Click "Authorize" button
   - Enter JWT token in format: `Bearer <your-jwt-token>`
   - Test each endpoint with valid token

4. Verify responses:
   - 200 OK for successful GET/PUT/DELETE
   - 201 Created for successful POST
   - 401 Unauthorized without token
   - 404 Not Found for non-existent tasks
   - 400 Bad Request for validation errors

### T038: Verify Health Check

1. Open browser to: http://localhost:8000/health
2. Expected response:
   ```json
   {
     "status": "healthy"
   }
   ```

3. Or use curl:
   ```bash
   curl http://localhost:8000/health
   ```

## Testing with Sample Data

### Create a Task (requires JWT token)

```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task"
  }'
```

### Get All Tasks

```bash
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Task

```bash
curl -X PUT http://localhost:8000/api/tasks/{task_id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "is_completed": true
  }'
```

### Delete Task

```bash
curl -X DELETE http://localhost:8000/api/tasks/{task_id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Verification

The database tables are automatically created on server startup. Verify in your Neon console:

1. `users` table with columns: id, email, created_at, updated_at
2. `tasks` table with columns: id, user_id, title, description, is_completed, created_at, updated_at
3. Foreign key constraint: tasks.user_id → users.id
4. Indexes: users.email, tasks.user_id

## Security Verification

- [ ] JWT token required for all /api/tasks endpoints
- [ ] User can only access their own tasks
- [ ] 404 returned when accessing another user's task (not 403)
- [ ] CORS configured for frontend origin only
- [ ] No sensitive information in error messages
- [ ] All database queries use parameterized statements (SQLModel)

## Implementation Complete

**Status**: 36 out of 38 tasks completed (94.7%)

**Completed**:
- ✅ Phase 1: Setup (5/5 tasks)
- ✅ Phase 2: Foundational (14/14 tasks)
- ✅ Phase 3: User Story 1 (4/4 tasks)
- ✅ Phase 4: User Story 2 (2/2 tasks)
- ✅ Phase 5: User Story 3 & 5 (2/2 tasks)
- ✅ Phase 6: User Story 4 (1/1 task)
- ✅ Phase 7: User Story 6 (1/1 task)
- ✅ Phase 8: Polish (7/9 tasks)

**Remaining** (manual verification):
- ⏳ T037: Run server and verify via Swagger UI
- ⏳ T038: Verify health check endpoint

These final tasks require you to run the server and manually verify the endpoints work correctly.
