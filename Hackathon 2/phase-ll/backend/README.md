# Backend API - Todo Application

FastAPI backend with SQLModel ORM, JWT authentication, and Neon PostgreSQL integration.

## Prerequisites

- Python 3.11+
- PostgreSQL (Neon Serverless)
- Git

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Neon PostgreSQL connection string
- `JWT_SECRET`: Shared secret for JWT verification (must match Better Auth)
- `FRONTEND_URL`: Frontend origin for CORS

### 4. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry
│   ├── config.py            # Environment configuration
│   ├── database.py          # Database connection
│   ├── models/              # SQLModel entities
│   ├── schemas/             # Pydantic request/response schemas
│   ├── middleware/          # JWT authentication
│   ├── routers/             # API endpoints
│   └── utils/               # JWT verification, logging
├── tests/                   # Test files
├── requirements.txt         # Python dependencies
└── .env.example            # Environment template
```

## API Endpoints

All endpoints require JWT authentication via `Authorization: Bearer <token>` header.

- `GET /api/tasks` - Retrieve all user's tasks
- `GET /api/tasks/{id}` - Retrieve single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Testing

```bash
pytest
```

## Security

- JWT token verification on all protected endpoints
- User isolation enforced at database query level
- Parameterized queries (SQL injection prevention)
- CORS configured for frontend origin only

## Development

- FastAPI auto-generates OpenAPI documentation
- SQLModel provides type-safe database operations
- Pydantic validates all request/response data
- Uvicorn provides hot reload during development
